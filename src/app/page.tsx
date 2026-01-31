import { ArrowRight } from "lucide-react";

const pages = [
  {
    path: "/workshop-agente-ia",
    title: "Workshop Agente de IA",
    desc: "Landing page principal completa com todas as seções: Hero, Fim da Teoria, Para Quem, Passo a Passo, Expert, Bônus, FAQ e CTA Final.",
    tag: "Principal",
  },
  {
    path: "/automatize",
    title: "Automatize com IA",
    desc: "Foco em urgência e escassez. Countdown proeminente, barra de vagas preenchidas, alerta de última chamada.",
    tag: "Urgência",
  },
  {
    path: "/construir-agente",
    title: "Construir seu Agente",
    desc: "Centrada no Caio Vicentino. Hero com foto grande, credenciais, citação, bio detalhada. Autoridade como principal gatilho.",
    tag: "Expert",
  },
  {
    path: "/primeiro-agente",
    title: "Seu Primeiro Agente",
    desc: "6 depoimentos em grid, caso de estudo detalhado, números de resultado, prova social no hero.",
    tag: "Social Proof",
  },
  {
    path: "/sem-codigo",
    title: "Agente Sem Código",
    desc: "Design ultra clean e direto. Poucos elementos, muito espaço em branco (escuro). Foco na clareza da mensagem.",
    tag: "Minimal",
  },
  {
    path: "/jornada-ia",
    title: "Sua Jornada com IA",
    desc: "Começa com uma história real de aluno. Jornada do espectador ao builder. Antes/Depois visual. Narrativa emocional.",
    tag: "Story",
  },
  {
    path: "/aula-ao-vivo",
    title: "Aula Ao Vivo",
    desc: "Vídeo placeholder proeminente no hero. Demonstrações visuais do que será construído. Layout orientado a mídia.",
    tag: "Vídeo",
  },
  {
    path: "/ia-pratica",
    title: "IA na Prática",
    desc: "Quebra de objeções como estratégia principal. Mitos vs Realidade. FAQ organizado por categorias. Ideal para retargeting.",
    tag: "FAQ",
  },
  {
    path: "/garantir-vaga",
    title: "Garantir sua Vaga",
    desc: "Barra fixa de countdown no rodapé. Timeline de fechamento. Progress bar de vagas. Urgência visual em cada seção.",
    tag: "Countdown",
  },
  {
    path: "/automacao",
    title: "Automação com IA",
    desc: "Otimizada para mobile com CTA fixo no rodapé. Cards compactos, chips informativos, layout vertical otimizado.",
    tag: "Mobile",
  },
  {
    path: "/obrigado",
    title: "Página de Obrigado",
    desc: "Confirmação de inscrição + botão para entrar no grupo VIP do WhatsApp + instruções de preparação para o workshop.",
    tag: "Obrigado",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-orange rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
                <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" fill="#E8590C" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight">
              CULTURA <span className="text-cb-orange">BUILDER</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Landing Pages do <span className="text-gradient-orange">Workshop</span>
          </h1>
          <p className="text-cb-text-muted text-lg max-w-2xl mx-auto">
            10 landing pages diferentes + pagina de obrigado para o Workshop de Agentes de IA.
            Cada uma com abordagem, layout e estrategia de conversao únicos.
          </p>
        </div>

        <div className="grid gap-4">
          {pages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              className="group bg-cb-surface border border-cb-border rounded-2xl p-6 hover:border-cb-orange/40 transition-all hover:translate-x-1"
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
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-cb-text-muted text-sm">
            Cultura Builder &copy; {new Date().getFullYear()} | Hub de Inteligência Artificial
          </p>
        </div>
      </div>
    </main>
  );
}
