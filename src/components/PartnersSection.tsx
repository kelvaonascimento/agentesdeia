import Image from "next/image";

interface PartnersSectionProps {
  variant?: "default" | "compact";
}

export default function PartnersSection({ variant = "default" }: PartnersSectionProps) {
  if (variant === "compact") {
    return (
      <section className="py-8 sm:py-12 bg-cb-surface border-y border-cb-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cb-text-muted text-xs uppercase tracking-widest text-center mb-6">
            Parceiros oficiais
          </p>
          <div className="flex items-center justify-center">
            <Image src="/images/partners-nvidia-aws.png" alt="NVIDIA Inception Program e AWS" width={400} height={80} className="h-12 sm:h-14 w-auto object-contain" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-cb-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
            Parcerias Estrategicas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Pioneiro em <span className="text-gradient-orange">financas descentralizadas e IA</span>
          </h2>
          <p className="text-cb-text-muted mt-3 max-w-2xl mx-auto">
            O Cultura Builder e parceiro oficial da NVIDIA e AWS, conectando sua comunidade de 6.793+ builders as maiores plataformas de tecnologia do mundo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* AWS Card - Dark */}
          <div className="bg-gradient-to-b from-cb-surface-light to-black border border-cb-border rounded-2xl p-8 flex flex-col items-center text-center hover:border-cb-orange/30 transition-all group">
            <span className="inline-block text-cb-text-muted text-[10px] font-semibold uppercase tracking-[0.2em] border border-cb-border rounded-full px-3 py-1 mb-5">Cloud + IA</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Infraestrutura sem custo</h3>
            <p className="text-cb-orange font-bold text-sm mb-6">+ R$ 25k em creditos AWS</p>
            <div className="bg-white rounded-xl p-4 mb-6 group-hover:shadow-[0_0_30px_rgba(255,153,0,0.15)] transition-all">
              <Image src="/images/partners-nvidia-aws.png" alt="AWS" width={160} height={60} className="h-12 w-auto object-contain object-right" style={{ objectPosition: "right center", clipPath: "inset(0 0 0 55%)" }} />
            </div>
            <p className="text-cb-text-muted text-sm leading-relaxed">
              Construa e escale seus projetos com a infraestrutura em nuvem mais robusta do mundo, sem se preocupar com custos.
            </p>
          </div>

          {/* NVIDIA Card - Green */}
          <div className="bg-gradient-to-b from-[#76B900]/20 to-[#76B900]/5 border border-[#76B900]/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#76B900]/50 transition-all group">
            <span className="inline-block text-white/70 text-[10px] font-semibold uppercase tracking-[0.2em] border border-white/20 rounded-full px-3 py-1 mb-5">Hardware + Services</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Poder de processamento</h3>
            <p className="text-cb-orange font-bold text-sm mb-6">+ R$ 255k em recursos NVIDIA</p>
            <div className="bg-black/60 rounded-xl p-4 mb-6 border border-white/10 transform group-hover:scale-105 transition-all group-hover:shadow-[0_0_30px_rgba(118,185,0,0.2)]" style={{ transform: "perspective(400px) rotateY(-5deg)" }}>
              <Image src="/images/partners-nvidia-aws.png" alt="NVIDIA Inception Program" width={160} height={60} className="h-12 w-auto object-contain object-left" style={{ objectPosition: "left center", clipPath: "inset(0 50% 0 0)" }} />
            </div>
            <p className="text-cb-text-muted text-sm leading-relaxed">
              Acesso a GPUs, servicos e suporte tecnico para seus projetos de IA liderarem a inovacao.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
