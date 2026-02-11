"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "6.793+", label: "Builders" },
  { value: "100+", label: "Agentes criados" },
  { value: "50+", label: "Empresas parceiras" },
];

export default function AboutSection() {
  return (
    <section className="py-12 bg-cb-surface-light/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="section-badge">👨‍🏫 Conheça seu guia</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Guiado por quem <span className="gradient-text">constrói todos os dias.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/images/caio-about.webp"
              alt="Caio Vicentino"
              width={448}
              height={560}
              className="w-full max-w-md rounded-2xl"
              style={{ height: "auto" }}
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white">Caio Vicentino</h3>
            <p className="mt-1 text-cb-orange font-semibold">Co-fundador do Cultura Builder</p>

            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Caio Vicentino não é um teórico. Como co-fundador do <span className="font-bold text-white">Cultura Builder</span> — pioneiro em finanças descentralizadas e inteligência artificial — ele vive na fronteira da inovação.
            </p>
            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Com parcerias estratégicas com <span className="font-bold text-white">NVIDIA</span> (Inception Program) e <span className="font-bold text-white">AWS</span>, o Cultura Builder conecta sua comunidade de 6.793+ builders às maiores plataformas de tecnologia do mundo.
            </p>
            <p className="mt-4 text-cb-text-muted leading-relaxed">
              Ele vai te guiar com a didática de quem já ensinou milhares de pessoas e a experiência prática de quem usa agentes de IA para escalar seus próprios negócios.
            </p>

            <div className="mt-6 flex gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-lg bg-cb-surface border border-cb-border px-4 py-3 text-center">
                  <span className="block text-lg font-bold gradient-text">{stat.value}</span>
                  <span className="text-xs text-cb-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
