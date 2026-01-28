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
import { Play, Calendar, Clock, MapPin, Cpu, Zap, FileText } from "lucide-react";

export default function LP7VideoFirst() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* HERO - Video Prominent */}
      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cb-orange/5 rounded-full blur-[150px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video bg-cb-surface border-2 border-cb-orange/20 rounded-2xl overflow-hidden mb-10 group cursor-pointer hover:border-cb-orange/40 transition-all">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <div className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-cb-text-secondary font-medium">Assista o convite do Caio</p>
            </div>
            <Image src="/images/expert/caio-2.png" alt="Caio Vicentino" fill className="object-cover opacity-20" />
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
              Crie seu Primeiro{" "}
              <span className="text-gradient-orange">Agente de IA</span>
              {" "}em 90 Minutos
            </h1>

            <p className="text-lg text-cb-text-secondary mb-8 max-w-2xl mx-auto">
              Workshop ao vivo, pratico, sem codigo. Assista ao convite e garanta sua vaga.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-4 py-2 text-sm text-cb-text-secondary">
                <Calendar className="w-4 h-4 text-cb-orange" />
                28 de Fevereiro
              </div>
              <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-4 py-2 text-sm text-cb-text-secondary">
                <Clock className="w-4 h-4 text-cb-orange" />
                14h (Brasilia)
              </div>
              <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-4 py-2 text-sm text-cb-text-secondary">
                <MapPin className="w-4 h-4 text-cb-orange" />
                Online
              </div>
            </div>

            <div id="inscricao">
              <LeadCaptureForm buttonText="GARANTIR MINHA VAGA POR R$167" />
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
            <span><strong className="text-white">90min</strong> ao vivo</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">O que voce vai <span className="text-gradient-orange">construir</span></h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Agente de IA", desc: "Um agente funcional, no ar, pronto para executar tarefas automaticamente." },
              { icon: FileText, title: "Template Exclusivo", desc: "O template exato da aula para voce copiar e criar novos agentes em minutos." },
              { icon: Zap, title: "Automacao Real", desc: "Uma tarefa automatizada: responder e-mails, triar leads ou organizar agenda." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-cb-surface border border-cb-border rounded-2xl p-6 text-center hover:border-cb-orange/20 transition-all">
                  <div className="w-14 h-14 bg-cb-orange/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-cb-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-cb-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PartnersSection variant="compact" />      <StepsSection variant="horizontal" />
      <ExpertSection variant="side" imageIndex={3} />
      <TargetAudience variant="cards" />
      <BonusGarantia />

      <section className="py-16 sm:py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-12">Perguntas Frequentes</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Assista. Decida. <span className="text-gradient-orange">Construa.</span></h2>
          <p className="text-cb-text-muted text-lg mb-8">28 de Fevereiro. 14h. Online e ao vivo.</p>
          <div className="mb-8"><CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="compact" /></div>
          <LeadCaptureForm variant="compact" buttonText="GARANTIR MINHA VAGA - R$167" />
        </div>
      </section>

      <Footer />
    </>
  );
}
