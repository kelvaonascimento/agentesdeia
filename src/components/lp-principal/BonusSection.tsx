"use client";

import { motion } from "framer-motion";

export default function BonusSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-cb-orange/30 bg-gradient-to-br from-cb-surface via-cb-surface to-cb-orange/5 p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-cta text-2xl">🎁</div>
            <h3 className="text-xl font-bold text-white">Bônus Exclusivo: Template &quot;Plug-and-Play&quot;</h3>
            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Além de todo o conhecimento, você receberá o <span className="font-bold text-white">template exato</span> do agente que construirmos na aula. Você poderá copiar, colar e adaptar para criar novos agentes em minutos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-cb-border bg-cb-surface p-8"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald text-2xl">🛡️</div>
            <h3 className="text-xl font-bold text-white">Sua Satisfação ou seu Dinheiro de Volta</h3>
            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Se ao final do workshop você sentir que não entregamos a transformação prometida, basta nos enviar um e-mail em até <span className="font-bold text-white">7 dias</span> e nós devolvemos 100% do seu investimento. <span className="font-bold text-white">Risco zero para você.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
