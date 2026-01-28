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
          <div className="flex items-center justify-center gap-8 sm:gap-16">
            <Image src="/images/partners-nvidia-aws.png" alt="NVIDIA Inception Program e AWS" width={400} height={80} className="h-12 sm:h-14 w-auto object-contain" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-cb-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="bg-cb-surface-light border border-cb-border rounded-2xl p-8 flex flex-col items-center text-center hover:border-cb-orange/20 transition-all">
            <div className="border border-white/20 rounded-lg px-6 py-4 mb-5">
              <Image src="/images/partners-nvidia-aws.png" alt="NVIDIA Inception Program" width={200} height={50} className="h-10 sm:h-12 w-auto object-contain object-left" style={{ objectPosition: "left center", clipPath: "inset(0 50% 0 0)" }} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">NVIDIA Inception Program</h3>
            <p className="text-cb-text-muted text-sm leading-relaxed">
              Membro do programa de aceleracao da NVIDIA para startups de IA, com acesso a tecnologias de ponta e suporte tecnico exclusivo.
            </p>
          </div>
          <div className="bg-cb-surface-light border border-cb-border rounded-2xl p-8 flex flex-col items-center text-center hover:border-cb-orange/20 transition-all">
            <div className="mb-5 py-4">
              <Image src="/images/partners-nvidia-aws.png" alt="AWS" width={200} height={50} className="h-10 sm:h-12 w-auto object-contain object-right" style={{ objectPosition: "right center", clipPath: "inset(0 0 0 55%)" }} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Amazon Web Services</h3>
            <p className="text-cb-text-muted text-sm leading-relaxed">
              Parceria com a AWS com R$25.000 em creditos, garantindo infraestrutura de nivel mundial para nossos projetos de IA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
