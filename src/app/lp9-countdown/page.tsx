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
import Image from "next/image";
import { ArrowRight, Timer, Lock, AlertTriangle, CheckCircle } from "lucide-react";

export default function LP9Countdown() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* Fixed Bottom Countdown Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-t border-cb-orange/20 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-cb-orange hidden sm:block" />
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="inline" />
            <span className="text-cb-text-muted text-sm hidden sm:block">para o encerramento</span>
          </div>
          <a href="#inscricao" className="bg-gradient-orange text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
            Garantir Vaga - R$167
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cb-orange/5 rounded-full blur-[150px]" /><div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cb-orange/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-8">
            <Timer className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">Inscrições encerrando</span>
          </div>

          <div className="mb-10">
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="large" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
            Crie seu Primeiro{" "}
            <span className="text-gradient-orange">Agente de IA</span>
            {" "}em 90 Minutos
          </h1>

          <p className="text-lg text-cb-text-secondary mb-8 max-w-2xl mx-auto">
            Workshop ao vivo no dia 28 de Fevereiro. Sem código. Com template. Garantia de 7 dias.
          </p>

          <div id="inscricao">
            <LeadCaptureForm buttonText="GARANTIR MINHA VAGA POR R$167" />
          </div>

          <div className="max-w-md mx-auto mt-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-cb-text-muted">Vagas preenchidas</span>
              <span className="text-cb-orange font-bold">87%</span>
            </div>
            <div className="h-2.5 bg-cb-surface rounded-full overflow-hidden">
              <div className="h-full bg-gradient-orange rounded-full" style={{ width: "87%" }} />
            </div>
          </div>
        </div>
      </section>

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
          <div className="flex items-center gap-6 text-sm text-cb-text-muted">
            <span><strong className="text-white">6.793+</strong> Builders</span>
            <span><strong className="text-white">28/02</strong> 14h ao vivo</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">Etapas do <span className="text-gradient-orange">Fechamento</span></h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-6 bg-cb-surface border-2 border-green-500/30 rounded-2xl text-center">
              <Lock className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <p className="text-white font-bold text-lg">Inscrições Abertas</p>
              <p className="text-green-400 text-sm mt-1">Agora</p>
            </div>
            <div className="p-6 bg-cb-surface border border-cb-border rounded-2xl text-center opacity-60">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <p className="text-white font-bold text-lg">Últimas Vagas</p>
              <p className="text-yellow-400 text-sm mt-1">27/02 - 12h</p>
            </div>
            <div className="p-6 bg-cb-surface border border-cb-border rounded-2xl text-center opacity-40">
              <Lock className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <p className="text-white font-bold text-lg">Encerradas</p>
              <p className="text-red-400 text-sm mt-1">27/02 - 23h59</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-cb-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">Tudo isso antes que o <span className="text-gradient-orange">tempo acabe</span></h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {["Workshop ao vivo de 90 minutos com Caio Vicentino", "Agente de IA funcional criado ao vivo", "Template Plug-and-Play exclusivo", "Gravação completa por 7 dias", "Grupo VIP no WhatsApp", "Garantia total de 7 dias - risco zero"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-cb-surface-light border border-cb-border rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-cb-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection variant="compact" />      <TargetAudience variant="cards" />
      <StepsSection variant="horizontal" />
      <ExpertSection variant="minimal" imageIndex={5} />
      <BonusGarantia />

      <section className="py-16 sm:py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-12">Perguntas Frequentes</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-16 sm:py-24 mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Timer className="w-12 h-12 text-cb-orange mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">O relógio está correndo.</h2>
          <p className="text-lg text-cb-text-muted mb-6">Quando chegar a zero, as inscrições serão encerradas.</p>
          <div className="mb-8"><CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="large" /></div>
          <LeadCaptureForm variant="compact" buttonText="GARANTIR MINHA VAGA ANTES QUE ACABE" />
        </div>
      </section>

      <Footer />
    </>
  );
}
