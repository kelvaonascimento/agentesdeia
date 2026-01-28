"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission (replace with real endpoint)
    await new Promise((resolve) => setTimeout(resolve, 800));

    router.push("/obrigado");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
          className="flex-1 bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-sm focus:outline-none focus:border-cb-orange transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-gradient-orange text-white font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all animate-glow-pulse disabled:opacity-70 whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {buttonText}
        </button>
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-sm focus:outline-none focus:border-cb-orange transition-colors"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Seu melhor e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-sm focus:outline-none focus:border-cb-orange transition-colors"
          />
        </div>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Seu WhatsApp (com DDD)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-cb-surface border border-cb-border rounded-xl px-4 py-3 text-white placeholder:text-cb-text-muted text-sm focus:outline-none focus:border-cb-orange transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-white font-bold text-base px-8 py-4 rounded-xl hover:brightness-110 transition-all animate-glow-pulse disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          {buttonText}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`max-w-md mx-auto space-y-4 ${className}`}>
      <div>
        <input
          type="text"
          name="name"
          required
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-cb-surface border border-cb-border rounded-xl px-5 py-4 text-white placeholder:text-cb-text-muted focus:outline-none focus:border-cb-orange transition-colors"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          required
          placeholder="Seu melhor e-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-cb-surface border border-cb-border rounded-xl px-5 py-4 text-white placeholder:text-cb-text-muted focus:outline-none focus:border-cb-orange transition-colors"
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Seu WhatsApp (com DDD)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-cb-surface border border-cb-border rounded-xl px-5 py-4 text-white placeholder:text-cb-text-muted focus:outline-none focus:border-cb-orange transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-white font-bold text-lg px-10 py-5 rounded-xl hover:brightness-110 transition-all animate-glow-pulse disabled:opacity-70"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
        {buttonText}
      </button>
      <p className="text-cb-text-muted text-xs text-center">Seus dados estao seguros. Nao enviamos spam.</p>
    </form>
  );
}
