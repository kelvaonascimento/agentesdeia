"use client";

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number; // Percentual de variação (ex: 12 para +12%, -3 para -3%)
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  prefix = "",
  suffix = "",
  loading = false,
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const changeText = change !== undefined 
    ? `${isPositive ? "+" : ""}${change.toFixed(1)}%` 
    : null;

  if (loading) {
    return (
      <div className="bg-cb-surface border border-cb-border rounded-xl p-5 animate-pulse">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-cb-surface-light rounded-lg" />
          <div className="w-12 h-5 bg-cb-surface-light rounded-full" />
        </div>
        <div className="w-20 h-4 bg-cb-surface-light rounded mb-2" />
        <div className="w-24 h-8 bg-cb-surface-light rounded" />
      </div>
    );
  }

  return (
    <div className="bg-cb-surface border border-cb-border rounded-xl p-5 hover:border-cb-orange/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-cb-orange/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-cb-orange" />
        </div>
        {changeText && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              isPositive
                ? "bg-green-500/10 text-green-400"
                : isNegative
                ? "bg-red-500/10 text-red-400"
                : "bg-cb-surface-light text-cb-text-muted"
            }`}
          >
            {changeText}
          </span>
        )}
      </div>
      <p className="text-cb-text-muted text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">
        {prefix}
        {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
        {suffix}
      </p>
    </div>
  );
}
