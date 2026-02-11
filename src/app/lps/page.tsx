import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import PageTracker from "@/components/PageTracker";

const pages = [
  { path: "/90-minutos", title: "Workshop em 90 Minutos", desc: "LP principal: Hero com fundo, LogoMarquee, Intro, Para Quem, Jornada 90min, Sobre Caio, Bônus, Preço, FAQ, CTA e WhatsApp.", tag: "Principal" },
  { path: "/workshop-agente-ia", title: "Workshop Agente de IA", desc: "Landing page principal completa com todas as seções: Hero, Fim da Teoria, Para Quem, Passo a Passo, Expert, Bônus, FAQ e CTA Final.", tag: "Principal" },
  { path: "/automatize", title: "Automatize com IA", desc: "Foco em urgência e escassez. Countdown proeminente, barra de vagas preenchidas, alerta de última chamada.", tag: "Urgência" },
  { path: "/construir-agente", title: "Construir seu Agente", desc: "Centrada no Caio Vicentino. Hero com foto grande, credenciais, citação, bio detalhada. Autoridade como principal gatilho.", tag: "Expert" },
  { path: "/primeiro-agente", title: "Seu Primeiro Agente", desc: "6 depoimentos em grid, caso de estudo detalhado, números de resultado, prova social no hero.", tag: "Social Proof" },
  { path: "/sem-codigo", title: "Agente Sem Código", desc: "Design ultra clean e direto. Poucos elementos, muito espaço em branco (escuro). Foco na clareza da mensagem.", tag: "Minimal" },
  { path: "/jornada-ia", title: "Sua Jornada com IA", desc: "Começa com uma história real de aluno. Jornada do espectador ao builder. Antes/Depois visual. Narrativa emocional.", tag: "Story" },
  { path: "/aula-ao-vivo", title: "Aula Ao Vivo", desc: "Vídeo placeholder proeminente no hero. Demonstrações visuais do que será construído. Layout orientado a mídia.", tag: "Vídeo" },
  { path: "/ia-pratica", title: "IA na Prática", desc: "Quebra de objeções como estratégia principal. Mitos vs Realidade. FAQ organizado por categorias. Ideal para retargeting.", tag: "FAQ" },
  { path: "/garantir-vaga", title: "Garantir sua Vaga", desc: "Barra fixa de countdown no rodapé. Timeline de fechamento. Progress bar de vagas. Urgência visual em cada seção.", tag: "Countdown" },
  { path: "/automacao", title: "Automação com IA", desc: "Otimizada para mobile com CTA fixo no rodapé. Cards compactos, chips informativos, layout vertical otimizado.", tag: "Mobile" },
  { path: "/obrigado", title: "Página de Obrigado", desc: "Confirmação de inscrição + botão para entrar no grupo VIP do WhatsApp + instruções de preparação para o workshop.", tag: "Obrigado" },
];

export const metadata = {
  title: "Landing Pages do Workshop | Cultura Builder",
  description: "Hub das landing pages do Workshop de Agentes de IA. Acesso às 10 versões + página de obrigado.",
};

export default function LPsHubPage() {
  return (
    <>
      <PageTracker pageName="Workshop Agente IA" variant="hub-lps" />
      <main className="min-h-screen bg-background">
        {/* Novo header do hub: logo + Área da Equipe */}
        <header className="sticky top-0 z-40 border-b border-cb-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <Link href="/lps" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
                  <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" fill="#E8590C" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                CULTURA <span className="text-cb-orange">BUILDER</span>
              </span>
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 text-cb-text-muted hover:text-cb-orange text-sm transition-colors"
            >
              <Lock className="w-4 h-4" />
              Área da Equipe
            </Link>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Landing Pages do <span className="text-gradient-orange">Workshop</span>
            </h1>
            <p className="text-cb-text-muted text-lg max-w-2xl mx-auto">
              10 landing pages diferentes + página de obrigado para o Workshop de Agentes de IA.
              Cada uma com abordagem, layout e estratégia de conversão únicos.
            </p>
          </div>

          <div className="grid gap-4">
            {pages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="group block bg-cb-surface border border-cb-border rounded-2xl p-6 hover:border-cb-orange/40 transition-all hover:translate-x-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-cb-orange/10 text-cb-orange text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-cb-orange/20">
                        {page.tag}
                      </span>
                      <span className="text-cb-text-muted text-xs font-mono">{page.path}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-cb-orange transition-colors">
                      {page.title}
                    </h2>
                    <p className="text-cb-text-muted text-sm mt-1 leading-relaxed">{page.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cb-border group-hover:text-cb-orange transition-colors shrink-0 mt-2" />
                </div>
              </Link>
            ))}
          </div>

          {/* Novo footer do hub */}
          <footer className="mt-16 pt-8 border-t border-cb-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cb-text-muted text-sm">
              Cultura Builder &copy; {new Date().getFullYear()} | Hub de Inteligência Artificial
            </p>
            <div className="flex items-center gap-6">
              <Link href="/termos" className="text-cb-text-muted hover:text-cb-orange text-sm transition-colors">
                Termos
              </Link>
              <Link href="/politica-de-privacidade" className="text-cb-text-muted hover:text-cb-orange text-sm transition-colors">
                Privacidade
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 text-cb-text-muted hover:text-cb-orange text-sm transition-colors"
              >
                <Lock className="w-4 h-4" />
                Área da Equipe
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
