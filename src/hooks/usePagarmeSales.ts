"use client";

import { useState, useEffect, useCallback } from "react";

export interface VendaItem {
  id: string;
  nome: string;
  email: string;
  data: string;
  valor: number;
  origem: string;
}

export interface PagarmeSalesData {
  vendasConfirmadas: number;
  vendasPendentes: number;
  vendasCanceladasOuFalhas: number;
  totalReceitaConfirmada: number;
  periodo: { since: string; until: string };
  filtroProdutoAtivo?: boolean;
  ultimasVendas: VendaItem[];
  resumo: Array<{ label: string; value: number; status: string }>;
}

interface UsePagarmeSalesParams {
  days: number;
  since?: string; // YYYY-MM-DD (quando período custom)
  until?: string;
}

interface UsePagarmeSalesResult {
  data: PagarmeSalesData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePagarmeSales({
  days,
  since,
  until,
}: UsePagarmeSalesParams): UsePagarmeSalesResult {
  const [data, setData] = useState<PagarmeSalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (since && until) {
        params.set("since", since);
        params.set("until", until);
      } else {
        params.set("days", String(Math.min(90, Math.max(1, days))));
      }

      const response = await fetch(`/api/analytics/pagarme?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        const parts = [result.error || "Erro ao buscar vendas"];
        if (result.details) parts.push(result.details);
        if (result.hint) parts.push(`→ ${result.hint}`);
        throw new Error(parts.join(". "));
      }

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [days, since, until]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
