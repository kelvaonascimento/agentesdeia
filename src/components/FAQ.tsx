"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Preciso saber programar?",
    answer:
      "Nao! O workshop foi desenhado para pessoas sem conhecimento técnico. Usamos ferramentas visuais e no-code. Você vai aprender a construir seu agente de IA usando interfaces intuitivas, sem escrever uma única linha de código.",
  },
  {
    question: "E se eu não puder assistir ao vivo?",
    answer:
      "Você recebera acesso a gravação completa do workshop por 7 dias. Porem, recomendamos fortemente a participação ao vivo para tirar dúvidas em tempo real e ter a melhor experiência de aprendizado.",
  },
  {
    question: "Quais ferramentas vamos usar? Sao pagas?",
    answer:
      "Vamos usar ferramentas com planos gratuitos ou com créditos iniciais, como ChatGPT e plataformas de automação. Você não precisara investir nada além do valor do workshop para começar.",
  },
  {
    question: "Vou receber certificado?",
    answer:
      "Sim! Todos os participantes que concluirem o workshop receberao um certificado digital de participação do Cultura Builder.",
  },
  {
    question: "Como acesso o workshop no dia?",
    answer:
      "Apos a inscrição, você sera adicionado ao nosso grupo VIP no WhatsApp. O link de acesso a sala ao vivo sera enviado por e-mail e pelo grupo 1 hora antes do evento.",
  },
  {
    question: "Por que este workshop e pago?",
    answer:
      "Porque valorizamos quem investe em si mesmo. O valor de R$167 garante um grupo seleto de participantes comprometidos, atendimento personalizado ao vivo, template exclusivo e acesso a gravação. Além disso, oferecemos garantia de 7 dias: se não gostar, devolvemos 100% do valor.",
  },
];

interface FAQProps {
  variant?: "default" | "compact" | "cards";
}

export default function FAQ({ variant = "default" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (variant === "cards") {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-cb-surface border border-cb-border rounded-xl p-4 sm:p-6 hover:border-cb-orange/30 transition-all cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{item.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-cb-orange shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 mt-3" : "max-h-0"}`}>
              <p className="text-cb-text-muted text-sm leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${
            openIndex === index ? "border-cb-orange/50 bg-cb-surface" : "border-cb-border bg-cb-surface/50"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-cb-surface-light/50 transition-colors"
          >
            <span className="font-semibold text-white pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-cb-orange shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-60" : "max-h-0"}`}>
            <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-cb-text-muted leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
