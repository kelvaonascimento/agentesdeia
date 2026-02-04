"use client";

import Header from "@/components/Header";
import StickyBar from "@/components/StickyBar";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CountdownTimer from "@/components/CountdownTimer";
import StepsSection from "@/components/StepsSection";
import TargetAudience from "@/components/TargetAudience";
import ExpertSection from "@/components/ExpertSection";
import BonusGarantia from "@/components/BonusGarantia";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import PageTracker from "@/components/PageTracker";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function LP1MainPage() {
  return (
    <>
      <PageTracker pageName="Workshop Agente IA" variant="principal" />
      <StickyBar />
      <Header />

      {/* HERO - 2 Column Grid */}
      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-cb-orange/5 rounded-full blur-[120px] animate-orb-1" />
        <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-cb-orange/3 rounded-full blur-[100px] animate-orb-2" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cb-orange/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Content */}
            <div>
              <ScrollReveal delay={0} duration={600}>
                <div className="inline-flex flex-wrap items-center gap-2 bg-cb-orange/10 border border-cb-orange/20 rounded-full px-4 py-1.5 mb-6 max-w-full">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cb-orange opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cb-orange" />
                  </span>
                  <span className="text-cb-orange text-sm font-medium">Workshop Ao Vivo - Vagas Limitadas</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100} duration={700}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
                  Crie seu Primeiro{" "}
                  <span className="text-gradient-orange">Agente de IA</span>
                  {" "}em 90 Minutos
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200} duration={700}>
                <p className="text-base sm:text-lg text-cb-text-secondary mb-3">
                  (Mesmo Sem Saber Escrever Uma Linha de Código)
                </p>

                <p className="text-cb-text-muted mb-8 leading-relaxed max-w-lg">
                  Participe do nosso workshop ao vivo, saia do zero, automatize uma tarefa real e
                  receba um template pronto para usar.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300} duration={700}>
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-4 py-2 text-sm text-cb-text-secondary">
                    <Calendar className="w-4 h-4 text-cb-orange" />
                    28 de Fevereiro
                  </div>
                  <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-4 py-2 text-sm text-cb-text-secondary">
                    <Clock className="w-4 h-4 text-cb-orange" />
                    14h (Brasília)
                  </div>
                  <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-4 py-2 text-sm text-cb-text-secondary">
                    <MapPin className="w-4 h-4 text-cb-orange" />
                    Online e Ao Vivo
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400} duration={700}>
                <div id="inscricao">
                  <LeadCaptureForm buttonText="QUERO GARANTIR MINHA VAGA POR R$167" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Expert Image */}
            <ScrollReveal direction="right" delay={200}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-cb-orange/10 rounded-3xl blur-2xl" />
                  <div className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[500px] rounded-2xl overflow-hidden border border-cb-orange/20 glow-orange-sm">
                    <Image
                      src="/images/expert/caio-1.png"
                      alt="Caio Vicentino"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
                    <p className="text-white font-bold">Caio Vicentino</p>
                    <p className="text-cb-orange text-sm">Co-fundador Cultura Builder</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-12 flex justify-center">
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" />
          </div>
        </div>
      </section>

      {/* Expert intro strip */}
      <section className="py-5 bg-cb-surface border-y border-cb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cb-orange relative">
              <Image src="/images/expert/caio-5.png" alt="Caio" fill className="object-cover" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Com Caio Vicentino</p>
              <p className="text-cb-text-muted text-xs">Co-fundador Cultura Builder</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-cb-border" />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-cb-text-muted">
            <span><AnimatedNumber value="6.793+" className="text-white font-bold" /> Builders</span>
            <span><AnimatedNumber value="100+" className="text-white font-bold" /> Agentes criados</span>
            <span><strong className="text-white">Yield Hackers</strong></span>
          </div>
        </div>
      </section>

      {/* Chega de teoria */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                  Chega de só assistir.{" "}
                  <span className="text-gradient-orange">É hora de construir.</span>
                </h2>
                <p className="text-cb-text-muted text-lg leading-relaxed mb-4">
                  Você já consumiu horas de conteúdo sobre Inteligência Artificial, mas ainda se sente
                  um espectador? Este workshop foi desenhado para uma única coisa: transformar
                  você em um builder.
                </p>
                <p className="text-cb-text-secondary text-lg leading-relaxed font-medium">
                  Em 90 minutos, você não vai apenas aprender &mdash; você vai fazer.
                  Você vai sair desta aula com um ativo digital real, criado por você, funcionando e
                  pronto para trabalhar.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={100}>
              <div className="flex justify-center">
                <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-cb-orange/20">
                  <Image
                    src="/images/expert/caio-2.png"
                    alt="Caio Vicentino - Builder"
                    width={400}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <PartnersSection />      <TargetAudience />
      <StepsSection />
      <ExpertSection imageIndex={3} />
      <BonusGarantia />

      <section className="py-16 sm:py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
              Dúvidas frequentes
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Perguntas <span className="text-gradient-orange">Frequentes</span>
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-cb-orange/5 rounded-full blur-[150px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
            Em 28 de Fevereiro, você pode continuar como espectador ou{" "}
            <span className="text-gradient-orange">se tornar um builder.</span>
          </h2>
          <p className="text-cb-text-muted text-lg mb-8 max-w-2xl mx-auto">
            A escolha é sua. Esta é a sua oportunidade de dar o passo mais importante: o primeiro.
          </p>
          <div className="mb-8">
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="large" />
          </div>
          <LeadCaptureForm variant="compact" buttonText="SIM, QUERO ME TORNAR UM BUILDER" />
        </div>
      </section>

      <Footer />
    </>
  );
}
