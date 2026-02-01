"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Check, Users, BookOpen, Github, Zap, Network, Lightbulb } from "lucide-react";

const mentors = [
  {
    name: "Ariel Alexandre",
    bio: "Empreendedor autodidata com +20 anos de experiência. Múltiplos exits e negócios premiados em tecnologia pela Samsung e Wired. Criador do Videolog (antes do YouTube). Atualmente CEO do Gotas, plataforma inovadora em blockchain. Através de seus empreendimentos já atendeu gigantes globais como Microsoft, Nestlé, L'Oréal e outras marcas de renome mundial.",
  },
  {
    name: "Bruno Pessoa",
    bio: "Country Manager do Brasil na Chiliz/Socios.com, liderando soluções blockchain para engajamento de fãs no esporte. Com mais de 10 anos de experiência em tecnologia esportiva, gerencia parcerias com 70+ organizações esportivas globais.",
  },
  {
    name: "Caio Vicentino",
    bio: "Criador de conteúdo especializado em DeFi, pool de liquidez e inovação. Sócio do gotas.com e do DeFi Station. Caio Vicentino se destaca pela inovação na sua comunidade.",
  },
  {
    name: "Deco Montenegro",
    bio: "Sócio-fundador da Reset Funds, é empreendedor serial, tendo criado Omneek (IA), Liqi (tokens), Safeway (pagamentos) e MontenegroUrbanismo (cidades inteligentes). Especialista em web3.0, blockchain, DeFi, NFTs e token-economia.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Aulas Exclusivas",
    desc: "Aulas para te ajudar em toda a parte inicial para o seu entendimento de ferramentas e features necessárias para que você se torne uma pessoa que entenda sobre inteligência artificial.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    desc: "Participe dos fóruns, tire suas dúvidas e compartilhe conosco o nosso conhecimento.",
  },
  {
    icon: Github,
    title: "Estratégias Avançadas",
    desc: "Projetos já prontos com acesso ao GitHub com projetos criados e disponibilizados pela própria comunidade.",
  },
  {
    icon: Zap,
    title: "Aceleração de Resultados",
    desc: "Abandone o Excel, comece a construir os seus relatórios de forma independente, muito rápida e ágil através de IA.",
  },
  {
    icon: Network,
    title: "Networking Estratégico",
    desc: "Use IA para identificar e conectar-se com as pessoas certas em sua área.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Contínua",
    desc: "Utilize as ferramentas dedicadas para a comunidade, para facilitar a implementação dos seus produtos digitais.",
  },
];

const faqs = [
  {
    q: "Como funciona o programa de aceleração?",
    a: "O programa combina aulas práticas, mentorias ao vivo e projetos reais. Você terá acesso a uma plataforma completa de aprendizado e poderá desenvolver suas habilidades no seu próprio ritmo.",
  },
  {
    q: "Preciso ter conhecimento prévio?",
    a: "Não é necessário conhecimento prévio em programação. O curso foi estruturado para levar você do básico ao avançado, com uma metodologia passo a passo.",
  },
  {
    q: "Quanto tempo tenho acesso ao conteúdo?",
    a: "Por 1 ano, podendo ser renovado conforme sua necessidade diretamente pela plataforma.",
  },
  {
    q: "Como funciona o Hackathon com premiação?",
    a: "O Hackathon acontece ao final do programa, onde você poderá aplicar todo o conhecimento adquirido em um projeto real. O melhor projeto será premiado com R$20.000 em investimento inicial.",
  },
  {
    q: "Tenho suporte durante o curso?",
    a: "Sim! Você terá acesso a uma comunidade exclusiva onde poderá tirar dúvidas, interagir com outros alunos e receber mentoria dos instrutores.",
  },
];

const includedFeatures = [
  "Fórum de Discussão",
  "Github exclusivo",
  "Aulas completas",
  "Lives exclusivas",
];

const modules = [
  "Iniciando um app profissional",
  "Evolução do APP (intermediário)",
  "Avançado",
  "Transformando em negócio",
  "Criando bots de trading",
  "O seu primeiro APP",
];

