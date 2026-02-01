/**
 * Hook para rastrear visualização de página
 * Envia evento page_view_lp automaticamente
 */

"use client";

import { useEffect } from "react";
import { gtm } from "@/lib/gtm";

interface PageTrackingOptions {
  pageName: string;
  variant: string;
  enabled?: boolean;
}

export function usePageTracking({ 
  pageName, 
  variant, 
  enabled = true 
}: PageTrackingOptions) {
  useEffect(() => {
    if (enabled && typeof window !== "undefined") {
      // Aguardar montagem completa
      const timer = setTimeout(() => {
        gtm.pageView(pageName, variant);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pageName, variant, enabled]);
}
