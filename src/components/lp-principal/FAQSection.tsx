"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gtm } from "@/lib/gtm";

const faqItems = [
  { q: "Preciso saber programar?", a: "Não! Você só precisa saber o que quer. A IA escreve o código por você. O workshop é 100% no-code — se você sabe seguir uma receita de bolo, você pode construir um agente de IA. Usamos ferramentas visuais e interfaces intuitivas do início ao fim." },
  { q: "E se eu não puder assistir ao vivo?", a: "Você receberá acesso à gravação completa do workshop. Porém, recomendamos fortemente a participação ao vivo para tirar dúvidas em tempo real com o Caio e ter a melhor experiência de aprendizado." },
  { q: "Quais ferramentas vamos usar? São pagas?", a: "Você pode começar com ferramentas gratuitas e os créditos que o Cultura Builder oferece. Vamos usar plataformas como ChatGPT/Claude e ferramentas de automação com planos gratuitos. Você não precisará investir nada além do valor do workshop para começar." },
  { q: "Vou receber certificado?", a: "Sim! Todos os participantes que concluírem o workshop receberão um certificado digital de participação do Cultura Builder." },
  { q: "Como acesso o workshop no dia?", a: "Após a compra, você será adicionado ao nosso grupo VIP no WhatsApp. O link de acesso à sala ao vivo será enviado por e-mail e pelo grupo 1 hora antes do evento." },
  { q: "Por que este workshop é pago?", a: "Porque valorizamos quem investe em si mesmo. O investimento garante um grupo seleto de participantes comprometidos, atendimento personalizado ao vivo, template exclusivo Plug-and-Play e acesso à gravação. Além disso, oferecemos garantia de 7 dias: se você sentir que não entregamos a transformação prometida, devolvemos 100% do valor." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <span className="section-badge">❓ Dúvidas frequentes</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-cb-border bg-cb-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => {
                  const isOpening = openIndex !== i;
                  setOpenIndex(openIndex === i ? null : i);
                  gtm.faqClick(item.q, isOpening ? "open" : "close");
                }}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="text-sm font-bold gradient-text">{String(i + 1).padStart(2, "0")}/</span>
                  <span className="text-sm font-medium text-white">{item.q}</span>
                </span>
                <span
                  className="ml-4 shrink-0 text-xl text-cb-text-muted transition-transform duration-200"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0)" }}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-cb-border px-5 py-4">
                      <p className="text-sm text-cb-text-muted leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
