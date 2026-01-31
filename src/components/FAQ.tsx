"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Preciso saber programar?",
    answer:
      "Não! Você só precisa saber o que quer. A IA escreve o código por você. O workshop é 100% no-code — se você sabe seguir uma receita de bolo, você pode construir um agente de IA. Usamos ferramentas visuais e interfaces intuitivas do início ao fim.",
  },
  {
    question: "E se eu não puder assistir ao vivo?",
    answer:
      "Você receberá acesso à gravação completa do workshop. Porém, recomendamos fortemente a participação ao vivo para tirar dúvidas em tempo real com o Caio e ter a melhor experiência de aprendizado.",
  },
  {
    question: "Quais ferramentas vamos usar? São pagas?",
    answer:
      "Você pode começar com ferramentas gratuitas e os créditos que o Cultura Builder oferece. Vamos usar plataformas como ChatGPT/Claude e ferramentas de automação com planos gratuitos. Você não precisará investir nada além do valor do workshop para começar.",
  },
  {
    question: "Vou receber certificado?",
    answer:
      "Sim! Todos os participantes que concluírem o workshop receberão um certificado digital de participação do Cultura Builder.",
  },
  {
    question: "Como acesso o workshop no dia?",
    answer:
      "Após a compra, você será adicionado ao nosso grupo VIP no WhatsApp. O link de acesso à sala ao vivo será enviado por e-mail e pelo grupo 1 hora antes do evento.",
  },
  {
    question: "Por que este workshop é pago?",
    answer:
      "Porque valorizamos quem investe em si mesmo. O investimento garante um grupo seleto de participantes comprometidos, atendimento personalizado ao vivo, template exclusivo Plug-and-Play e acesso à gravação. Além disso, oferecemos garantia de 7 dias: se você sentir que não entregamos a transformação prometida, devolvemos 100% do valor.",
  },
];

interface FAQProps {
  variant?: "default" | "compact" | "cards";
}

export default function FAQ({ variant = "default" }: FAQProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (variant === "cards") {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {faqData.map((item, index) => {
          const isOpen = openIndexes.has(index);
          return (
            <div
              key={index}
              className="bg-cb-surface border border-cb-border rounded-xl p-4 sm:p-6 hover:border-cb-orange/30 transition-all cursor-pointer"
              onClick={() => toggleIndex(index)}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-cb-orange shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-3" : "max-h-0"}`}>
                <p className="text-cb-text-muted text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqData.map((item, index) => {
        const isOpen = openIndexes.has(index);
        return (
          <div
            key={index}
            className={`border rounded-xl overflow-hidden transition-all duration-300 ${
              isOpen ? "border-cb-orange/50 bg-cb-surface" : "border-cb-border bg-cb-surface/50"
            }`}
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-cb-surface-light/50 transition-colors"
            >
              <span className="font-semibold text-white pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-cb-orange shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}>
              <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-cb-text-muted leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
