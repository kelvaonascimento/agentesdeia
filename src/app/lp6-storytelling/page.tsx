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
import { Quote, CheckCircle, X } from "lucide-react";

export default function LP6Storytelling() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* HERO - Story Opening */}
      <section className="bg-hero-gradient relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cb-orange/5 rounded-full blur-[120px] animate-orb-1" /><div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cb-orange/3 rounded-full blur-[100px] animate-orb-2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-cb-orange text-sm font-semibold uppercase tracking-widest mb-6 block">Uma historia real</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.12] mb-6">
                &ldquo;Eu passava 3 horas por dia respondendo as mesmas perguntas. Ate que criei um agente de IA em{" "}
                <span className="text-gradient-orange">90 minutos.</span>&rdquo;
              </h1>
              <p className="text-lg text-cb-text-muted mb-6 leading-relaxed">
                Essa e a historia do Rafael. Empreendedor, sobrecarregado, e cansado de ouvir que IA era &ldquo;so para quem sabe programar.&rdquo; Ele estava errado. E voce tambem pode estar.
              </p>
              <p className="text-cb-text-secondary mb-8 leading-relaxed">
                No dia 28 de Fevereiro, voce tem a chance de viver a mesma transformacao. Em um workshop ao vivo de 90 minutos, sem codigo, com template pronto.
              </p>
              <div id="inscricao">
                <LeadCaptureForm variant="compact" buttonText="QUERO VIVER ESSA TRANSFORMACAO - R$167" />
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl overflow-hidden border border-cb-orange/20">
                <Image src="/images/expert/caio-1.png" alt="Caio Vicentino" width={500} height={600} className="w-full object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert strip */}
      <section className="py-5 bg-cb-surface border-y border-cb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cb-orange relative">
              <Image src="/images/expert/caio-5.png" alt="Caio" fill className="object-cover" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Com Caio Vicentino</p>
              <p className="text-cb-text-muted text-xs">Co-fundador Cultura Builder &middot; Yield Hackers</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-cb-border" />
          <div className="flex items-center gap-6 text-sm text-cb-text-muted">
            <span><strong className="text-white">6.793+</strong> Builders</span>
            <span><strong className="text-white">28/02</strong> 14h</span>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4">A Jornada: <span className="text-gradient-orange">De Espectador a Builder</span></h2>
          <p className="text-cb-text-muted text-center mb-12 max-w-2xl mx-auto">Voce ja consumiu horas de conteudo sobre IA. Chegou a hora de parar de assistir e comecar a construir.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-cb-surface border border-cb-border rounded-2xl p-8">
              <h3 className="text-red-400 font-bold text-lg mb-6 flex items-center gap-2"><X className="w-5 h-5" />O Espectador</h3>
              <ul className="space-y-4">
                {["Consome conteudo mas nunca aplica", "Acha que IA e so para programadores", "Perde horas em tarefas repetitivas", "Sente que esta ficando para tras", "Tem medo de dar o primeiro passo"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-cb-text-muted"><span className="text-red-400 font-bold mt-0.5">&mdash;</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-cb-surface border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-green-400 font-bold text-lg mb-6 flex items-center gap-2"><CheckCircle className="w-5 h-5" />O Builder</h3>
              <ul className="space-y-4">
                {["Cria agentes de IA funcionais", "Nao precisa de uma linha de codigo", "Automatiza tarefas e ganha tempo", "Esta na vanguarda da tecnologia", "Tem um template para criar mais agentes"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-cb-text-muted"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 sm:py-16 bg-cb-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-10 h-10 text-cb-orange/30 mx-auto mb-4" />
          <blockquote className="text-xl sm:text-2xl text-white font-medium italic leading-relaxed mb-4">
            &ldquo;O Rafael criou um agente que responde clientes automaticamente. Hoje ele economiza 3 horas por dia. E tudo comecou em 90 minutos.&rdquo;
          </blockquote>
          <p className="text-cb-text-muted">&mdash; Caso real de aluno do workshop</p>
        </div>
      </section>

      {/* 3 momentos */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">Sua jornada em <span className="text-gradient-orange">3 momentos</span></h2>
          <div className="space-y-8">
            {[
              { label: "Momento 1", title: "A Decisao", desc: "Voce decide parar de ser espectador. Se inscreve no workshop e se compromete com a mudanca." },
              { label: "Momento 2", title: "A Construcao", desc: "Em 90 minutos ao vivo, voce configura, conecta e lanca seu primeiro agente de IA. Sem codigo." },
              { label: "Momento 3", title: "A Transformacao", desc: "Voce sai com um agente funcional, um template e a habilidade de criar mais. Voce agora e um Builder." },
            ].map((moment, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-cb-orange/10 border border-cb-orange/30 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-cb-orange font-black">{i + 1}</span>
                  </div>
                  {i < 2 && <div className="w-px h-full bg-cb-border mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-cb-orange text-xs font-semibold uppercase tracking-widest">{moment.label}</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">{moment.title}</h3>
                  <p className="text-cb-text-muted leading-relaxed">{moment.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />      <ExpertSection imageIndex={2} />
      <StepsSection variant="timeline" />
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
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Toda grande historia comeca com{" "}<span className="text-gradient-orange">um primeiro passo.</span></h2>
          <p className="text-cb-text-muted text-lg mb-8 max-w-2xl mx-auto">O seu comeca dia 28 de Fevereiro. 14h. Online e ao vivo.</p>
          <div className="mb-8"><CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="compact" /></div>
          <LeadCaptureForm variant="compact" buttonText="COMECAR MINHA HISTORIA - R$167" />
        </div>
      </section>

      <Footer />
    </>
  );
}
