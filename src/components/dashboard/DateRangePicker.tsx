"use client";

import { Calendar, RefreshCw } from "lucide-react";

export type DateRange = "7" | "14" | "30" | "custom";

export interface CustomRange {
  since: string; // YYYY-MM-DD
  until: string;
}

const currentYear = new Date().getFullYear();
const maxUntil = new Date(currentYear, 2, 31); // 31 mar
const today = new Date();
const limitUntil = today <= maxUntil ? today : maxUntil;
export const MIN_DATE = `${currentYear}-01-01`;
export const MAX_DATE = limitUntil.toISOString().slice(0, 10);

interface DateRangePickerProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  onRefresh: () => void;
  loading?: boolean;
  customRange?: CustomRange;
  onCustomRangeChange?: (since: string, until: string) => void;
}

export default function DateRangePicker({
  value,
  onChange,
  onRefresh,
  loading = false,
  customRange,
  onCustomRangeChange,
}: DateRangePickerProps) {
  const since = customRange?.since ?? MIN_DATE;
  const until = customRange?.until ?? MAX_DATE;

  return (
    <div className="flex flex-wrap items-center gap-4 bg-cb-surface border border-cb-border rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Calendar className="w-5 h-5 text-cb-orange shrink-0" />
        <span className="text-cb-text-secondary text-sm">Período:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as DateRange)}
          className="bg-cb-surface-light border border-cb-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cb-orange transition-colors cursor-pointer"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="14">Últimos 14 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="custom">Personalizado</option>
        </select>

        {value === "custom" && onCustomRangeChange && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-cb-text-muted text-sm">De</span>
            <input
              type="date"
              min={MIN_DATE}
              max={MAX_DATE}
              value={since}
              onChange={(e) => onCustomRangeChange(e.target.value, until)}
              className="bg-cb-surface-light border border-cb-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cb-orange"
            />
            <span className="text-cb-text-muted text-sm">até</span>
            <input
              type="date"
              min={MIN_DATE}
              max={MAX_DATE}
              value={until}
              onChange={(e) => onCustomRangeChange(since, e.target.value)}
              className="bg-cb-surface-light border border-cb-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cb-orange"
            />
            <span className="text-cb-text-muted text-xs">
              (jan–{limitUntil.getMonth() + 1}/{limitUntil.getFullYear()}, máx. 31/03)
            </span>
          </div>
        )}
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 bg-cb-surface-light border border-cb-border rounded-lg px-4 py-2 text-cb-text-secondary hover:text-white hover:border-cb-orange transition-colors disabled:opacity-50 ml-auto"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        <span className="text-sm hidden sm:inline">Atualizar</span>
      </button>
    </div>
  );
}
