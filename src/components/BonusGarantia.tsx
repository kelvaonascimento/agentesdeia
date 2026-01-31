"use client";

import { Gift, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface BonusGarantiaProps {
  variant?: "default" | "stacked";
}

export default function BonusGarantia({ variant = "default" }: BonusGarantiaProps) {
  if (variant === "stacked") {
    return (
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal>
            <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cb-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-cb-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 sm:w-7 sm:h-7 text-cb-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Bonus Exclusivo: Template &ldquo;Plug-and-Play&rdquo;</h3>
                  <p className="text-cb-text-muted leading-relaxed">
                    Além de todo o conhecimento, você receberá o template exato do agente que construirmos na aula.
                    Você podera copiar, colar e adaptar para criar novos agentes em minutos.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="bg-cb-surface border border-green-500/20 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-green-500/10 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Sua Satisfacao ou seu Dinheiro de Volta</h3>
                  <p className="text-cb-text-muted leading-relaxed">
                    Se ao final do workshop você sentir que não entregamos a transformação prometida,
                    basta nos enviar um e-mail em ate 7 dias e nos devolvemos 100% do seu investimento. Risco zero para você.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <ScrollReveal direction="left">
            <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl p-5 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-cb-orange/40 transition-all h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cb-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cb-orange/10 transition-colors" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cb-orange/10 rounded-2xl flex items-center justify-center mb-6">
                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-cb-orange" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Bonus Exclusivo: Template &ldquo;Plug-and-Play&rdquo;</h3>
                <p className="text-cb-text-muted leading-relaxed">
                  Além de todo o conhecimento, você receberá o template exato do agente que construirmos na aula.
                  Você podera copiar, colar e adaptar para criar novos agentes em minutos.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <div className="bg-cb-surface border border-green-500/20 rounded-2xl p-5 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-green-500/40 transition-all h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/10 transition-colors" />
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Sua Satisfacao ou seu Dinheiro de Volta</h3>
                <p className="text-cb-text-muted leading-relaxed">
                  Se ao final do workshop você sentir que não entregamos a transformação prometida,
                  basta nos enviar um e-mail em ate 7 dias e nos devolvemos 100% do seu investimento. Risco zero para você.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
