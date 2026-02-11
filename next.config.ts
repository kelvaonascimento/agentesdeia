import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduz exposição de IDs de build nos bundles (diagnóstico BAIXA)
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.pagar.me https://generativelanguage.googleapis.com https://www.facebook.com https://connect.facebook.net wss:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect da página principal para o site culturabuilder.com
      {
        source: "/",
        destination: "https://culturabuilder.com",
        permanent: false, // false = 307 (temporário), permite mudar depois
      },
      // LP principal agora em /90-minutos; /principal redireciona
      {
        source: "/principal",
        destination: "/90-minutos",
        permanent: true,
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
