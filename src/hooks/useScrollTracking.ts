/**
 * Hook para rastrear profundidade de scroll
 * Envia eventos ao GTM em 25%, 50%, 75% e 100%
 */

"use client";

import { useEffect, useRef } from "react";
import { gtm } from "@/lib/gtm";

export function useScrollTracking() {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calcular percentual de scroll
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Marcos de profundidade
      const depths = [25, 50, 75, 100];
      
      depths.forEach((depth) => {
        if (scrollPercentage >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          gtm.scrollDepth(depth);
        }
      });
    };

    // Adicionar listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
