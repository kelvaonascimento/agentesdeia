"use client";

import { Settings, Brain, Zap, Rocket } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Settings,
    number: "01",
    title: "O Setup",
    time: "Minutos 0-20",
    description: "Vamos configurar seu ambiente de construção do zero. Você vai entender a lógica por trás de um agente e desenhar o seu primeiro fluxo.",
  },
  {
    icon: Brain,
    number: "02",
    title: "A Inteligência",
    time: "Minutos 20-50",
    description: "É aqui que a mágica acontece. Vamos conectar seu agente ao cérebro do ChatGPT/Claude e ensiná-lo a pensar e a tomar decisões.",
  },
  {
    icon: Zap,
    number: "03",
    title: "A Ação",
    time: "Minutos 50-80",
    description: "Seu agente vai aprender a executar uma tarefa real. Seja responder um e-mail, triar um lead ou organizar sua agenda.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "O Lançamento",
    time: "Minutos 80-90",
    description: "Com um clique, seu agente estará no ar, pronto para trabalhar para você. Você terá um link, um ativo, uma prova real da sua nova capacidade.",
  },
];

interface StepsSectionProps {
  variant?: "default" | "horizontal" | "timeline";
}

export default function StepsSection({ variant = "default" }: StepsSectionProps) {
  if (variant === "horizontal") {
    return (
      <section className="py-16 sm:py-24 bg-gradient-dark bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
                Passo a Passo
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Sua Jornada de 90 Minutos
              </h2>
              <p className="text-cb-text-muted mt-3 text-lg">Do Zero ao Agente Funcional</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="relative group h-full">
                    <div className="bg-cb-surface border border-cb-border rounded-2xl p-4 sm:p-6 h-full hover:border-cb-orange/40 transition-all duration-300 hover:translate-y-[-4px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-cb-orange/10 rounded-xl flex items-center justify-center group-hover:bg-cb-orange/20 transition-colors">
                          <Icon className="w-6 h-6 text-cb-orange" />
                        </div>
                        <span className="text-4xl font-black text-cb-surface-lighter group-hover:text-cb-orange/20 transition-colors">
                          {step.number}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-cb-orange uppercase tracking-widest font-semibold">{step.time}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-3">{step.title}</h3>
                      <p className="text-cb-text-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-cb-border" />
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "timeline") {
    return (
      <section className="py-16 sm:py-24 bg-gradient-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                Sua Jornada de <span className="text-gradient-orange">90 Minutos</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cb-orange via-cb-orange/30 to-transparent" />
            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={i} delay={i * 150}>
                    <div className="flex gap-3 sm:gap-6 relative">
                      <div className="relative z-10 w-10 h-10 sm:w-16 sm:h-16 bg-cb-surface border-2 border-cb-orange rounded-2xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-cb-orange" />
                      </div>
                      <div className="bg-cb-surface border border-cb-border rounded-2xl p-4 sm:p-6 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-cb-orange text-xs font-semibold uppercase tracking-wider">{step.time}</span>
                          <span className="text-3xl font-black text-cb-surface-lighter">{step.number}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-cb-text-muted leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-dark bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
              O que você vai construir
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Sua Jornada de 90 Minutos:
            </h2>
            <p className="text-xl text-cb-text-muted mt-2">Do Zero ao Agente Funcional</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="bg-cb-surface border border-cb-border rounded-2xl p-5 sm:p-8 hover:border-cb-orange/30 transition-all group">
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-orange rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-cb-orange text-xs font-semibold uppercase tracking-wider">{step.time}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-3">{step.title}</h3>
                      <p className="text-cb-text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
