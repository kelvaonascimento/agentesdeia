"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  loading?: boolean;
}

export default function LineChart({
  title,
  data,
  color = "#E8590C",
  loading = false,
}: LineChartProps) {
  if (loading) {
    return (
      <div className="bg-cb-surface border border-cb-border rounded-xl p-6 animate-pulse">
        <div className="w-48 h-5 bg-cb-surface-light rounded mb-6" />
        <div className="h-64 bg-cb-surface-light rounded" />
      </div>
    );
  }

  const safeData = Array.isArray(data) ? data : [];
  const hasData = safeData.length > 0;

  return (
    <div className="bg-cb-surface border border-cb-border rounded-xl p-6 min-w-0">
      <h3 className="text-white font-semibold mb-6">{title}</h3>
      <div className="h-64 min-h-[256px] w-full min-w-[280px]" style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={256} minWidth={280} minHeight={256}>
          <RechartsLineChart data={hasData ? safeData : [{ date: "-", value: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={{ stroke: "#4b5563" }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={{ stroke: "#4b5563" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#9ca3af" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
