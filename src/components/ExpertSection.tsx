import Image from "next/image";

interface ExpertSectionProps {
  variant?: "default" | "side" | "minimal";
  imageIndex?: number;
}

export default function ExpertSection({ variant = "default", imageIndex = 1 }: ExpertSectionProps) {
  const imageSrc = `/images/expert/caio-${imageIndex}.png`;

  if (variant === "side") {
    return (
      <section className="py-16 sm:py-24 bg-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cb-orange/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-cb-orange/20">
                <Image src={imageSrc} alt="Caio Vicentino" width={600} height={600} className="w-full object-cover" />
              </div>
            </div>
            <div>
              <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
                Seu Instrutor
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Caio Vicentino</h2>
              <p className="text-cb-orange font-semibold mb-6">Co-fundador do Cultura Builder</p>
              <p className="text-cb-text-secondary leading-relaxed mb-4">
                Caio Vicentino nao e um teorico. Como co-fundador do Cultura Builder — pioneiro em financas descentralizadas e inteligencia artificial — e criador da Yield Hackers, ele vive na fronteira da inovacao.
              </p>
              <p className="text-cb-text-secondary leading-relaxed mb-4">
                O Cultura Builder e parceiro oficial da NVIDIA (Inception Program) e da AWS, conectando 6.793+ builders as maiores plataformas de tecnologia do mundo.
              </p>
              <p className="text-cb-text-secondary leading-relaxed mb-8">
                Ele vai te guiar com a didatica de quem ja ensinou milhares de pessoas e a experiencia pratica de quem usa agentes de IA para escalar seus proprios negocios. Ele vai te mostrar os atalhos, os truques e, mais importante, provar que voce tambem pode fazer isso.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Yield Hackers", "6.793+ alunos", "Cultura Builder"].map((tag) => (
                  <span key={tag} className="bg-cb-surface-lighter text-cb-text-secondary text-sm px-4 py-2 rounded-full border border-cb-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "minimal") {
    return (
      <section className="py-16 bg-cb-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute -inset-2 bg-cb-orange/20 rounded-full blur-xl" />
            <Image src={imageSrc} alt="Caio Vicentino" width={128} height={128} className="relative w-full h-full rounded-full object-cover border-2 border-cb-orange" />
          </div>
          <h3 className="text-2xl font-bold text-white">Caio Vicentino</h3>
          <p className="text-cb-orange text-sm font-semibold mt-1 mb-4">Co-fundador do Cultura Builder</p>
          <p className="text-cb-text-muted leading-relaxed max-w-xl mx-auto">
            Pioneiro em financas descentralizadas e IA. Criador da Yield Hackers, parceiro NVIDIA e AWS. Ja ensinou 6.793+ pessoas a construir com IA.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cb-surface via-background to-cb-surface" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block bg-cb-orange/10 text-cb-orange text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-cb-orange/20 mb-4">
            Conheca seu guia
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Guiado por quem constroi <span className="text-gradient-orange">todos os dias.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-cb-orange/10 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-cb-orange/30 glow-orange-sm">
                <Image src={imageSrc} alt="Caio Vicentino" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Caio Vicentino</h3>
            <p className="text-cb-orange font-semibold mb-6">Co-fundador do Cultura Builder | Criador da Yield Hackers</p>
            <p className="text-cb-text-secondary leading-relaxed text-lg mb-4">
              Caio Vicentino nao e um teorico. Como co-fundador do Cultura Builder — pioneiro em financas descentralizadas e inteligencia artificial — e criador da Yield Hackers, ele vive na fronteira da inovacao.
            </p>
            <p className="text-cb-text-secondary leading-relaxed text-lg mb-4">
              Com parcerias estrategicas com NVIDIA (Inception Program) e AWS, o Cultura Builder conecta sua comunidade de 6.793+ builders as maiores plataformas de tecnologia do mundo.
            </p>
            <p className="text-cb-text-secondary leading-relaxed text-lg mb-8">
              Ele vai te guiar com a didatica de quem ja ensinou milhares de pessoas e a experiencia pratica de quem usa agentes de IA para escalar seus proprios negocios.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "6.793+", label: "Builders" },
                { number: "100+", label: "Agentes criados" },
                { number: "50+", label: "Empresas parceiras" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-cb-surface rounded-xl border border-cb-border">
                  <p className="text-2xl font-black text-cb-orange">{stat.number}</p>
                  <p className="text-xs text-cb-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
