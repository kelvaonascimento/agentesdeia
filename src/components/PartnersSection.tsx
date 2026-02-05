"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import AnimatedNumber from "./AnimatedNumber";

interface PartnersSectionProps {
  variant?: "default" | "compact";
}

function AWSLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 304 182" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6s14.2-7.8 24.5-7.8c3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.8.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z" />
      <path d="M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" fill="#FF9900" />
      <path d="M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z" fill="#FF9900" />
    </svg>
  );
}

export default function PartnersSection({ variant = "default" }: PartnersSectionProps) {
  if (variant === "compact") {
    return (
      <section className="py-8 sm:py-12 bg-cb-surface border-y border-cb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cb-text-muted text-xs uppercase tracking-widest text-center mb-6">
            Parceiros oficiais
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-16">
            <AWSLogo className="h-8 sm:h-10 w-auto text-white/70" />
            <Image src="/images/brand/nvidia-inception-badge.png" alt="NVIDIA Inception Program" width={200} height={80} className="h-10 sm:h-14 w-auto object-contain" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-cb-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
              Parcerias Estratégicas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Pioneiro em <span className="text-gradient-orange">finanças descentralizadas e IA</span>
            </h2>
            <p className="text-cb-text-muted mt-3 max-w-2xl mx-auto">
              O Cultura Builder é parceiro oficial da NVIDIA e AWS, conectando sua comunidade de <AnimatedNumber value="6.793+" className="text-white font-semibold" /> builders às maiores plataformas de tecnologia do mundo.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* AWS Card */}
          <ScrollReveal delay={100}>
            <div className="group relative bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden hover:border-[#FF9900]/30 transition-all duration-500">
              {/* Subtle animated background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#FF9900]/5 rounded-full blur-[80px]" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF9900]/20 to-transparent" />

              <div className="relative z-10 w-full">
                <span className="inline-block text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] border border-white/10 rounded-full px-4 py-1.5 mb-6">
                  Cloud + IA
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Infraestrutura sem custo
                </h3>
                <p className="text-[#FF9900] font-bold text-sm mb-8">
                  + R$ <AnimatedNumber value="25" className="text-[#FF9900]" />k em creditos AWS
                </p>

                <div className="flex justify-center mb-8">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 w-48 h-24 flex items-center justify-center backdrop-blur-sm group-hover:border-[#FF9900]/20 transition-all duration-500">
                    <AWSLogo className="w-28 h-auto text-white" />
                  </div>
                </div>

                <p className="text-white/40 text-sm leading-relaxed">
                  Construa e escale seus projetos com a infraestrutura em nuvem mais robusta do mundo, sem se preocupar com custos.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* NVIDIA Card */}
          <ScrollReveal delay={250}>
            <div className="group relative bg-gradient-to-b from-[#0f1a0a] to-[#0a0a0f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden hover:border-[#76B900]/30 transition-all duration-500">
              {/* Subtle animated background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#76B900]/5 rounded-full blur-[80px]" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#76B900]/20 to-transparent" />

              <div className="relative z-10 w-full">
                <span className="inline-block text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] border border-white/10 rounded-full px-4 py-1.5 mb-6">
                  GPU + Services
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Poder de processamento
                </h3>
                <p className="text-[#76B900] font-bold text-sm mb-8">
                  + R$ <AnimatedNumber value="255" className="text-[#76B900]" />k em recursos NVIDIA
                </p>

                <div className="flex justify-center mb-8">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 w-56 h-28 flex items-center justify-center backdrop-blur-sm group-hover:border-[#76B900]/20 transition-all duration-500">
                    <Image src="/images/brand/nvidia-inception-badge.png" alt="NVIDIA Inception Program" width={220} height={90} className="w-48 h-auto object-contain" />
                  </div>
                </div>

                <p className="text-white/40 text-sm leading-relaxed">
                  Acesso a GPUs, servicos e suporte tecnico para seus projetos de IA liderarem a inovacao.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
