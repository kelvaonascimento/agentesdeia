"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

const features = [
  "Workshop ao vivo de 90 minutos no Zoom",
  "Construção de um agente de IA funcional do zero",
  "Integração com ChatGPT/Claude na prática",
  "Template Plug-and-Play exclusivo",
  "Acesso à gravação completa",
  "Grupo VIP no WhatsApp",
  "Certificado digital de participação",
  "Garantia de 7 dias — risco zero",
];

export default function PricingSection() {
  return (
    <section className="py-12 bg-cb-surface-light/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="section-badge">🎟️ Vagas limitadas</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Invista no seu <span className="gradient-text">primeiro passo.</span>
          </h2>
          <p className="mt-2 text-cb-text-muted">Tudo o que você precisa para criar seu primeiro agente de IA.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl rounded-2xl border border-cb-orange/30 bg-cb-surface p-8"
        >
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <span className="mt-0.5 text-cb-orange">✓</span>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-cb-surface-light px-4 py-2">
              <span className="text-sm text-cb-text-muted">🕐</span>
              <span className="text-sm font-medium text-white">90 min ao vivo</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-cb-surface-light px-4 py-2">
              <span className="text-sm text-cb-text-muted">🎥</span>
              <span className="text-sm font-medium text-white">+ gravação</span>
            </div>
          </div>

          <div className="mt-6 border-t border-cb-border pt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-cb-text-muted">Por apenas</span>
              <span className="text-5xl font-bold gradient-text">R$167</span>
            </div>
            <p className="mt-2 text-sm text-cb-text-muted">Pagamento único e seguro</p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <CTAButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
