import Header from "@/components/Header";
import StickyBar from "@/components/StickyBar";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import CountdownTimer from "@/components/CountdownTimer";
import StepsSection from "@/components/StepsSection";
import TargetAudience from "@/components/TargetAudience";
import BonusGarantia from "@/components/BonusGarantia";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";
import Image from "next/image";
import { Calendar, Clock, MapPin, Quote, Award, Users, Cpu } from "lucide-react";

export default function LP3Expert() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* HERO - Expert Focused 2-Column */}
      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-0 right-1/4 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-cb-orange/5 rounded-full blur-[120px] animate-orb-1" /><div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-cb-orange/3 rounded-full blur-[100px] animate-orb-2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-md rounded-2xl overflow-hidden border border-cb-orange/20">
                <Image
                  src="/images/expert/caio-3.png"
                  alt="Caio Vicentino"
                  width={500}
                  height={600}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-cb-orange/10 border border-cb-orange/20 rounded-full px-4 py-1.5 mb-6">
                <Award className="w-4 h-4 text-cb-orange" />
                <span className="text-cb-orange text-sm font-medium">Workshop Exclusivo</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.08] mb-4">
                Aprenda com quem{" "}
                <span className="text-gradient-orange">constrói todos os dias</span>
              </h1>

              <p className="text-base sm:text-lg text-cb-text-secondary mb-6 leading-relaxed">
                Caio Vicentino, co-fundador do Cultura Builder e criador da Yield Hackers, vai te guiar na construção do seu primeiro agente de IA em 90 minutos.
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
                <div className="bg-cb-surface border border-cb-border rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-black text-cb-orange">6.793+</p>
                  <p className="text-xs text-cb-text-muted mt-1">Alunos</p>
                </div>
                <div className="bg-cb-surface border border-cb-border rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-black text-cb-orange">100+</p>
                  <p className="text-xs text-cb-text-muted mt-1">Agentes</p>
                </div>
                <div className="bg-cb-surface border border-cb-border rounded-xl p-3 sm:p-4 text-center">
                  <p className="text-lg sm:text-2xl font-black text-cb-orange">50+</p>
                  <p className="text-xs text-cb-text-muted mt-1">Empresas</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-3 py-1.5 text-sm text-cb-text-secondary">
                  <Calendar className="w-3.5 h-3.5 text-cb-orange" />
                  28/02
                </div>
                <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-3 py-1.5 text-sm text-cb-text-secondary">
                  <Clock className="w-3.5 h-3.5 text-cb-orange" />
                  14h
                </div>
                <div className="flex items-center gap-2 bg-cb-surface border border-cb-border rounded-full px-3 py-1.5 text-sm text-cb-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-cb-orange" />
                  Online
                </div>
              </div>

              <div id="inscricao">
                <LeadCaptureForm variant="compact" buttonText="GARANTIR MINHA VAGA - R$167" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 sm:py-16 bg-cb-surface border-y border-cb-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-10 h-10 text-cb-orange/30 mx-auto mb-4" />
          <blockquote className="text-xl sm:text-2xl text-white font-medium italic leading-relaxed mb-4">
            &ldquo;A IA não vai substituir pessoas. Mas pessoas que usam IA vao substituir as que não usam. Meu trabalho e garantir que você esteja do lado certo.&rdquo;
          </blockquote>
          <p className="text-cb-orange font-semibold">&mdash; Caio Vicentino</p>
        </div>
      </section>

      {/* Bio completa */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="w-full rounded-2xl overflow-hidden border border-cb-border">
                <Image src="/images/expert/caio-4.png" alt="Caio Vicentino" width={400} height={500} className="w-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
                Sobre o Instrutor
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                Quem e <span className="text-gradient-orange">Caio Vicentino</span>
              </h2>
              <div className="space-y-4 text-cb-text-muted leading-relaxed text-lg">
                <p>Caio Vicentino não é um teórico. Como co-fundador do Cultura Builder — pioneiro em finanças descentralizadas e inteligência artificial — e criador da Yield Hackers, ele vive na fronteira da inovação.</p>
                <p>Com mais de 6.793 builders formados e parcerias com NVIDIA (Inception Program) e AWS, ele já ajudou profissionais e empreendedores a criar mais de 100 agentes de IA para diferentes aplicações &mdash; atendimento ao cliente, automação de processos, geração de conteúdo é muito mais.</p>
                <p className="text-cb-text-secondary font-medium">Ele vai te guiar com a didática de quem já ensinou milhares de pessoas e a experiência prática de quem usa agentes de IA para escalar seus próprios negócios.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                {["Co-fundador Cultura Builder", "Criador Yield Hackers", "6.793+ Alunos", "Especialista em IA No-Code"].map((tag) => (
                  <span key={tag} className="bg-cb-surface border border-cb-border text-cb-text-secondary text-sm px-4 py-2 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que você vai construir */}
      <section className="py-16 sm:py-20 bg-cb-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">O que você vai <span className="text-gradient-orange">construir</span></h2>
          <p className="text-cb-text-muted text-lg mb-10 max-w-2xl mx-auto">Em 90 minutos, guiado pelo Caio, você vai sair com:</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Agente Funcional", desc: "Um agente de IA real, no ar, funcionando e pronto para trabalhar por você." },
              { icon: Users, title: "Template Exclusivo", desc: "O template exato usado na aula para você replicar e criar novos agentes." },
              { icon: Award, title: "Conhecimento Prático", desc: "A habilidade de construir com IA sem depender de programadores." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-cb-surface-light border border-cb-border rounded-2xl p-6 text-center">
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

      <PartnersSection />      <StepsSection variant="timeline" />
      <TargetAudience variant="minimal" />
      <BonusGarantia variant="stacked" />

      <section className="py-16 sm:py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-12">Perguntas Frequentes</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Aprenda direto com quem <span className="text-gradient-orange">faz acontecer</span></h2>
          <p className="text-cb-text-muted text-lg mb-6">28 de Fevereiro. 14h. Online e ao vivo com Caio Vicentino.</p>
          <div className="mb-8">
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="compact" />
          </div>
          <LeadCaptureForm variant="compact" buttonText="QUERO APRENDER COM O CAIO - R$167" />
        </div>
      </section>

      <Footer />
    </>
  );
}
