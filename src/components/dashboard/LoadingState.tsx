"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Carregando dados...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-10 h-10 text-cb-orange animate-spin mb-4" />
      <p className="text-cb-text-muted text-sm">{message}</p>
    </div>
  );
}
