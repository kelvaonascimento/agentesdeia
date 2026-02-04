"use client";

import { Calendar, RefreshCw } from "lucide-react";

export type DateRange = "7" | "14" | "30";

interface DateRangePickerProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  onRefresh: () => void;
  loading?: boolean;
}

export default function DateRangePicker({
  value,
  onChange,
  onRefresh,
  loading = false,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-cb-surface border border-cb-border rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-cb-orange" />
        <span className="text-cb-text-secondary text-sm">Período:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as DateRange)}
          className="bg-cb-surface-light border border-cb-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cb-orange transition-colors cursor-pointer"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="14">Últimos 14 dias</option>
          <option value="30">Últimos 30 dias</option>
        </select>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 bg-cb-surface-light border border-cb-border rounded-lg px-4 py-2 text-cb-text-secondary hover:text-white hover:border-cb-orange transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        <span className="text-sm hidden sm:inline">Atualizar</span>
      </button>
    </div>
  );
}
