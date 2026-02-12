import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, type Part } from "@google/generative-ai";
import { requireAuth } from "@/lib/auth";
import { CHAT_ESPERCIALISTA_SYSTEM_PROMPT } from "@/lib/prompts/chat-especialista";

const GEMINI_MODEL = "gemini-2.0-flash";

type ChatMessage = { role: "user" | "model"; text: string };

type ChatBody = {
  messages: ChatMessage[];
  context?: string;
  /** Imagem em base64 (ex.: captura da aba Comparativo). Opcional; quando enviada, o Gemini analisa em modo multimodal. */
  image?: string;
};

function parseBody(body: unknown): ChatBody | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const messages = o.messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const valid = messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m as ChatMessage).role in { user: 1, model: 1 } &&
      typeof (m as ChatMessage).text === "string"
  );
  if (!valid) return null;
  return {
    messages: messages as ChatMessage[],
    context: typeof o.context === "string" ? o.context : undefined,
    image: typeof o.image === "string" ? o.image : undefined,
  };
}

/** Remove prefixo data URL se existir; retorna só o base64. */
function toBase64Data(image: string): { mimeType: string; data: string } {
  const match = image.match(/^data:([^;]+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1].trim(), data: match[2] };
  }
  return { mimeType: "image/png", data: image };
}

/**
 * Converte mensagens do front + contexto para o formato history do Gemini.
 * Se houver context, injeta no início da primeira mensagem do usuário.
 */
function buildGeminiHistory(messages: ChatMessage[], context?: string): { role: string; parts: { text: string }[] }[] {
  const out: { role: string; parts: { text: string }[] }[] = [];
  const prefix = context?.trim()
    ? `Dados atuais do dashboard (use apenas estes números para analisar):\n\n${context.trim()}\n\n---\n\n`
    : "";

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    const text = i === 0 && m.role === "user" && prefix ? prefix + m.text : m.text;
    out.push({ role: m.role === "model" ? "model" : "user", parts: [{ text }] });
  }
  return out;
}

export async function POST(request: NextRequest) {
  try {
    const authError = requireAuth(request);
    if (authError) return authError;

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Serviço de chat não configurado (GEMINI_API_KEY)." },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
    }

    const parsed = parseBody(body);
    if (!parsed) {
      return NextResponse.json(
        { error: "Envie um objeto com 'messages' (array de { role: 'user'|'model', text: string }) e opcionalmente 'context' (string)." },
        { status: 400 }
      );
    }

    const { messages, context, image } = parsed;
    const last = messages[messages.length - 1];
    if (last.role !== "user") {
      return NextResponse.json({ error: "A última mensagem deve ser do usuário." }, { status: 400 });
    }

    const history = buildGeminiHistory(messages.slice(0, -1), context);
    const contextPrefix = context?.trim()
      ? `Dados atuais do dashboard (use apenas estes números para analisar):\n\n${context.trim()}\n\n---\n\n`
      : "";
    const userText = (history.length === 0 ? contextPrefix : "") + last.text;

    const lastMessageContent: string | Part[] = image?.trim()
      ? ([
          { inlineData: toBase64Data(image.trim()) },
          { text: userText || "Analise a tela do Comparativo acima e dê sugestões com base na base saudável (CTR ≥ 1,2%, CPL ≤ R$ 25, CPA ≤ R$ 60, lead→compra ≥ 8%)." },
        ] as Part[])
      : userText;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: CHAT_ESPERCIALISTA_SYSTEM_PROMPT,
    });
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessageContent);
    const response = result?.response;
    if (!response) {
      return NextResponse.json(
        { error: "Resposta vazia do assistente. Tente novamente." },
        { status: 502 }
      );
    }
    let text: string;
    try {
      text = response.text() ?? "";
    } catch {
      return NextResponse.json(
        { error: "Resposta do assistente não pôde ser lida. Tente novamente." },
        { status: 502 }
      );
    }
    if (!text.trim()) {
      return NextResponse.json(
        { error: "Resposta vazia do assistente. Tente novamente." },
        { status: 502 }
      );
    }
    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (process.env.NODE_ENV === "development") {
      console.error("[api/chat] Gemini error:", err instanceof Error ? err : message);
    }
    // Só considerar "limite de uso" para erros reais de cota/rate limit do provedor (Gemini)
    const isQuota = /quota|429|resource_exhausted|rate limit/i.test(message);
    const isAuth = /403|401|invalid|permission|api key not valid|API key not valid|api key|invalid.*key/i.test(message);
    const isBlocked = /blocked|safety|content/i.test(message);
    const userMessage = isQuota
      ? "Limite de uso atingido. Tente mais tarde."
      : isAuth
        ? "Chave da API inválida ou sem permissão. Verifique a GEMINI_API_KEY no servidor."
        : isBlocked
          ? "Resposta bloqueada pelo filtro. Reformule a mensagem e tente novamente."
          : "Não foi possível falar com o assistente. Tente novamente em instantes.";
    return NextResponse.json(
      { error: userMessage },
      { status: isQuota ? 429 : 502 }
    );
  }
  } catch (outerErr) {
    if (process.env.NODE_ENV === "development") {
      console.error("[api/chat] Unexpected error:", outerErr);
    }
    return NextResponse.json(
      { error: "Erro inesperado no chat. Tente novamente." },
      { status: 502 }
    );
  }
}
