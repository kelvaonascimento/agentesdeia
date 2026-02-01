"use client";

import { useState, useEffect, useRef } from "react";
import { gtm } from "@/lib/gtm";

interface CountdownTimerProps {
  targetDate: string;
  variant?: "default" | "compact" | "large" | "inline";
}

export default function CountdownTimer({ targetDate, variant = "default" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const hasTracked = useRef(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const newTimeLeft = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };

      setTimeLeft(newTimeLeft);

      // Tracking: countdown_view (apenas uma vez por sessão)
      if (!hasTracked.current) {
        hasTracked.current = true;
        const timeRemaining = `${newTimeLeft.days}d ${newTimeLeft.hours}h ${newTimeLeft.minutes}m`;
        gtm.countdownView(variant, timeRemaining);
      }
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate, variant]);

  const blocks = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  if (!mounted) {
    return null;
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center justify-center gap-2">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-2">
            <div className="relative bg-black/80 border border-cb-orange/20 rounded-xl px-3 py-2 text-center min-w-[52px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cb-orange/5 to-transparent" />
              <span className="relative text-xl font-black text-cb-orange tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
              <p className="relative text-[10px] text-cb-text-muted uppercase tracking-wider">{block.label}</p>
            </div>
            {i < blocks.length - 1 && <span className="text-cb-orange/40 font-bold text-lg">:</span>}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono font-bold text-cb-orange text-sm">
        <span className="bg-cb-orange/10 rounded px-1.5 py-0.5">{String(timeLeft.days).padStart(2, "0")}d</span>
        <span className="bg-cb-orange/10 rounded px-1.5 py-0.5">{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span className="bg-cb-orange/10 rounded px-1.5 py-0.5">{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span className="bg-cb-orange/10 rounded px-1.5 py-0.5 animate-pulse">{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </span>
    );
  }

  if (variant === "large") {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-5">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-2 sm:gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-cb-orange/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-b from-cb-surface-lighter to-cb-surface border border-cb-orange/30 rounded-2xl px-3 sm:px-8 py-3 sm:py-6 text-center min-w-[60px] sm:min-w-[100px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cb-orange/10 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cb-orange/50 to-transparent" />
                <span className="relative text-3xl sm:text-5xl font-black text-white tabular-nums">
                  {String(block.value).padStart(2, "0")}
                </span>
                <p className="relative text-xs sm:text-sm text-cb-orange uppercase tracking-widest mt-2 font-semibold">{block.label}</p>
              </div>
            </div>
            {i < blocks.length - 1 && (
              <div className="flex flex-col gap-1.5">
                <div className="w-1.5 h-1.5 bg-cb-orange rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-cb-orange rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Default
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-1.5 sm:gap-3">
          <div className="relative bg-gradient-to-b from-cb-surface-lighter to-cb-surface border border-cb-orange/20 rounded-xl px-2.5 sm:px-5 py-2.5 sm:py-4 text-center min-w-[52px] sm:min-w-[80px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cb-orange/5 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cb-orange/40 to-transparent" />
            <span className="relative text-2xl sm:text-4xl font-black text-white tabular-nums">
              {String(block.value).padStart(2, "0")}
            </span>
            <p className="relative text-[10px] sm:text-xs text-cb-orange uppercase tracking-wider mt-1 font-semibold">{block.label}</p>
          </div>
          {i < blocks.length - 1 && (
            <div className="flex flex-col gap-1">
              <div className="w-1 h-1 bg-cb-orange/60 rounded-full" />
              <div className="w-1 h-1 bg-cb-orange/60 rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
