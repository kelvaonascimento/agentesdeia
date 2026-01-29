"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { ArrowRight } from "lucide-react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-black/90 backdrop-blur-xl border-b border-cb-orange/20">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cb-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cb-orange" />
            </span>
            <span className="text-white text-sm font-bold">
              <span className="text-cb-orange">ÚLTIMAS VAGAS</span> - Workshop 28/02
            </span>
          </div>
          <div className="hidden md:block">
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="inline" />
          </div>
          <a
            href="#inscricao"
            className="flex items-center gap-2 bg-gradient-orange text-white font-bold text-sm px-5 py-2 rounded-lg hover:brightness-110 transition-all whitespace-nowrap"
          >
            Garantir Vaga - R$167
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
