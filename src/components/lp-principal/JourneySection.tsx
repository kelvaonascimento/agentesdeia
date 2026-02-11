"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

const steps = [
  { time: "Minutos 0-20", title: "O Setup", description: "Vamos configurar seu ambiente de construção do zero. Você vai entender a lógica por trás de um agente e desenhar o seu primeiro fluxo.", icon: "⚙️" },
  { time: "Minutos 20-50", title: "A Inteligência", description: "É aqui que a mágica acontece. Vamos conectar seu agente ao cérebro do ChatGPT/Claude e ensiná-lo a pensar e a tomar decisões.", icon: "🧠" },
  { time: "Minutos 50-80", title: "A Ação", description: "Seu agente vai aprender a executar uma tarefa real. Seja responder um e-mail, triar um lead ou organizar sua agenda, você vai ver a automação acontecer.", icon: "⚡" },
  { time: "Minutos 80-90", title: "O Lançamento", description: "Com um clique, seu agente estará no ar, pronto para trabalhar para você. Você terá um link, um ativo, uma prova real da sua nova capacidade.", icon: "🚀" },
];

export default function JourneySection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="section-badge">🛠️ O que você vai construir</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Sua Jornada de 90 Minutos: <span className="gradient-text">Do Zero ao Agente Funcional</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-8 top-0 bottom-0 hidden w-[2px] bg-cb-border md:block" />
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-6"
              >
                <div className="hidden md:flex shrink-0 relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl gradient-cta text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1 rounded-xl border border-cb-border bg-cb-surface p-6 transition-all duration-300 hover:border-cb-orange/40">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cb-orange">{step.time}</span>
                  <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-cb-text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <CTAButton />
        </motion.div>
      </div>
    </section>
  );
}
