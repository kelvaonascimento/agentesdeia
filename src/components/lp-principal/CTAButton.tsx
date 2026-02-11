"use client";

import { gtm } from "@/lib/gtm";

export default function CTAButton() {
  const handleClick = () => gtm.ctaClick("cta_principal", "QUERO GARANTIR MINHA VAGA");

  return (
    <a
      href="#inscricao"
      onClick={handleClick}
      className="group inline-flex items-center gap-3 rounded-full gradient-cta px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">→</span>
      <span className="flex flex-col items-start leading-tight">
        <span>QUERO GARANTIR MINHA VAGA</span>
        <span className="text-xs font-normal opacity-80">POR R$167</span>
      </span>
    </a>
  );
}
