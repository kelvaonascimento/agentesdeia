"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: string; // e.g. "6.793+", "100+", "50+", "90min", "R$167"
  className?: string;
  duration?: number;
}

function parseNumber(value: string): { num: number; prefix: string; suffix: string; decimals: boolean } {
  // Extract numeric part and surrounding text
  const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!match) return { num: 0, prefix: value, suffix: "", decimals: false };

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];

  // Check if the number uses dots as thousand separators (e.g., "6.793")
  const hasThousandSep = numStr.includes(".") && numStr.split(".")[1]?.length === 3;

  const num = hasThousandSep
    ? parseInt(numStr.replace(/\./g, ""), 10)
    : parseFloat(numStr);

  return { num, prefix, suffix, decimals: hasThousandSep };
}

function formatNumber(num: number, useThousandSep: boolean): string {
  if (useThousandSep) {
    return num.toLocaleString("pt-BR");
  }
  return String(num);
}

export default function AnimatedNumber({ value, className = "", duration = 1800 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const { num, prefix, suffix, decimals } = parseNumber(value);

          if (num === 0) {
            setDisplayed(value);
            return;
          }

          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            setDisplayed(`${prefix}${formatNumber(current, decimals)}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
