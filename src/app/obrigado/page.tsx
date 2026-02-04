"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, MessageCircle, ArrowRight, Clock, Users } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { gtm } from "@/lib/gtm";

const PURCHASE_SENT_KEY = "cb_purchase_tracked";

export default function ThankYouPage() {
  const searchParams = useSearchParams();

  // Tracking: purchase só quando há confirmação de pagamento (param na URL) ou uma vez por sessão
  useEffect(() => {
    if (typeof window === "undefined") return;

    const transactionId =
      searchParams.get("transaction_id") ||
      searchParams.get("order_id") ||
      searchParams.get("payment_id") ||
      searchParams.get("id") ||
      "unknown";

    // Se o Pagar.me enviar transaction_id na URL de sucesso, contamos só quando existir (evita acesso direto à página)
    const hasPaymentParam =
      searchParams.has("transaction_id") ||
      searchParams.has("order_id") ||
      searchParams.has("payment_id");

    const sessionKey = hasPaymentParam ? `${PURCHASE_SENT_KEY}_${transactionId}` : PURCHASE_SENT_KEY;
    if (sessionStorage.getItem(sessionKey)) return; // já disparou nesta sessão (evita refresh = múltiplas vendas)

    // Só dispara purchase se: veio com param de pagamento OU é a primeira vez nesta sessão (fallback para link sem param)
    if (hasPaymentParam || !sessionStorage.getItem(PURCHASE_SENT_KEY)) {
      gtm.purchase(transactionId);
      sessionStorage.setItem(sessionKey, "1");
      sessionStorage.setItem(PURCHASE_SENT_KEY, "1"); // evita outro disparo sem param na mesma sessão
    }
  }, [searchParams]);

  // Tracking: whatsapp_click ao clicar no botão
  const handleWhatsAppClick = () => {
    gtm.whatsappClick();
  };

  return (
    <>
      <Header />

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-background" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-cb-orange/5 rounded-full blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="w-20 h-20 mx-auto bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Parabéns, <span className="text-gradient-orange">Builder!</span>
          </h1>

          <p className="text-xl text-cb-text-secondary mb-2">
            Sua inscrição foi confirmada com sucesso.
          </p>
          <p className="text-cb-text-muted text-lg mb-12 max-w-xl mx-auto">
            Você acaba de dar o passo mais importante. Agora, falta apenas mais um: entrar no nosso grupo VIP.
          </p>

          <div className="bg-cb-surface border border-cb-orange/20 rounded-2xl p-8 sm:p-10 mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-green-500" />
              <h2 className="text-2xl font-bold text-white">Entre no Grupo VIP do WhatsApp</h2>
            </div>
            <p className="text-cb-text-muted mb-8 max-w-md mx-auto">
              O grupo é o nosso canal direto com você. Por lá, você receberá lembretes, materiais de preparação e o link de acesso ao workshop.
            </p>
            <a
              href="https://chat.whatsapp.com/Dm7j5XHA83v3bwEqiH6vv8"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all animate-glow-pulse"
              style={{ "--cb-orange-glow": "rgba(34, 197, 94, 0.4)" } as React.CSSProperties}
            >
              <MessageCircle className="w-6 h-6" />
              ENTRAR NO GRUPO VIP DO WHATSAPP
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-cb-surface/50 border border-cb-border rounded-xl p-5">
              <Clock className="w-6 h-6 text-cb-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm mb-1">Data e Horário</h3>
              <p className="text-cb-text-muted text-sm">28/02 às 14h (Brasília)</p>
            </div>
            <div className="bg-cb-surface/50 border border-cb-border rounded-xl p-5">
              <MessageCircle className="w-6 h-6 text-cb-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm mb-1">Link de Acesso</h3>
              <p className="text-cb-text-muted text-sm">Enviado pelo grupo e e-mail 1h antes</p>
            </div>
            <div className="bg-cb-surface/50 border border-cb-border rounded-xl p-5">
              <Users className="w-6 h-6 text-cb-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm mb-1">Preparação</h3>
              <p className="text-cb-text-muted text-sm">PC + navegador Chrome + conta ChatGPT</p>
            </div>
          </div>

          <p className="text-cb-text-muted text-sm">
            Qualquer dúvida, responda o e-mail de confirmação. Estamos ansiosos para te ver lá!
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
