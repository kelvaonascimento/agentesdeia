"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CountdownTimer from "./CountdownTimer";

const EVENT_DATE = new Date("2026-02-28T14:00:00-03:00");

export default function HeroSection() {
  return (
    <section id="inscricao" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <span className="h-2 w-2 rounded-full bg-cb-orange animate-pulse" />
                Workshop Ao Vivo - Vagas Limitadas
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-shadow-glow"
            >
              Crie seu Primeiro <span className="gradient-text">Agente de IA</span> em 90 Minutos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-3 text-lg text-cb-text-muted md:text-xl"
            >
              (Mesmo Sem Saber Escrever Uma Linha de Código)
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-3 text-cb-text-muted"
            >
              Participe do nosso workshop ao vivo, saia do zero, automatize uma tarefa real e receba um template pronto para usar.
            </motion.p>

            {/* Foto no mobile: antes da data/horário/online */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-4 flex justify-center lg:hidden"
            >
              <div className="relative w-full max-w-[340px]">
                <Image
                  src="/images/caio-vicentino.webp"
                  alt="Caio Vicentino - Co-fundador Cultura Builder"
                  width={340}
                  height={425}
                  className="w-full rounded-2xl border border-cb-border"
                />
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-cb-border bg-cb-surface/90 backdrop-blur-sm p-3">
                  <p className="font-bold text-white text-sm">Caio Vicentino</p>
                  <p className="text-xs text-cb-orange">Co-fundador Cultura Builder</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 rounded-full border border-cb-border bg-cb-surface-light px-4 py-2 text-sm text-white">
                <span>📅</span>
                <span>28 de Fevereiro</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-cb-border bg-cb-surface-light px-4 py-2 text-sm text-white">
                <span>⏰</span>
                <span>14h (Brasília)</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-cb-border bg-cb-surface-light px-4 py-2 text-sm text-white">
                <span>📍</span>
                <span>Online e Ao Vivo</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6"
            >
              <LeadCaptureForm buttonText="QUERO GARANTIR MINHA VAGA POR R$167" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <Image
                src="/images/caio-vicentino.webp"
                alt="Caio Vicentino - Co-fundador Cultura Builder"
                width={448}
                height={560}
                className="w-full max-w-md rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-cb-border bg-cb-surface/90 backdrop-blur-sm p-4">
                <p className="font-bold text-white">Caio Vicentino</p>
                <p className="text-sm text-cb-orange">Co-fundador Cultura Builder</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex justify-center"
        >
          <CountdownTimer targetDate={EVENT_DATE} variant="hero" />
        </motion.div>
      </div>
    </section>
  );
}
