"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import CountdownTimer from "./CountdownTimer";

const EVENT_DATE = new Date("2026-02-28T14:00:00-03:00");

export default function CTASection() {
  return (
    <section className="py-12 bg-cb-surface-light/20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Em 28 de Fevereiro, você pode continuar como espectador ou{" "}
            <span className="gradient-text">se tornar um builder.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cb-text-muted">
            A escolha é sua. Esta é a sua oportunidade de dar o passo mais importante: o primeiro.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <CountdownTimer targetDate={EVENT_DATE} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex justify-center"
        >
          <CTAButton />
        </motion.div>
      </div>
    </section>
  );
}
