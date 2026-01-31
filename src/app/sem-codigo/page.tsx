"use client";

import Header from "@/components/Header";
import StickyBar from "@/components/StickyBar";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import StepsSection from "@/components/StepsSection";
import TargetAudience from "@/components/TargetAudience";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import Image from "next/image";
import { CheckCircle, ShieldCheck, Gift } from "lucide-react";

export default function LP5Minimalista() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* HERO - Ultra Clean */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 relative overflow-hidden bg-hero-gradient"><div className="absolute inset-0 bg-grid-pattern opacity-30" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-cb-orange/5 rounded-full blur-[150px]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-cb-orange text-sm font-semibold uppercase tracking-widest">
              Workshop Ao Vivo &mdash; 28 de Fevereiro
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mt-6 mb-6">
              Crie seu Agente de IA.{" "}
              <span className="text-gradient-orange">Sem código.</span>
            </h1>

            <p className="text-base sm:text-lg text-cb-text-muted mb-10 max-w-xl mx-auto leading-relaxed">
              90 minutos. Um agente funcional. Um template para criar mais. R$167.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div id="inscricao">
              <LeadCaptureForm buttonText="GARANTIR MINHA VAGA" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expert inline */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 p-5 bg-cb-surface border border-cb-border rounded-2xl">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cb-orange shrink-0 relative">
              <Image src="/images/expert/caio-5.png" alt="Caio Vicentino" fill className="object-cover" />
            </div>
            <div>
              <p className="text-white font-bold">Caio Vicentino</p>
              <p className="text-cb-text-muted text-sm">Co-fundador Cultura Builder &middot; <AnimatedNumber value="6.793+" /> alunos &middot; Yield Hackers</p>
            </div>
          </div>
        </div>
      </section>

      {/* O que você recebe */}
      <section className="py-16 sm:py-24 bg-cb-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">O que está incluso</h2>
          <div className="space-y-4">
            {[
              "Workshop ao vivo de 90 minutos",
              "Agente de IA funcional criado do zero",
              "Template Plug-and-Play exclusivo",
              "Gravação completa por 7 dias",
              "Acesso ao Grupo VIP no WhatsApp",
              "Certificado de participação",
              "Garantia de 7 dias — risco zero",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-cb-border last:border-0">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-cb-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection variant="compact" />      <TargetAudience variant="minimal" />
      <StepsSection variant="horizontal" />

      {/* Pricing card */}
      <section className="py-16 sm:py-24">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl overflow-hidden">
            <div className="bg-gradient-orange p-4 text-center">
              <p className="text-white font-bold text-lg">Workshop Agente de IA</p>
            </div>
            <div className="p-8 text-center">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-10">Dúvidas?</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Simples assim.</h2>
          <p className="text-cb-text-muted text-lg mb-8">28 de Fevereiro. 14h. Online. 90 minutos. R$167.</p>
          <LeadCaptureForm variant="compact" buttonText="QUERO COMECAR" />
        </div>
      </section>

      <Footer />
    </>
  );
}
