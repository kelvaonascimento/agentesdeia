"use client";

import { useState, useRef } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { gtm } from "@/lib/gtm";

// URL do checkout Pagar.me
const CHECKOUT_URL = "https://payment-link-v3.pagar.me/pl_roLp6MW3jl0YomOTw8tPxD2zbgEA4wxN";

interface LeadCaptureFormProps {
  variant?: "default" | "compact" | "inline";
  buttonText?: string;
  className?: string;
}

export default function LeadCaptureForm({
  variant = "default",
  buttonText = "GARANTIR MINHA VAGA - R$167",
  className = "",
}: LeadCaptureFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const formStarted = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Tracking: form_submit
    gtm.formSubmit("inscricao", window.location.pathname);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Tracking: form_error
        gtm.formError(data.error || "Erro ao processar inscrição", "submit");
        throw new Error(data.error || "Erro ao processar inscrição");
      }

      // Tracking: checkout_initiated (antes de redirecionar)
      gtm.checkoutInitiated();

      // Sucesso - redirecionar para checkout do Pagar.me
      window.location.href = CHECKOUT_URL;
    } catch (err) {
      console.error("Erro no formulário:", err);
      setError("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Tracking: form_start (apenas uma vez)
    if (!formStarted.current) {
      formStarted.current = true;
      gtm.formStart("inscricao", variant);
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const btnClass =
    "w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-white font-bold px-4 py-4 sm:px-6 rounded-xl transition-all disabled:opacity-70 btn-glow text-sm sm:text-base min-h-[48px] text-center break-words";

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <input
          type="email"
          name="email"
          required
          placeholder="Seu melhor e-mail"
          value={formData.email}
          onChange={handleChange}
          className="flex-1 bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
        />
        <button type="submit" disabled={loading} className={btnClass}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {buttonText}
        </button>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-4 sm:space-y-3 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Seu melhor e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
          />
        </div>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Seu WhatsApp (com DDD)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
        />
        <button type="submit" disabled={loading} className={btnClass}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          {buttonText}
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`max-w-md mx-auto space-y-4 ${className}`}>
      <input
        type="text"
        name="name"
        required
        placeholder="Seu nome completo"
        value={formData.name}
        onChange={handleChange}
        className="w-full bg-cb-surface border border-cb-border rounded-xl px-5 py-4 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Seu melhor e-mail"
        value={formData.email}
        onChange={handleChange}
        className="w-full bg-cb-surface border border-cb-border rounded-xl px-5 py-4 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
      />
      <input
        type="tel"
        name="phone"
        required
        placeholder="Seu WhatsApp (com DDD)"
        value={formData.phone}
        onChange={handleChange}
        className="w-full bg-cb-surface border border-cb-border rounded-xl px-5 py-4 text-white placeholder:text-cb-text-muted text-base sm:text-sm focus:outline-none focus:border-cb-orange focus:shadow-[0_0_15px_rgba(232,89,12,0.15)] transition-all"
      />
      <button type="submit" disabled={loading} className={`${btnClass} !py-5 !text-base sm:!text-lg`}>
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
        {buttonText}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <p className="text-cb-text-muted text-xs text-center">Seus dados estão seguros. Não enviamos spam.</p>
    </form>
  );
}
