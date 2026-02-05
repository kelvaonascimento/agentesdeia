"use client";

import { useState, useEffect, useCallback } from "react";

interface MetricData {
  value: number;
  change: number;
}

interface GA4Data {
  metrics: {
    sessions: MetricData;
    users: MetricData;
    pageviews: MetricData;
    bounceRate: MetricData;
    avgSessionDuration: MetricData;
    eventCount: MetricData;
  };
  events: {
    formStart: MetricData;
    formSubmit: MetricData;
    checkoutInitiated: MetricData;
    purchase: MetricData;
  };
  sessionsByDay: Array<{ date: string; value: number }>;
  topPages: Array<{ pagina: string; visualizacoes: number }>;
  trafficSources: Array<{ fonte: string; sessoes: number; percentual: string }>;
}

interface UseGoogleAnalyticsResult {
  data: GA4Data | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGoogleAnalytics(days: number = 7): UseGoogleAnalyticsResult {
  const [data, setData] = useState<GA4Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/analytics/google?days=${days}`);
      const result = await response.json();

      if (!response.ok) {
        const parts = [result.error || "Erro ao buscar dados"];
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
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
