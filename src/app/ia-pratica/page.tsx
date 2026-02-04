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
import { XCircle, CheckCircle, ShieldCheck, Gift, HelpCircle } from "lucide-react";

export default function LP8FAQFocused() {
  return (
    <>
      <PageTracker pageName="Workshop Agente IA" variant="faq-focused" />
      <StickyBar />
      <Header />

      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-0 left-1/3 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-cb-orange/5 rounded-full blur-[120px] animate-orb-1" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-cb-orange/10 border border-cb-orange/20 rounded-full px-4 py-1.5 mb-6">
              <HelpCircle className="w-4 h-4 text-cb-orange" />
              <span className="text-cb-orange text-sm font-medium">Vamos quebrar alguns mitos</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
              Tudo que você <span className="text-gradient-orange">acha que sabe</span> sobre IA está errado
            </h1>

            <p className="text-base sm:text-lg text-cb-text-secondary mb-8 max-w-2xl mx-auto">
              Você não precisa de código. Não precisa de semanas. Não precisa ser um expert em tecnologia. Crie seu primeiro agente de IA em 90 minutos.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div id="inscricao">
              <LeadCaptureForm buttonText="QUERO DESCOBRIR A VERDADE - R$167" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-5 bg-cb-surface border-y border-cb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cb-orange relative">
              <Image src="/images/expert/caio-5.png" alt="Caio" fill sizes="96px" className="object-cover" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Com Caio Vicentino</p>
              <p className="text-cb-text-muted text-xs">Co-fundador Cultura Builder</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-cb-border" />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-cb-text-muted">
            <span><AnimatedNumber value="6.793+" className="text-white font-bold" /> Builders</span>
            <span><strong className="text-white">28/02</strong> 14h</span>
          </div>
        </div>
      </section>

      {/* Mitos vs Realidade */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">Mitos vs <span className="text-gradient-orange">Realidade</span></h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-cb-surface border border-cb-border rounded-2xl p-5 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">O que você acha:</h3>
              <div className="h-px bg-cb-border mb-6" />
              <div className="space-y-4">
                {[
                  "Preciso saber programar para criar IA",
                  "Criar um agente de IA leva semanas",
                  "IA é só para grandes empresas",
                  "E muito caro implementar IA",
                  "Preciso de um time de devs",
                  "E complexo demais para mim",
                ].map((myth, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-cb-text-muted">{myth}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-cb-surface border border-green-500/20 rounded-2xl p-5 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6">A verdade:</h3>
              <div className="h-px bg-green-500/20 mb-6" />
              <div className="space-y-4">
                {[
                  "Zero código necessário — é 100% no-code",
                  "90 minutos — você sai com um agente funcional",
                  "Qualquer pessoa pode criar e usar",
                  "R$167 — pagamento único, sem mensalidades",
                  "Você faz sozinho, com um template pronto",
                  "Se sabe usar WhatsApp, sabe criar um agente",
                ].map((reality, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-cb-text-secondary">{reality}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cb-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">Todas as suas dúvidas respondidas</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Perguntas <span className="text-gradient-orange">Frequentes</span></h2>
            <p className="text-cb-text-muted mt-3 max-w-xl mx-auto">Se sua duvida não estiver aqui, entre em contato no nosso WhatsApp.</p>
          </div>
          <FAQ />
        </div>
      </section>

      <PartnersSection />      <TargetAudience />
      <StepsSection />
      <ExpertSection variant="minimal" imageIndex={4} />
      <BonusGarantia variant="stacked" />

      <section className="py-16 sm:py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl overflow-hidden">
            <div className="bg-gradient-orange p-4 text-center">
              <p className="text-white font-bold text-lg">Workshop Agente de IA</p>
            </div>
            <div className="p-5 sm:p-8 text-center">
              <span className="text-cb-text-muted line-through text-sm">R$ 297</span>
              <div className="text-5xl font-black text-white mt-2">R$ 167</div>
              <p className="text-cb-text-muted text-sm mt-2">Pagamento único</p>
              <div className="my-8">
                <LeadCaptureForm variant="compact" buttonText="GARANTIR MINHA VAGA" />
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-xs text-cb-text-muted">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Garantia 7 dias
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cb-text-muted">
                  <Gift className="w-4 h-4 text-cb-orange" />
                  Template bonus
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cb-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Sem mais desculpas.{" "}<span className="text-gradient-orange">Sem mais mitos.</span></h2>
          <p className="text-cb-text-muted text-base sm:text-lg mb-8">28 de Fevereiro. 14h. Online. Sem código. R$167.</p>
          <div className="mb-8"><CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="compact" /></div>
          <LeadCaptureForm variant="compact" buttonText="QUERO COMECAR AGORA" />
        </div>
      </section>

      <Footer />
    </>
  );
}
