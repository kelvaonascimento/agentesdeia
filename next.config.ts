import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect da página principal para o site culturabuilder.com
      {
        source: "/",
        destination: "https://culturabuilder.com",
        permanent: false, // false = 307 (temporário), permite mudar depois
      },
      // Redirects das rotas antigas para as novas
      {
        source: "/lp2-urgencia",
        destination: "/automatize",
        permanent: true,
      },
      {
        source: "/lp3-expert",
        destination: "/construir-agente",
        permanent: true,
      },
      {
        source: "/lp4-prova-social",
        destination: "/primeiro-agente",
        permanent: true,
      },
      {
        source: "/lp5-minimalista",
        destination: "/sem-codigo",
        permanent: true,
      },
      {
        source: "/lp6-storytelling",
        destination: "/jornada-ia",
        permanent: true,
      },
      {
        source: "/lp7-video-first",
        destination: "/aula-ao-vivo",
        permanent: true,
      },
      {
        source: "/lp8-faq-focused",
        destination: "/ia-pratica",
        permanent: true,
      },
      {
        source: "/lp9-countdown",
        destination: "/garantir-vaga",
        permanent: true,
      },
      {
        source: "/lp10-mobile-cta",
        destination: "/automacao",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
