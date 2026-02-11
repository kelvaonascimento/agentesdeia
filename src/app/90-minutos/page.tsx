import type { Metadata } from "next";
import PageTracker from "@/components/PageTracker";
import HeaderNav from "@/components/lp-principal/HeaderNav";
import HeroSection from "@/components/lp-principal/HeroSection";
import LogoMarquee from "@/components/lp-principal/LogoMarquee";
import IntroSection from "@/components/lp-principal/IntroSection";
import WhoIsItForSection from "@/components/lp-principal/WhoIsItForSection";
import JourneySection from "@/components/lp-principal/JourneySection";
import AboutSection from "@/components/lp-principal/AboutSection";
import BonusSection from "@/components/lp-principal/BonusSection";
import PricingSection from "@/components/lp-principal/PricingSection";
import FAQSection from "@/components/lp-principal/FAQSection";
import CTASection from "@/components/lp-principal/CTASection";
import SupportSection from "@/components/lp-principal/SupportSection";
import WhatsAppButton from "@/components/lp-principal/WhatsAppButton";

export const metadata: Metadata = {
  title: "Workshop: Crie seu Primeiro Agente de IA em 90 Minutos | Cultura Builder",
  description: "Workshop ao vivo. Do zero ao agente funcional. Sem código. Template Plug-and-Play. 28 de Fevereiro.",
};

export default function Page90Minutos() {
  return (
    <>
      <PageTracker pageName="Workshop Agente IA" variant="90-minutos-lp" />
      <div className="min-h-screen bg-background text-white">
        <HeaderNav />
        <HeroSection />
        <LogoMarquee />
        <IntroSection />
        <WhoIsItForSection />
        <JourneySection />
        <AboutSection />
        <BonusSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <SupportSection />
        <WhatsAppButton />
      </div>
    </>
  );
}
