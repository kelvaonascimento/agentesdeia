"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gtm } from "@/lib/gtm";

export default function HeaderNav() {
  const handleCtaClick = () => gtm.ctaClick("header", "Garantir Vaga");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-cb-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/lps" className="flex items-center gap-2">
          <Image
            src="/images/logo-cultura-builder.svg"
            alt="Cultura Builder"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          <span className="text-sm font-semibold text-cb-orange">ÚLTIMAS VAGAS - Workshop 28/02</span>
          <a
            href="#inscricao"
            onClick={handleCtaClick}
            className="rounded-full gradient-cta px-6 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105"
          >
            Garantir Vaga
          </a>
        </div>
      </div>
    </motion.header>
  );
}
