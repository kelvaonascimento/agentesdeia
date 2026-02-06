"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, ImagePlus, Loader2, Eye, EyeOff, MessageCircle } from "lucide-react";

export type ChatMessage = { role: "user" | "model"; text: string };

const COMPARATIVO_CAPTURE_SELECTOR = "[data-capture-comparativo]";

/** Últimas N trocas enviadas à API em cada request (evita estourar contexto do modelo); a gestora pode mandar quantas mensagens quiser. */
const MAX_HISTORY_TURNS = 30;

/** Chave para salvar a conversa do dia no localStorage (por data, para memória do dia). */
function getChatStorageKey(): string {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `dashboard-chat-${y}-${m}-${d}`;
}

function getTodayDateString(): string {
  return getChatStorageKey().replace("dashboard-chat-", "");
}

function getFriendlyError(res: Response, data: { error?: string }): string {
  const msg = data?.error?.trim();
  if (res.status === 401) return "Sessão expirada. Faça login novamente.";
  if (res.status === 429) return "Limite de uso atingido. Tente mais tarde.";
  if (res.status === 503) return msg || "Serviço temporariamente indisponível.";
  if (res.status >= 500) return msg || "Erro no servidor. Tente novamente em instantes.";
  if (res.status >= 400) return msg || "Não foi possível enviar. Tente novamente.";
  return msg || "Erro inesperado. Tente novamente.";
}

const LIVE_CAPTURE_INTERVAL_MS = 10_000; // 10 segundos

/** Perguntas sugeridas: um clique envia direto para o assistente (gestor de tráfego testando o chat). */
const PERGUNTAS_SUGERIDAS = [
  "Com base no que você vê na minha tela: o que está bom, o que está ruim e qual é a prioridade número 1 agora? Resumo em 3 linhas.",
  "Me dá a lista de ações na ordem: o que pausar primeiro, o que ajustar e o que (se algo) escalar. Quero a ordem exata.",
  "Se eu só pudesse fazer 3 coisas esta semana no tráfego, quais seriam? Ordem 1, 2 e 3.",
  "Anúncios com CTR baixo: qual causa mais provável e uma ideia concreta de headline ou primeiro frame para eu testar?",
  "Onde está o gargalo para virar lead: no anúncio ou na landing? Me dá uma coisa concreta para checar na LP hoje.",
  "Taxa lead→compra 0%: onde está o problema (oferta, página de vendas ou follow-up)? Uma ação concreta para cada etapa.",
  "Quais anúncios você pausaria na hora e por quê? Lista com nome e motivo em uma linha.",
  "Explica de forma simples: quando um anúncio está fora da base saudável, o que cada métrica indica e em que parte do funil eu atuo?",
];

type ChatDrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Quando o usuário clica em "Veja minha tela" mas não está na aba Comparativo, chamamos isso para trocar de aba. */
  onSwitchToComparativo?: () => void;
  /** True quando a aba Comparativo está ativa (para captura em tempo real). */
  comparativoTabActive?: boolean;
};

/** Captura a área do Comparativo e retorna data URL ou null. Usa html2canvas-pro (suporta lab/lch). */
async function captureComparativoArea(): Promise<string | null> {
  const el = document.querySelector(COMPARATIVO_CAPTURE_SELECTOR);
  if (!el || !(el instanceof HTMLElement)) return null;
  const html2canvas = (await import("html2canvas-pro")).default;
  const canvas = await html2canvas(el, {
    useCORS: true,
    scale: 0.75,
    logging: false,
  });
  return canvas.toDataURL("image/png");
}

