import { Gift, ShieldCheck } from "lucide-react";

interface BonusGarantiaProps {
  variant?: "default" | "stacked";
}

export default function BonusGarantia({ variant = "default" }: BonusGarantiaProps) {
  if (variant === "stacked") {
    return (
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cb-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-cb-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                <Gift className="w-7 h-7 text-cb-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Bonus Exclusivo: Template &ldquo;Plug-and-Play&rdquo;</h3>
                <p className="text-cb-text-muted leading-relaxed">
                  Alem de todo o conhecimento, voce recebera o template exato do agente que construirmos na aula.
                  Voce podera copiar, colar e adaptar para criar novos agentes em minutos.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-cb-surface border border-green-500/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Sua Satisfacao ou seu Dinheiro de Volta</h3>
                <p className="text-cb-text-muted leading-relaxed">
                  Se ao final do workshop voce sentir que nao entregamos a transformacao prometida,
                  basta nos enviar um e-mail em ate 7 dias e nos devolvemos 100% do seu investimento. Risco zero para voce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl p-8 lg:p-10 relative overflow-hidden group hover:border-cb-orange/40 transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cb-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cb-orange/10 transition-colors" />
            <div className="relative">
              <div className="w-16 h-16 bg-cb-orange/10 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-cb-orange" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Bonus Exclusivo: Template &ldquo;Plug-and-Play&rdquo;</h3>
              <p className="text-cb-text-muted leading-relaxed">
                Alem de todo o conhecimento, voce recebera o template exato do agente que construirmos na aula.
                Voce podera copiar, colar e adaptar para criar novos agentes em minutos.
              </p>
            </div>
          </div>
          <div className="bg-cb-surface border border-green-500/20 rounded-2xl p-8 lg:p-10 relative overflow-hidden group hover:border-green-500/40 transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/10 transition-colors" />
            <div className="relative">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sua Satisfacao ou seu Dinheiro de Volta</h3>
              <p className="text-cb-text-muted leading-relaxed">
                Se ao final do workshop voce sentir que nao entregamos a transformacao prometida,
                basta nos enviar um e-mail em ate 7 dias e nos devolvemos 100% do seu investimento. Risco zero para voce.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
