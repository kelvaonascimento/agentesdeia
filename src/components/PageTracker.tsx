"use client";

import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";

interface PageTrackerProps {
  pageName: string;
  variant: string;
}

/**
 * Componente para rastrear visualização de página e scroll
 * Adicione este componente em cada Landing Page
 */
export default function PageTracker({ pageName, variant }: PageTrackerProps) {
  usePageTracking({ pageName, variant });
  useScrollTracking();
  
  return null; // Não renderiza nada, apenas executa os hooks
}
