"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  variant?: "default" | "compact" | "large" | "inline";
}

export default function CountdownTimer({ targetDate, variant = "default" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-2">
            <div className="bg-cb-surface-light border border-cb-border rounded-lg px-3 py-2 text-center min-w-[52px]">
              <span className="text-xl font-bold text-cb-orange tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-cb-text-muted uppercase tracking-wider">{block.label}</p>
            </div>
            {i < blocks.length - 1 && <span className="text-cb-orange font-bold text-lg">:</span>}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1 font-mono font-bold text-cb-orange">
        {String(timeLeft.days).padStart(2, "0")}d {String(timeLeft.hours).padStart(2, "0")}h{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    );
  }

  if (variant === "large") {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-3 sm:gap-4">
            <div className="border-glow-orange rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-center min-w-[70px] sm:min-w-[90px] animate-count-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
              <span className="text-3xl sm:text-5xl font-black text-cb-orange tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
              <p className="text-xs sm:text-sm text-cb-text-muted uppercase tracking-widest mt-1">{block.label}</p>
            </div>
            {i < blocks.length - 1 && <span className="text-cb-orange font-bold text-2xl sm:text-3xl">:</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-2 sm:gap-3">
          <div className="bg-cb-surface border border-cb-border rounded-xl px-3 sm:px-5 py-3 sm:py-4 text-center min-w-[60px] sm:min-w-[80px]">
            <span className="text-2xl sm:text-4xl font-bold text-cb-orange tabular-nums">
              {String(block.value).padStart(2, "0")}
            </span>
            <p className="text-[10px] sm:text-xs text-cb-text-muted uppercase tracking-wider mt-1">{block.label}</p>
          </div>
          {i < blocks.length - 1 && <span className="text-cb-orange font-bold text-xl sm:text-2xl">:</span>}
        </div>
      ))}
    </div>
  );
}