export default function PreviewHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cb-orange/5 rounded-full blur-[150px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-cb-orange/10 border border-cb-orange/20 rounded-full px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cb-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cb-orange"></span>
            </span>
            <span className="text-cb-orange text-sm font-medium">INSCRIÇÕES ABERTAS</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-4xl font-black text-white">+ 2 MIL</span>
            <span className="text-cb-text-muted">builders na comunidade</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Domine a <span className="text-gradient-orange">IA</span> e eleve seu padrão de vida,{" "}
            <span className="text-cb-text-muted">não precisa ser desenvolvedor para isso.</span>
          </h1>

          <a
            href="https://hub.culturabuilder.com/"
            className="inline-flex items-center gap-2 bg-gradient-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
          >
            Participe
          </a>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 bg-cb-surface border-y border-cb-border overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-8 text-2xl font-black">
              <span className="text-white">CULTURA</span>{" "}
              <span className="text-cb-orange">BUILDER</span>
            </span>
          ))}
        </div>
      </div>

      {/* Seja Builder */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            SEJA <span className="text-gradient-orange">BUILDER</span>
          </h2>
          <p className="text-cb-text-secondary text-lg max-w-3xl mx-auto mb-4">
            Quem adota a <strong className="text-white">cultura builder</strong> se destaca e aumenta{" "}
            <span className="text-cb-orange font-bold">10x</span> a sua produtividade.
          </p>
          <p className="text-cb-text-muted">
            Não é necessário ser desenvolvedor para participar.
          </p>
        </div>
      </section>

      {/* Mentores */}
      <section className="py-20 bg-cb-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Nossos <span className="text-gradient-orange">Mentores</span>
            </h2>
            <p className="text-cb-text-secondary">
              Conheça quem vai acelerar sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mentors.map((mentor, i) => (
              <div
                key={i}
                className="bg-background border border-cb-border rounded-2xl p-6 hover:border-cb-orange/40 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-orange flex items-center justify-center text-white font-bold text-xl">
                    {mentor.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
                </div>
                <p className="text-cb-text-muted text-sm leading-relaxed">{mentor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Transforme Sua Carreira com <span className="text-gradient-orange">IA</span>
            </h2>
            <p className="text-cb-text-secondary">
              Descubra as ferramentas e estratégias que estão revolucionando o mercado de trabalho
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-cb-surface border border-cb-border rounded-2xl p-6 hover:border-cb-orange/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-cb-orange/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cb-orange" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-cb-text-muted text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-cb-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Invista no Seu Futuro com <span className="text-gradient-orange">IA</span>
            </h2>
            <p className="text-cb-text-secondary">
              Não dê espaço para os seus concorrentes.
            </p>
          </div>

          <div className="bg-background border-2 border-cb-orange rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cb-orange text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              MAIS POPULAR
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Premium Completo</h3>
            <p className="text-cb-text-muted text-sm mb-6">
              Acesso completo por 1 ano com lives exclusivas +{" "}
              <strong className="text-cb-orange">INCLUSO: Mais de $5.000 dólares em créditos nas principais ferramentas de IA do mundo</strong>
            </p>

            <div className="mb-6">
              <span className="text-cb-text-muted text-sm">R$ 249,83/mês</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">R$ 2.998,00</span>
                <span className="text-cb-text-muted">por ano</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href="https://hub.culturabuilder.com/"
                className="flex-1 text-center bg-cb-surface border border-cb-border text-white font-bold py-3 px-6 rounded-full hover:border-cb-orange/40 transition-colors"
              >
                Assistir aula grátis
              </a>
              <a
                href="https://hub.culturabuilder.com/"
                className="flex-1 text-center bg-gradient-orange text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity"
              >
                Assinar agora
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-white mb-3">Recursos Inclusos:</h4>
                <ul className="space-y-2">
                  {includedFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-cb-text-muted text-sm">
                      <Check className="w-4 h-4 text-cb-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-3">Módulos Disponíveis:</h4>
                <ul className="space-y-2">
                  {modules.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 text-cb-text-muted text-sm">
                      <Check className="w-4 h-4 text-cb-orange" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Perguntas <span className="text-gradient-orange">frequentes</span>
            </h2>
            <p className="text-cb-text-muted text-sm">
              Não encontrou a resposta que procura?{" "}
              <a href="https://api.whatsapp.com/send?phone=5511978826684" className="text-cb-orange hover:underline">
                Entre em contato com nossa equipe
              </a>
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-cb-surface border border-cb-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cb-orange transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-cb-text-muted text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-cb-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Pronto para dar o <span className="text-gradient-orange">próximo passo</span>?
          </h2>
          <a
            href="https://hub.culturabuilder.com/"
            className="inline-flex items-center gap-2 bg-gradient-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity"
          >
            Acesse agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-cb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-orange rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" fill="white" />
                <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" fill="#E8590C" />
              </svg>
            </div>
            <span className="font-bold">
              CULTURA <span className="text-cb-orange">BUILDER</span>
            </span>
          </div>
          <p className="text-cb-text-muted text-sm">
            Cultura Builder &copy; {new Date().getFullYear()} | Hub de Inteligência Artificial
          </p>
        </div>
      </footer>
    </main>
  );
}
