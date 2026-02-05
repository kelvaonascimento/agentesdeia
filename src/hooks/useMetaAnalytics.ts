"use client";

import { useState, useEffect, useCallback } from "react";

export interface MetaCampaign {
  id: string;
  name: string;
  impressions: number;
  reach: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  leads: number;
  purchases: number;
}

export interface MetaAdCreative {
  title: string;
  body: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
}

export interface MetaAdWithCreative {
  adId: string;
  adName: string;
  campaignId: string;
  campaignName: string;
  creative: MetaAdCreative;
  impressions: number;
  reach: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  leads: number;
  purchases: number;
}

export interface MetaMetrics {
  impressions: number;
  reach: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  cpm: number;
  leads: number;
  purchases: number;
  spendPerDay: number;
  spendByDay: Array<{ date: string; value: number }>;
  campaigns: MetaCampaign[];
  ads: MetaAdWithCreative[];
}

interface UseMetaAnalyticsResult {
  data: MetaMetrics | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseMetaAnalyticsOptions {
  days?: number;
  since?: string;
  until?: string;
}

export function useMetaAnalytics(
  daysOrOptions: number | UseMetaAnalyticsOptions = 7
): UseMetaAnalyticsResult {
  const options =
    typeof daysOrOptions === "object"
      ? daysOrOptions
      : { days: daysOrOptions };
  const days = options.days ?? 7;
  const since = options.since;
  const until = options.until;

  const [data, setData] = useState<MetaMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query =
    since && until
      ? `since=${encodeURIComponent(since)}&until=${encodeURIComponent(until)}`
      : `days=${days}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/analytics/meta?${query}`);
      const result = await response.json();

      if (!response.ok) {
        const parts = [result.error || "Erro ao buscar dados da Meta"];
        if (result.details) parts.push(result.details);
        throw new Error(parts.join(". "));
      }

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
