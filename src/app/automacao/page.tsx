"use client";

import Header from "@/components/Header";
import StickyBar from "@/components/StickyBar";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CountdownTimer from "@/components/CountdownTimer";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, MapPin, CheckCircle, Settings, Brain, Zap, Rocket, Gift, ShieldCheck, Star, Users, ChevronRight } from "lucide-react";

export default function LP10MobileCTA() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-black/95 backdrop-blur-lg border-t border-cb-orange/20 p-3">
        <a href="#inscricao" className="flex items-center justify-center gap-2 w-full bg-gradient-orange text-white font-bold py-4 rounded-xl animate-glow-pulse">
          Garantir Vaga - R$167
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* HERO - 2 Column */}
      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-12 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-0 right-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-cb-orange/5 rounded-full blur-[120px] animate-orb-1" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 bg-cb-orange/10 border border-cb-orange/20 rounded-full px-3 py-1 mb-5">
                  <span className="w-2 h-2 bg-cb-orange rounded-full animate-pulse" />
                  <span className="text-cb-orange text-xs font-medium">Ao Vivo - 28 de Fevereiro</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">
                  Crie seu Agente de IA em{" "}
                  <span className="text-gradient-orange">90 Minutos</span>
                </h1>

                <p className="text-base sm:text-lg text-cb-text-secondary mb-5 leading-relaxed">
                  Sem código. Workshop prático ao vivo. Saia com um agente funcional e um template para criar mais.
                </p>
              </ScrollReveal>

              <div className="flex flex-wrap gap-2 mb-5">
                <div className="flex items-center gap-1.5 bg-cb-surface border border-cb-border rounded-full px-3 py-1.5 text-xs text-cb-text-secondary">
                  <Calendar className="w-3 h-3 text-cb-orange" />
                  28/02
                </div>
                <div className="flex items-center gap-1.5 bg-cb-surface border border-cb-border rounded-full px-3 py-1.5 text-xs text-cb-text-secondary">
                  <Clock className="w-3 h-3 text-cb-orange" />
                  14h
                </div>
                <div className="flex items-center gap-1.5 bg-cb-surface border border-cb-border rounded-full px-3 py-1.5 text-xs text-cb-text-secondary">
                  <MapPin className="w-3 h-3 text-cb-orange" />
                  Online
                </div>
              </div>

              <ScrollReveal delay={100}>
                <div id="inscricao" className="hidden sm:block">
                  <LeadCaptureForm variant="compact" buttonText="GARANTIR MINHA VAGA - R$167" />
                </div>

                <div className="flex items-center gap-3 mt-5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-cb-surface-lighter border-2 border-black flex items-center justify-center">
                        <Users className="w-3 h-3 text-cb-orange" />
                      </div>
                    ))}
                  </div>
                  <p className="text-cb-text-muted text-xs">+<AnimatedNumber value="200" /> inscritos</p>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="right" delay={100}>
              <div className="flex justify-center">
                <div className="w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] rounded-2xl overflow-hidden border border-cb-orange/20 relative">
                  <Image src="/images/expert/caio-4.png" alt="Caio Vicentino" fill className="object-cover object-top" priority />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-center">
                    <p className="text-white font-bold text-sm">Caio Vicentino</p>
                    <p className="text-cb-orange text-xs">Cultura Builder</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-6 bg-cb-surface border-y border-cb-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-black text-cb-orange">90min</p>
              <p className="text-cb-text-muted text-xs mt-0.5">Ao vivo</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-cb-orange">0 código</p>
              <p className="text-cb-text-muted text-xs mt-0.5">No-code</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-cb-orange">R$167</p>
              <p className="text-cb-text-muted text-xs mt-0.5">Único</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">4 passos em <span className="text-gradient-orange">90 minutos</span></h2>
          <div className="space-y-3">
            {[
              { icon: Settings, title: "Setup", time: "0-20min", desc: "Configure do zero" },
              { icon: Brain, title: "Inteligencia", time: "20-50min", desc: "Conecte ao ChatGPT" },
              { icon: Zap, title: "Ação", time: "50-80min", desc: "Automatize uma tarefa" },
              { icon: Rocket, title: "Lançamento", time: "80-90min", desc: "Coloque no ar" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-4 bg-cb-surface border border-cb-border rounded-xl p-4 hover:border-cb-orange/30 transition-all">
                  <div className="w-12 h-12 bg-cb-orange/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-cb-orange" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold">{step.title}</h3>
                      <span className="text-cb-orange text-xs font-mono">{step.time}</span>
                    </div>
                    <p className="text-cb-text-muted text-sm">{step.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cb-border" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PartnersSection variant="compact" />      <section className="py-10 sm:py-16 bg-cb-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-cb-surface-light border border-cb-border rounded-2xl p-4 sm:p-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-cb-orange/20 shrink-0 relative">
              <Image src="/images/expert/caio-5.png" alt="Caio Vicentino" fill className="object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">Caio Vicentino</h3>
              <p className="text-cb-orange text-sm font-medium mb-2">Co-fundador Cultura Builder</p>
              <p className="text-cb-text-muted text-sm leading-relaxed">6.793+ alunos. Criador da Yield Hackers. Ele usa agentes de IA para escalar seus negócios e vai te ensinar a fazer o mesmo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl overflow-hidden">
            <div className="bg-gradient-orange p-4 text-center">
              <p className="text-white font-bold text-lg">Workshop Agente de IA</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-center mb-6">
                <span className="text-cb-text-muted line-through text-sm">R$ 297</span>
                <div className="text-4xl font-black text-white mt-1">R$ 167</div>
                <p className="text-cb-text-muted text-xs mt-1">Pagamento único</p>
              </div>
              <div className="space-y-3 mb-6">
                {["Workshop ao vivo 90min", "Agente funcional", "Template exclusivo", "Gravação 7 dias", "Grupo VIP WhatsApp", "Certificado"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-cb-text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <LeadCaptureForm variant="compact" buttonText="GARANTIR MINHA VAGA" />
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-cb-text-muted">
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  Garantia 7 dias
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cb-text-muted">
                  <Gift className="w-3 h-3 text-cb-orange" />
                  Template bonus
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-cb-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-8">Dúvidas?</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-10 sm:py-16 pb-24 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Espectador ou <span className="text-gradient-orange">builder?</span></h2>
          <p className="text-cb-text-muted mb-6">28 de Fevereiro. 14h. Online e ao vivo.</p>
          <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="compact" />
          <div className="mt-6 hidden sm:block">
            <LeadCaptureForm variant="compact" buttonText="QUERO SER BUILDER - R$167" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
