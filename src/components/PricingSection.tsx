import { ArrowRight, ShieldCheck, Lock } from "lucide-react";

interface PricingSectionProps {
  checkoutUrl?: string;
  headline?: string;
  highlightText?: string;
}

export default function PricingSection({
  checkoutUrl = "#checkout",
  headline = "GARANTA SUA VAGA NO WORKSHOP E APRENDA NA PRÁTICA",
  highlightText = "COMO CRIAR SEU PRIMEIRO AGENTE DE IA!",
}: PricingSectionProps) {
  return (
    <section id="inscricao" className="py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
          {headline}{" "}
          <span className="text-gradient-orange italic">
            {highlightText}
          </span>
        </h2>

        <div className="mt-10 bg-cb-surface border border-cb-border rounded-2xl p-8 sm:p-12 max-w-lg mx-auto">
          <div className="space-y-4">
            <div className="text-4xl sm:text-5xl font-black text-gradient-orange">
              12X DE R$13,92
            </div>

            <p className="text-white/60 text-lg sm:text-xl tracking-wide">
              OU R$167,00 À VISTA
            </p>
          </div>

          <a
            href={checkoutUrl}
            className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-white font-bold text-base sm:text-lg px-8 py-4 sm:py-5 rounded-xl hover:brightness-110 transition-all btn-glow"
          >
            QUERO MINHA VAGA
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>Pague com Segurança</span>
            </div>
            {["Visa", "Mastercard", "Amex", "Elo", "Boleto", "PayPal", "Pix"].map((method) => (
              <span
                key={method}
                className="text-white/40 text-[10px] font-bold uppercase tracking-wider border border-white/10 rounded px-2 py-1"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-white/50 text-sm">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Pagamento 100% seguro &middot; Garantia de 7 dias
          </div>
        </div>
      </div>
    </section>
  );
}
