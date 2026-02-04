"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import { ArrowRight } from "lucide-react";
import { gtm } from "@/lib/gtm";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tracking: sticky_bar_click
  const handleClick = () => {
    gtm.stickyBarClick();
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-black/90 backdrop-blur-xl border-b border-cb-orange/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 py-2.5 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          <div className="hidden sm:flex items-center gap-3 min-w-0 shrink">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cb-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cb-orange" />
            </span>
            <span className="text-white text-sm font-bold truncate">
              <span className="text-cb-orange">ÚLTIMAS VAGAS</span> - Workshop 28/02
            </span>
          </div>
          <div className="hidden md:block shrink-0">
            <CountdownTimer targetDate="2026-02-28T14:00:00-03:00" variant="inline" />
          </div>
          <a
            href="#inscricao"
            onClick={handleClick}
            className="flex items-center justify-center gap-2 bg-gradient-orange text-white font-bold text-xs sm:text-sm px-3 py-2.5 sm:px-5 sm:py-2 min-h-[44px] rounded-lg hover:brightness-110 transition-all shrink-0"
          >
            Garantir Vaga - R$167
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
