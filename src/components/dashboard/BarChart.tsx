"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  title: string;
  data: DataPoint[];
  loading?: boolean;
}

const COLORS = ["#E8590C", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export default function BarChart({ title, data, loading = false }: BarChartProps) {
  if (loading) {
    return (
      <div className="bg-cb-surface border border-cb-border rounded-xl p-6 animate-pulse">
        <div className="w-48 h-5 bg-cb-surface-light rounded mb-6" />
        <div className="h-64 bg-cb-surface-light rounded" />
      </div>
    );
  }

  return (
    <div className="bg-cb-surface border border-cb-border rounded-xl p-6">
      <h3 className="text-white font-semibold mb-6">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" horizontal={false} />
            <XAxis
              type="number"
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={{ stroke: "#4b5563" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={{ stroke: "#4b5563" }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#9ca3af" }}
              formatter={(value) => [typeof value === "number" ? value.toLocaleString("pt-BR") : value, "Valor"]}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
