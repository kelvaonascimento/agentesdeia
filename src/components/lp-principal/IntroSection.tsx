"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Chega de só assistir. <span className="gradient-text">É hora de construir.</span>
            </h2>
            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Você já consumiu horas de conteúdo sobre Inteligência Artificial, mas ainda se sente um espectador? Este workshop foi desenhado para uma única coisa: transformar você em um <span className="font-bold text-white">builder</span>.
            </p>
            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Em 90 minutos, você não vai apenas aprender — você vai <span className="font-bold text-white">fazer</span>. Você vai sair desta aula com um ativo digital real, criado por você, funcionando e pronto para trabalhar.
            </p>
            <div className="mt-4 flex gap-4">
              <div className="rounded-lg bg-cb-surface border border-cb-border px-4 py-3 text-center">
                <span className="block text-lg font-bold gradient-text">6.793+</span>
                <span className="text-xs text-cb-text-muted">Builders</span>
              </div>
              <div className="rounded-lg bg-cb-surface border border-cb-border px-4 py-3 text-center">
                <span className="block text-lg font-bold text-white">100+</span>
                <span className="text-xs text-cb-text-muted">Agentes criados</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Image
              src="/images/caio-small.webp"
              alt="Caio Vicentino - Builder"
              width={448}
              height={448}
              className="w-full max-w-md rounded-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
