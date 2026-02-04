"use client";

import { gtm } from "@/lib/gtm";

interface CTAButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
  location?: string;
}

export default function CTAButton({
  text,
  href = "#inscricao",
  variant = "primary",
  size = "lg",
  pulse = true,
  className = "",
  icon,
  location = "section",
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-xs sm:text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  const variantClasses = {
    primary: `bg-gradient-orange text-white font-bold hover:brightness-110 ${pulse ? "animate-glow-pulse" : "glow-orange-sm"}`,
    secondary: "bg-cb-surface-light border border-cb-orange text-cb-orange font-bold hover:bg-cb-orange hover:text-white",
    outline: "bg-transparent border-2 border-cb-orange text-cb-orange font-bold hover:bg-cb-orange/10",
    ghost: "bg-transparent text-cb-orange font-semibold hover:bg-cb-orange/10 underline-offset-4 hover:underline",
  };

  // Tracking: cta_click
  const handleClick = () => {
    gtm.ctaClick(location, text);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 cursor-pointer text-center break-words min-w-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon}
      {text}
    </a>
  );
}
