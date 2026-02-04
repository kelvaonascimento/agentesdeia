"use client";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: Record<string, string | number>[];
  loading?: boolean;
}

export default function DataTable({
  title,
  columns,
  data,
  loading = false,
}: DataTableProps) {
  if (loading) {
    return (
      <div className="bg-cb-surface border border-cb-border rounded-xl p-6 animate-pulse">
        <div className="w-48 h-5 bg-cb-surface-light rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-cb-surface-light rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cb-surface border border-cb-border rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cb-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-${
                    col.align || "left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-cb-border/50 hover:bg-cb-surface-light/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-3 px-4 text-sm text-cb-text-secondary text-${
                      col.align || "left"
                    }`}
                  >
                    {typeof row[col.key] === "number"
                      ? row[col.key].toLocaleString("pt-BR")
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