export function ChatDrawer({ open, onClose, onSwitchToComparativo, comparativoTabActive }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [liveViewEnabled, setLiveViewEnabled] = useState(false);
  const [lastCapturedImage, setLastCapturedImage] = useState<string | null>(null);
  const [lastCaptureTime, setLastCaptureTime] = useState<number | null>(null);
  const [liveSecondsAgo, setLiveSecondsAgo] = useState<number | null>(null);
  const [showPerguntasPanel, setShowPerguntasPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastLoadedDateRef = useRef<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Memória da conversa do dia: ao abrir o chat, carrega mensagens salvas para hoje (ou nova conversa se mudou o dia)
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const today = getTodayDateString();
    if (lastLoadedDateRef.current === today) return;
    lastLoadedDateRef.current = today;
    try {
      const key = getChatStorageKey();
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.length > 0) {
          const valid = parsed.every(
            (m) => m && typeof m === "object" && (m as ChatMessage).role in { user: 1, model: 1 } && typeof (m as ChatMessage).text === "string"
          );
          if (valid) setMessages(parsed as ChatMessage[]);
        } else setMessages([]);
      } else setMessages([]);
    } catch {
      setMessages([]);
    }
  }, [open]);

  // Salva a conversa no localStorage sempre que as mensagens mudarem (conversa do dia)
  useEffect(() => {
    if (typeof window === "undefined" || messages.length === 0) return;
    try {
      const key = getChatStorageKey();
      localStorage.setItem(key, JSON.stringify(messages));
    } catch {
      // ignora se localStorage estiver cheio ou indisponível
    }
  }, [messages]);

  // Captura automática a cada N segundos quando modo ao vivo está ligado e aba Comparativo ativa
  useEffect(() => {
    if (!open || !liveViewEnabled || !comparativoTabActive) {
      return;
    }
    const runCapture = async () => {
      const dataUrl = await captureComparativoArea();
      if (dataUrl) {
        setLastCapturedImage(dataUrl);
        setLastCaptureTime(Date.now());
      }
    };
    const t0 = setTimeout(runCapture, 800);
    const id = setInterval(runCapture, LIVE_CAPTURE_INTERVAL_MS);
    return () => {
      clearTimeout(t0);
      clearInterval(id);
    };
  }, [open, liveViewEnabled, comparativoTabActive]);

  // Atualiza "há Xs" a cada segundo quando há última captura
  useEffect(() => {
    if (!lastCaptureTime) {
      setLiveSecondsAgo(null);
      return;
    }
    const update = () => setLiveSecondsAgo(Math.floor((Date.now() - lastCaptureTime) / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lastCaptureTime]);

  const sendMessage = async (text: string, imageBase64?: string | null) => {
    const trimmed = text.trim();
    if (!trimmed && !imageBase64) return;
    setError(null);
    const newUserMessage: ChatMessage = { role: "user", text: trimmed || "Analise a tela do Comparativo que enviei." };
    const nextMessages = [...messages, newUserMessage];
    setMessages(nextMessages);
    setInput("");
    setPendingImage(null);
    setLoading(true);

    try {
      const toSend = nextMessages.length > MAX_HISTORY_TURNS * 2
        ? nextMessages.slice(-MAX_HISTORY_TURNS * 2)
        : nextMessages;
      const body = {
        messages: toSend.map((m) => ({ role: m.role, text: m.text })),
        ...(imageBase64 && { image: imageBase64 }),
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessages((prev) => prev.slice(0, -1));
        setError(getFriendlyError(res, data));
        setLoading(false);
        return;
      }
      if (data.text) {
        setMessages((prev) => [...prev, { role: "model", text: data.text }]);
      }
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      setError("Falha ao enviar. Verifique a conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const imageToSend = pendingImage ?? (liveViewEnabled ? lastCapturedImage : null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input, imageToSend ?? undefined);
  };

  const handleCaptureComparativo = async () => {
    const confirmed = window.confirm(
      "O assistente vai ver a tela que você está vendo. Continuar?"
    );
    if (!confirmed) return;
    const el = document.querySelector(COMPARATIVO_CAPTURE_SELECTOR);
    if (!el) {
      setError(null);
      onSwitchToComparativo?.();
      setError("Aba Comparativo aberta. Clique em \"Veja minha tela\" novamente para capturar.");
      return;
    }
    setError(null);
    try {
      const dataUrl = await captureComparativoArea();
      if (dataUrl) setPendingImage(dataUrl);
      else setError("Não foi possível capturar a tela. Tente novamente.");
    } catch (err) {
      setError("Não foi possível capturar a tela. Tente novamente.");
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        aria-hidden
        onClick={onClose}
      />

      {/* Painel de perguntas sugeridas: ao LADO do chat; no mobile à esquerda da tela; com X para fechar */}
      {showPerguntasPanel && (
        <div
          className="fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] md:left-auto md:right-[28rem] md:w-80 bg-cb-surface border border-cb-border z-50 flex flex-col shadow-2xl md:rounded-l-2xl overflow-hidden"
          role="dialog"
          aria-label="Perguntas sugeridas"
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-cb-border shrink-0 bg-cb-surface-light/50">
            <span className="text-white font-semibold text-sm">Perguntas sugeridas</span>
            <button
              type="button"
              onClick={() => setShowPerguntasPanel(false)}
              className="p-2 text-cb-text-muted hover:text-white hover:bg-cb-surface rounded-lg transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-0">
            <p className="text-cb-text-muted text-xs mb-2">Clique para enviar ao assistente.</p>
            {PERGUNTAS_SUGERIDAS.map((pergunta, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  sendMessage(pergunta, pendingImage ?? (liveViewEnabled ? lastCapturedImage : null) ?? undefined);
                }}
                disabled={loading}
                className="w-full text-left rounded-xl border border-cb-border bg-cb-surface-light/80 hover:bg-cb-orange/15 hover:border-cb-orange/40 px-4 py-3 text-sm text-cb-text-secondary transition-colors disabled:opacity-50"
              >
                {pergunta.length > 72 ? `${pergunta.slice(0, 72)}…` : pergunta}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botão flutuante "Perguntas": só aparece com o chat aberto e quando o painel está FECHADO (quando aberto, só fica o X no painel) */}
      {!showPerguntasPanel && (
        <button
          type="button"
          onClick={() => setShowPerguntasPanel(true)}
          className="fixed bottom-6 left-4 md:left-auto md:right-[29rem] z-50 flex items-center gap-2 rounded-full bg-cb-surface border border-cb-border text-white px-4 py-3 shadow-lg hover:bg-cb-surface-light hover:border-cb-orange/50 transition-all focus:outline-none focus:ring-2 focus:ring-cb-orange"
          title="Abrir perguntas sugeridas"
          aria-label="Abrir perguntas sugeridas"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium text-sm hidden sm:inline">Perguntas</span>
        </button>
      )}

      <div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cb-surface border-l border-cb-border z-50 flex flex-col shadow-2xl rounded-l-2xl overflow-hidden"
        role="dialog"
        aria-label="Chat com especialista em tráfego"
      >
        {/* Header com ícone do robô */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-cb-border shrink-0 bg-cb-surface-light/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-cb-surface border border-cb-border flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element -- ícone do assistente */}
              <img
                src="/images/brand/ai-robot.png"
                alt=""
                className="w-full h-full object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-semibold text-base truncate">Assistente de tráfego</h2>
              <p className="text-cb-text-muted text-xs truncate">Especialista em Meta Ads e low ticket</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2.5 text-cb-text-muted hover:text-white hover:bg-cb-surface rounded-xl transition-colors"
            aria-label="Fechar chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-cb-text-muted text-xs px-5 py-2.5 border-b border-cb-border shrink-0 bg-amber-500/5">
          As decisões são de responsabilidade da gestora. Use &quot;Veja minha tela&quot; ou &quot;Ver em tempo real&quot; para o assistente ver a aba Comparativo. Conversa do dia salva neste navegador.
        </p>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 bg-background/30"
        >
          {messages.length === 0 && (
            <div className="rounded-xl bg-cb-surface-light/50 border border-cb-border p-4 text-center">
              <p className="text-cb-text-secondary text-sm leading-relaxed">
                Use &quot;Veja minha tela&quot; e envie, ou clique no botão &quot;Perguntas&quot; ao lado para abrir as perguntas sugeridas.
              </p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-cb-orange text-white rounded-br-md"
                    : "bg-cb-surface-light text-cb-text-secondary border border-cb-border rounded-bl-md"
                }`}
              >
                <div className="whitespace-pre-wrap break-words leading-relaxed">{m.text}</div>
              </div>
            </div>
          ))}
          {(pendingImage || (liveViewEnabled && lastCapturedImage)) && (
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-cb-orange bg-cb-orange/15 px-3 py-2 rounded-xl border border-cb-orange/30">
                {pendingImage
                  ? "O assistente vai ver esta tela. Envie (pode deixar em branco para só analisar)."
                  : "Modo ao vivo: última captura será enviada com sua mensagem."}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pendingImage ?? lastCapturedImage ?? ""}
                alt="Captura da tela"
                className="max-w-full max-h-32 rounded-lg border border-cb-border object-contain bg-cb-surface"
              />
              {liveViewEnabled && !pendingImage && lastCaptureTime != null && liveSecondsAgo != null && (
                <span className="text-xs text-cb-text-muted">Última captura: há {liveSecondsAgo}s</span>
              )}
            </div>
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md px-4 py-3 bg-cb-surface-light border border-cb-border text-cb-text-muted text-sm shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>Analisando...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-cb-border shrink-0 bg-cb-surface space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (!comparativoTabActive && liveViewEnabled) onSwitchToComparativo?.();
                setLiveViewEnabled((v) => !v);
                if (!liveViewEnabled) setError(null);
              }}
              className={`flex items-center gap-2 text-sm rounded-lg py-2 px-3 transition-colors ${
                liveViewEnabled ? "text-cb-orange bg-cb-orange/15 border border-cb-orange/30" : "text-cb-text-muted hover:text-cb-orange"
              }`}
              title={comparativoTabActive ? "Captura automática a cada 10s da aba Comparativo" : "Abra a aba Comparativo para ativar"}
            >
              {liveViewEnabled ? <Eye className="w-4 h-4 shrink-0" /> : <EyeOff className="w-4 h-4 shrink-0" />}
              Ver em tempo real
            </button>
            {liveViewEnabled && !comparativoTabActive && (
              <span className="text-xs text-amber-400">Abra a aba Comparativo</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCaptureComparativo}
            className="flex items-center gap-2 text-sm text-cb-text-muted hover:text-cb-orange transition-colors w-full rounded-lg py-1.5"
          >
            <ImagePlus className="w-4 h-4 shrink-0" />
            Veja minha tela (uma captura)
          </button>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sua pergunta..."
              className="flex-1 rounded-xl border border-cb-border bg-cb-surface-light px-4 py-3 text-white placeholder:text-cb-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-cb-orange focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || (!input.trim() && !imageToSend)}
              className="shrink-0 rounded-xl bg-cb-orange text-white p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cb-orange/90 transition-colors shadow-sm"
              aria-label="Enviar mensagem"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
