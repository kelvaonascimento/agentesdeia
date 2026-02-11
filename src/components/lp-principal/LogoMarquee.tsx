import Image from "next/image";

const partners = [
  { src: "/images/nvidia-badge.png", alt: "NVIDIA Inception Program" },
  { src: "/images/brand/aws-logo.svg", alt: "AWS" },
];

const repeatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners, ...partners];

export default function LogoMarquee() {
  return (
    <div className="overflow-hidden border-y border-cb-border bg-cb-surface-light/30 py-4">
      <div className="container mx-auto px-4 mb-2 text-center">
        <p className="text-xs uppercase tracking-widest text-cb-text-muted">Parcerias Estratégicas</p>
      </div>
      <div className="animate-marquee flex w-max items-center gap-16">
        {repeatedPartners.map((partner, i) => (
          <Image
            key={i}
            src={partner.src}
            alt={partner.alt}
            width={120}
            height={40}
            className="h-10 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
