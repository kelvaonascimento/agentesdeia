"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    icon: "💼",
    title: "O Profissional Eficiente",
    desc: "...está sobrecarregado com tarefas manuais e quer usar a IA para recuperar seu tempo, aumentar sua produtividade e se tornar indispensável na sua empresa.",
  },
  {
    icon: "🚀",
    title: "O Empreendedor Visionário",
    desc: "...quer automatizar processos, otimizar o atendimento, reduzir custos operacionais e escalar seu negócio sem precisar contratar um time de desenvolvedores.",
  },
  {
    icon: "💡",
    title: "O Curioso Corajoso",
    desc: "...é fascinado por IA, mas se sente intimidado pelo código. Você quer dar o primeiro passo prático, criar seu primeiro projeto real e finalmente entender o poder da construção com IA.",
  },
];

export default function WhoIsItForSection() {
  return (
    <section className="py-12 bg-cb-surface-light/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="section-badge">🎯 Para quem é</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Este workshop é para <span className="gradient-text">você que...</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-cb-border bg-cb-surface p-8 transition-all duration-300 hover:border-cb-orange/40"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-cta text-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-cb-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
