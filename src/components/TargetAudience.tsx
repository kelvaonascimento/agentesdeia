import { Briefcase, Lightbulb, Sparkles } from "lucide-react";

const audiences = [
  {
    icon: Briefcase,
    title: "O Profissional Eficiente",
    description:
      "...esta sobrecarregado com tarefas manuais e quer usar a IA para recuperar seu tempo, aumentar sua produtividade e se tornar indispensavel na sua empresa.",
  },
  {
    icon: Lightbulb,
    title: "O Empreendedor Visionario",
    description:
      "...quer automatizar processos, otimizar o atendimento, reduzir custos operacionais e escalar seu negocio sem precisar contratar um time de desenvolvedores.",
  },
  {
    icon: Sparkles,
    title: "O Curioso Corajoso",
    description:
      "...e fascinado por IA, mas se sente intimidado pelo código. Você quer dar o primeiro passo prático, criar seu primeiro projeto real e finalmente entender o poder da construção com IA.",
  },
];

interface TargetAudienceProps {
  variant?: "default" | "cards" | "minimal";
}

export default function TargetAudience({ variant = "default" }: TargetAudienceProps) {
  if (variant === "cards") {
    return (
      <section className="py-16 sm:py-24 bg-cb-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Este workshop é para <span className="text-gradient-orange">você que...</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cb-orange/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-cb-surface-light border border-cb-border rounded-2xl p-5 sm:p-8 h-full hover:border-cb-orange/30 transition-all">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-cb-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">
            Este workshop é para você que...
          </h2>
          <div className="space-y-6">
            {audiences.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-4 sm:gap-5 sm:p-6 bg-cb-surface/50 rounded-xl border border-cb-border hover:border-cb-orange/20 transition-all">
                  <div className="w-10 h-10 bg-cb-orange/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-cb-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-cb-text-muted leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
            Para quem e
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Este workshop é para <span className="text-gradient-orange">você que...</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto bg-cb-surface border border-cb-border rounded-2xl flex items-center justify-center mb-6 group-hover:border-cb-orange/40 group-hover:bg-cb-orange/5 transition-all">
                  <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-cb-orange" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-cb-text-muted leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
