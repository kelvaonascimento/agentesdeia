import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workshop Ao Vivo: Crie seu Agente de IA em 90 Minutos | Cultura Builder",
  description:
    "Participe do nosso workshop pratico e crie seu primeiro agente de IA do zero, mesmo sem saber programar. Vagas limitadas. Inscreva-se agora por R$167.",
  keywords: "workshop ia, criar agente de ia, automacao com ia, curso pratico de ia",
  openGraph: {
    title: "Workshop Ao Vivo: Crie seu Agente de IA em 90 Minutos",
    description: "Participe do nosso workshop pratico e crie seu primeiro agente de IA do zero.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
