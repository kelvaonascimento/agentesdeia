"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  variant?: "hero" | "section";
}

export default function CountdownTimer({ targetDate, variant = "section" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  if (variant === "hero") {
    return (
      <div className="flex gap-3">
        {blocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="flex flex-col items-center rounded-xl border border-cb-border bg-cb-surface/80 backdrop-blur-sm px-4 py-3 min-w-[60px]"
          >
            <span className="text-2xl font-bold text-white md:text-3xl">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cb-text-muted">{block.label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4">
      {blocks.map((block) => (
        <div
          key={block.label}
          className="flex flex-col items-center rounded-xl border border-cb-orange/20 bg-cb-surface px-5 py-4 min-w-[70px]"
        >
          <span className="text-3xl font-bold gradient-text md:text-4xl">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider text-cb-text-muted">{block.label}</span>
        </div>
      ))}
    </div>
  );
}
