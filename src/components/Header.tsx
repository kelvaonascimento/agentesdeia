"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Image
          src="/images/logo-cultura-builder.svg"
          alt="Cultura Builder"
          width={160}
          height={53}
          className="h-7 sm:h-8 w-auto"
          priority
        />
        <a
          href="#inscricao"
          className="hidden sm:inline-flex items-center gap-2 bg-gradient-orange text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:brightness-110 transition-all"
        >
          Garantir Vaga
        </a>
      </div>
    </header>
  );
}
