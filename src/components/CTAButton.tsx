"use client";

interface CTAButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function CTAButton({
  text,
  href = "#inscricao",
  variant = "primary",
  size = "lg",
  pulse = true,
  className = "",
  icon,
}: CTAButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
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

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon}
      {text}
    </a>
  );
}
