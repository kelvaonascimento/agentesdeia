import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, MessageCircle, ArrowRight, Clock, Users } from "lucide-react";

export default function ThankYouPage() {
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
            Parabens, <span className="text-gradient-orange">Builder!</span>
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
              O grupo é o nosso canal direto com você. Por la, você recebera lembretes, materiais de preparacao é o link de acesso ao workshop.
            </p>
            <a
              href="https://chat.whatsapp.com/SEU_LINK_AQUI"
              target="_blank"
              rel="noopener noreferrer"
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
              <h3 className="text-white font-semibold text-sm mb-1">Data e Horario</h3>
              <p className="text-cb-text-muted text-sm">28/02 as 14h (Brasília)</p>
            </div>
            <div className="bg-cb-surface/50 border border-cb-border rounded-xl p-5">
              <MessageCircle className="w-6 h-6 text-cb-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm mb-1">Link de Acesso</h3>
              <p className="text-cb-text-muted text-sm">Enviado pelo grupo e e-mail 1h antes</p>
            </div>
            <div className="bg-cb-surface/50 border border-cb-border rounded-xl p-5">
              <Users className="w-6 h-6 text-cb-orange mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm mb-1">Preparacao</h3>
              <p className="text-cb-text-muted text-sm">PC + navegador Chrome + conta ChatGPT</p>
            </div>
          </div>

          <p className="text-cb-text-muted text-sm">
            Qualquer duvida, responda o e-mail de confirmacao. Estamos ansiosos para te ver la!
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
