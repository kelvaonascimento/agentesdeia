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
import { Star, Users, CheckCircle } from "lucide-react";

export default function LP4ProvaSocial() {
  return (
    <>
      <PageTracker pageName="Workshop Agente IA" variant="prova-social" />
      <StickyBar />
      <Header />

      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-cb-orange/5 rounded-full blur-[150px]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-cb-orange/10 border border-cb-orange/20 rounded-full px-4 py-1.5 mb-6">
              <Users className="w-4 h-4 text-cb-orange" />
              <span className="text-cb-orange text-sm font-medium">+6.793 Builders já formados</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-6">
              Junte-se aos Builders que já{" "}
              <span className="text-gradient-orange">transformaram suas carreiras</span>
            </h1>

            <p className="text-base sm:text-lg text-cb-text-secondary mb-8 max-w-2xl mx-auto">
              Crie seu primeiro Agente de IA em 90 minutos. Workshop ao vivo, prático, sem código.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div id="inscricao">
              <LeadCaptureForm buttonText="QUERO SER O PRÓXIMO BUILDER - R$167" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex items-center justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-cb-border">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-cb-orange"><AnimatedNumber value="6.793+" /></p>
                <p className="text-xs text-cb-text-muted mt-1">Alunos</p>
              </div>
              <div className="w-px h-12 bg-cb-border" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-cb-orange"><AnimatedNumber value="100+" /></p>
                <p className="text-xs text-cb-text-muted mt-1">Agentes Criados</p>
              </div>
              <div className="w-px h-12 bg-cb-border" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-cb-orange"><AnimatedNumber value="4.9" /></p>
                <p className="text-xs text-cb-text-muted mt-1">Avaliação</p>
              </div>
              <div className="w-px h-12 bg-cb-border hidden sm:block" />
              <div className="text-center hidden sm:block">
                <div className="flex items-center gap-0.5 justify-center">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-xs text-cb-text-muted mt-1">5 estrelas</p>
              </div>
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
            <span><strong className="text-white">28/02</strong> - 14h ao vivo</span>
            <span><strong className="text-white">Online</strong> - 90 minutos</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">Depoimentos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">O que nossos <span className="text-gradient-orange">Builders</span> dizem</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rafael M.", role: "Empreendedor", text: "Em 90 minutos eu criei algo que achei que levaria semanas. O template e ouro puro." },
              { name: "Juliana S.", role: "Marketing Digital", text: "Nunca pensei que conseguiria criar um agente de IA sem saber programar. O Caio simplifica tudo." },
              { name: "Pedro A.", role: "Gestor de Projetos", text: "O agente que criei no workshop já está economizando 2h do meu dia. Melhor investimento que fiz." },
              { name: "Mariana L.", role: "Freelancer", text: "Agora eu oferto criacao de agentes como servico. Uma nova fonte de renda que surgiu do workshop." },
              { name: "Carlos R.", role: "CEO Startup", text: "Automatizei o atendimento da minha empresa em um dia. O workshop me deu a base que eu precisava." },
              { name: "Ana B.", role: "Consultora", text: "A didática do Caio é incrível. Mesmo sem background técnico, sai do workshop com um agente funcionando." },
            ].map((dep, i) => (
              <div key={i} className="bg-cb-surface border border-cb-border rounded-2xl p-6 hover:border-cb-orange/20 transition-all">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-cb-text-secondary leading-relaxed mb-4">&ldquo;{dep.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-cb-border">
                  <div className="w-10 h-10 bg-cb-orange/10 rounded-full flex items-center justify-center">
                    <span className="text-cb-orange font-bold text-sm">{dep.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{dep.name}</p>
                    <p className="text-cb-text-muted text-xs">{dep.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-cb-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">Caso Real: <span className="text-gradient-orange">De Espectador a Builder</span></h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-cb-surface-light border border-red-500/20 rounded-2xl p-6">
              <p className="text-red-400 font-bold text-sm uppercase tracking-wider mb-4">Antes do Workshop</p>
              <ul className="space-y-3">
                {["Consumia conteúdo sobre IA sem aplicar", "Achava que precisava saber programar", "Perdia horas em tarefas manuais repetitivas", "Sentia que IA era só para grandes empresas"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-cb-text-muted text-sm"><span className="text-red-400 mt-0.5">&#x2715;</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-cb-surface-light border border-green-500/20 rounded-2xl p-6">
              <p className="text-green-400 font-bold text-sm uppercase tracking-wider mb-4">Depois do Workshop</p>
              <ul className="space-y-3">
                {["Criou um agente funcional em 90 minutos", "Entendeu que não precisa de código", "Automatizou tarefas e economiza 2h/dia", "Oferece servico de criacao de agentes"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-cb-text-muted text-sm"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection variant="compact" />      <TargetAudience />
      <StepsSection />
      <ExpertSection variant="side" imageIndex={2} />
      <BonusGarantia />

      <section className="py-16 sm:py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-12">Perguntas Frequentes</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Mais de 6.793 Builders já começaram.{" "}<span className="text-gradient-orange">Você é o próximo?</span></h2>
          <p className="text-cb-text-muted text-lg mb-8">28 de Fevereiro. 14h. Online e ao vivo.</p>
          <div className="mb-8"><CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="compact" /></div>
          <LeadCaptureForm variant="compact" buttonText="QUERO ME TORNAR UM BUILDER - R$167" />
        </div>
      </section>

      <Footer />
    </>
  );
}
