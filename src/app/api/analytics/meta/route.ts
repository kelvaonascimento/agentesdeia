import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * Converte valor da API Meta para número sem arredondar.
 * A API retorna strings; mantemos o valor exato (ex: 2.7358).
 */
function toNum(v: string | number | undefined): number {
  if (v === undefined || v === null) return 0;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(/,/g, "."));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Extrai contagem de uma action (lead, purchase, etc.) do array actions da Meta.
 */
function getActionValue(
  actions: Array<{ action_type: string; value: string }> | undefined,
  ...types: string[]
): number {
  if (!Array.isArray(actions)) return 0;
  return actions
    .filter((a) => types.some((t) => (a.action_type || "").toLowerCase().includes(t)))
    .reduce((sum, a) => sum + toNum(a.value), 0);
}

export async function GET(request: NextRequest) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  try {
    const token = process.env.META_ACCESS_TOKEN;
    const accountId = process.env.META_AD_ACCOUNT_ID;

    if (!token || !accountId) {
      return NextResponse.json(
        {
          error: "Meta Ads não configurado",
          details: "Defina META_ACCESS_TOKEN e META_AD_ACCOUNT_ID no ambiente.",
        },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const year = new Date().getFullYear();
    const maxUntil = new Date(year, 2, 31); // 31 mar
    const today = new Date();
    const limitUntil = today <= maxUntil ? today : maxUntil;
    const limitUntilStr = limitUntil.toISOString().slice(0, 10);
    const jan1Str = `${year}-01-01`;

    let sinceStr: string;
    let untilStr: string;
    let days: number;

    const sinceParam = searchParams.get("since");
    const untilParam = searchParams.get("until");
    if (sinceParam && untilParam) {
      sinceStr = sinceParam.slice(0, 10);
      untilStr = untilParam.slice(0, 10);
      const sinceDate = new Date(sinceStr);
      const untilDate = new Date(untilStr);
      if (untilDate < sinceDate) {
        untilStr = sinceStr;
      }
      if (sinceStr < jan1Str) sinceStr = jan1Str;
      if (untilStr > limitUntilStr) untilStr = limitUntilStr;
      days = Math.ceil((new Date(untilStr).getTime() - new Date(sinceStr).getTime()) / (1000 * 60 * 60 * 24)) + 1;
      days = Math.max(1, Math.min(90, days));
    } else {
      days = Math.min(90, Math.max(1, parseInt(searchParams.get("days") || "7", 10)));
      const until = new Date(limitUntil);
      const since = new Date(until);
      since.setDate(since.getDate() - (days - 1));
      sinceStr = since.toISOString().slice(0, 10);
      untilStr = until.toISOString().slice(0, 10);
    }

    const timeRange = JSON.stringify({ since: sinceStr, until: untilStr });

    const baseUrl = "https://graph.facebook.com/v21.0";
    const params = new URLSearchParams({
      access_token: token,
      fields: [
        "impressions",
        "reach",
        "clicks",
        "spend",
        "ctr",
        "cpc",
        "cpm",
        "actions",
      ].join(","),
      time_range: timeRange,
    });

    // Insights do período (totais)
    const actId = accountId.startsWith("act_") ? accountId : `act_${accountId}`;
    const insightsRes = await fetch(`${baseUrl}/${actId}/insights?${params}`);
    const insightsJson = await insightsRes.json();

    if (insightsJson.error) {
      return NextResponse.json(
        {
          error: "Erro na API Meta",
          details: insightsJson.error.message || JSON.stringify(insightsJson.error),
        },
        { status: 500 }
      );
    }

    const data = Array.isArray(insightsJson.data) ? insightsJson.data[0] : insightsJson.data;
    if (!data) {
      return NextResponse.json({
        success: true,
        data: {
          impressions: 0,
          reach: 0,
          clicks: 0,
          spend: 0,
          ctr: 0,
          cpc: 0,
          cpm: 0,
          leads: 0,
          purchases: 0,
          spendPerDay: 0,
          spendByDay: [],
          campaigns: [],
          ads: [],
        },
      });
    }

    const daysUsed = days || 1;

    // Gastos por dia (time_increment=1)
    const dayParams = new URLSearchParams({
      access_token: token,
      fields: "spend",
      time_range: timeRange,
      time_increment: "1",
    });
    const byDayRes = await fetch(`${baseUrl}/${actId}/insights?${dayParams}`);
    const byDayJson = await byDayRes.json();
    let spendByDay: Array<{ date: string; value: number }> = [];
    if (Array.isArray(byDayJson.data)) {
      spendByDay = byDayJson.data.map((row: { date_start: string; spend: string }) => ({
        date: row.date_start,
        value: toNum(row.spend),
      }));
    }

    // Gastos por dia só das campanhas Low Ticket (insights por campanha com time_increment=1)
    const campaignDayParams = new URLSearchParams({
      access_token: token,
      level: "campaign",
      fields: "campaign_id,campaign_name,spend,date_start",
      time_range: timeRange,
      time_increment: "1",
    });
    const campaignDayRes = await fetch(
      `${baseUrl}/${actId}/insights?${campaignDayParams}`
    );
    const campaignDayJson = await campaignDayRes.json();
    if (Array.isArray(campaignDayJson.data) && !campaignDayJson.error) {
      const byDate: Record<string, number> = {};
      for (const row of campaignDayJson.data) {
        const name = String(row.campaign_name || "").toLowerCase();
        if (!name.includes("low ticket")) continue;
        const d = String(row.date_start || "").slice(0, 10);
        if (d) byDate[d] = (byDate[d] || 0) + toNum(row.spend);
      }
      // Um ponto por dia no intervalo (gráfico sempre com eixo dia a dia)
      const out: Array<{ date: string; value: number }> = [];
      const cur = new Date(sinceStr);
      const end = new Date(untilStr);
      while (cur <= end) {
        const d = cur.toISOString().slice(0, 10);
        out.push({ date: d, value: byDate[d] ?? 0 });
        cur.setDate(cur.getDate() + 1);
      }
      spendByDay = out;
    } else {
      // Fallback: garantir um ponto por dia a partir dos dados da conta
      const byDate: Record<string, number> = {};
      for (const p of spendByDay) byDate[p.date] = p.value;
      const out: Array<{ date: string; value: number }> = [];
      const cur = new Date(sinceStr);
      const end = new Date(untilStr);
      while (cur <= end) {
        const d = cur.toISOString().slice(0, 10);
        out.push({ date: d, value: byDate[d] ?? 0 });
        cur.setDate(cur.getDate() + 1);
      }
      spendByDay = out;
    }

    const CAMPAIGN_FILTER = "low ticket";

    // Campanhas: lista com nome e métricas no período
    const campaignInsightsParams = new URLSearchParams({
      access_token: token,
      level: "campaign",
      fields: [
        "campaign_id",
        "campaign_name",
        "impressions",
        "reach",
        "clicks",
        "spend",
        "ctr",
        "cpc",
        "cpm",
        "actions",
      ].join(","),
      time_range: timeRange,
    });
    const campaignRes = await fetch(
      `${baseUrl}/${actId}/insights?${campaignInsightsParams}`
    );
    const campaignJson = await campaignRes.json();
    const campaigns: Array<{
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
    }> = [];
    if (Array.isArray(campaignJson.data) && !campaignJson.error) {
      for (const row of campaignJson.data) {
        const name = String(row.campaign_name || row.campaign_id || "—");
        if (!name.toLowerCase().includes(CAMPAIGN_FILTER.toLowerCase())) continue;
        const act = row.actions as Array<{ action_type: string; value: string }> | undefined;
        campaigns.push({
          id: String(row.campaign_id || ""),
          name,
          impressions: toNum(row.impressions),
          reach: toNum(row.reach),
          clicks: toNum(row.clicks),
          spend: toNum(row.spend),
          ctr: toNum(row.ctr),
          cpc: toNum(row.cpc),
          cpm: toNum(row.cpm),
          leads: getActionValue(act, "lead"),
          purchases: getActionValue(act, "purchase", "omni_purchase"),
        });
      }
    }

    // Totais apenas das campanhas Low Ticket (soma das filtradas)
    const lowTicketSpend = campaigns.reduce((s, c) => s + c.spend, 0);
    const lowTicketImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
    const lowTicketReach = campaigns.reduce((s, c) => s + c.reach, 0);
    const lowTicketClicks = campaigns.reduce((s, c) => s + c.clicks, 0);
    const lowTicketLeads = campaigns.reduce((s, c) => s + c.leads, 0);
    const lowTicketPurchases = campaigns.reduce((s, c) => s + c.purchases, 0);

    const campaignIds = campaigns.map((c) => c.id).filter(Boolean);
    const campaignNamesById: Record<string, string> = {};
    campaigns.forEach((c) => {
      campaignNamesById[c.id] = c.name;
    });

    // Anúncios e criativos (só Low Ticket): insights por anúncio + dados do creative
    type AdWithCreative = {
      adId: string;
      adName: string;
      campaignId: string;
      campaignName: string;
      creative: { title: string; body: string; imageUrl: string | null; thumbnailUrl: string | null };
      impressions: number;
      reach: number;
      clicks: number;
      spend: number;
      ctr: number;
      cpc: number;
      cpm: number;
      leads: number;
      purchases: number;
    };
    const adsWithCreatives: AdWithCreative[] = [];

    if (campaignIds.length > 0) {
      const filtering = JSON.stringify([
        { field: "campaign.id", operator: "IN", value: campaignIds },
      ]);
      const adInsightsParams = new URLSearchParams({
        access_token: token,
        level: "ad",
        fields: [
          "ad_id",
          "ad_name",
          "impressions",
          "reach",
          "clicks",
          "spend",
          "ctr",
          "cpc",
          "cpm",
          "actions",
        ].join(","),
        time_range: timeRange,
        filtering,
      });
      const adInsightsRes = await fetch(
        `${baseUrl}/${actId}/insights?${adInsightsParams}`
      );
      const adInsightsJson = await adInsightsRes.json();
      const adInsightsList: Array<{
        ad_id: string;
        ad_name: string;
        impressions?: string;
        reach?: string;
        clicks?: string;
        spend?: string;
        ctr?: string;
        cpc?: string;
        cpm?: string;
        actions?: Array<{ action_type: string; value: string }>;
      }> = Array.isArray(adInsightsJson?.data) ? adInsightsJson.data : [];

      const adsListParams = new URLSearchParams({
        access_token: token,
        fields: [
          "id",
          "name",
          "campaign_id",
          "creative{id,name,title,body,thumbnail_url,image_url,object_story_spec}",
        ].join(","),
        filtering,
      });
      const adsListRes = await fetch(`${baseUrl}/${actId}/ads?${adsListParams}`);
      const adsListJson = await adsListRes.json();
      const adsList: Array<{
        id: string;
        name: string;
        campaign_id?: string;
        creative?: {
          id?: string;
          name?: string;
          title?: string;
          body?: string;
          thumbnail_url?: string;
          image_url?: string;
          object_story_spec?: unknown;
        };
      }> = Array.isArray(adsListJson?.data) ? adsListJson.data : [];

      const insightsByAdId: Record<
        string,
        {
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
      > = {};
      for (const row of adInsightsList) {
        const adId = String(row.ad_id || "");
        if (!adId) continue;
        const act = row.actions;
        insightsByAdId[adId] = {
          impressions: toNum(row.impressions),
          reach: toNum(row.reach),
          clicks: toNum(row.clicks),
          spend: toNum(row.spend),
          ctr: toNum(row.ctr),
          cpc: toNum(row.cpc),
          cpm: toNum(row.cpm),
          leads: getActionValue(act, "lead"),
          purchases: getActionValue(act, "purchase", "omni_purchase"),
        };
      }

      for (const ad of adsList) {
        const adId = String(ad.id || "");
        const metrics = insightsByAdId[adId];
        const cr = ad.creative;
        adsWithCreatives.push({
          adId,
          adName: String(ad.name || "—"),
          campaignId: String(ad.campaign_id || ""),
          campaignName: campaignNamesById[ad.campaign_id || ""] || String(ad.campaign_id || "—"),
          creative: {
            title: String(cr?.title ?? "").slice(0, 200) || "—",
            body: String(cr?.body ?? "").slice(0, 500) || "—",
            imageUrl: cr?.image_url ? String(cr.image_url) : null,
            thumbnailUrl: cr?.thumbnail_url ? String(cr.thumbnail_url) : null,
          },
          impressions: metrics?.impressions ?? 0,
          reach: metrics?.reach ?? 0,
          clicks: metrics?.clicks ?? 0,
          spend: metrics?.spend ?? 0,
          ctr: metrics?.ctr ?? 0,
          cpc: metrics?.cpc ?? 0,
          cpm: metrics?.cpm ?? 0,
          leads: metrics?.leads ?? 0,
          purchases: metrics?.purchases ?? 0,
        });
      }
      // Ordenar por gasto (maior primeiro) para ver onde está indo o budget
      adsWithCreatives.sort((a, b) => b.spend - a.spend);
    }

    const metrics = {
      impressions: lowTicketImpressions,
      reach: lowTicketReach,
      clicks: lowTicketClicks,
      spend: lowTicketSpend,
      ctr: lowTicketClicks > 0 ? (lowTicketClicks / lowTicketImpressions) * 100 : 0,
      cpc: lowTicketClicks > 0 ? lowTicketSpend / lowTicketClicks : 0,
      cpm: lowTicketImpressions > 0 ? (lowTicketSpend / lowTicketImpressions) * 1000 : 0,
      leads: lowTicketLeads,
      purchases: lowTicketPurchases,
      spendPerDay: lowTicketSpend / daysUsed,
      spendByDay,
      campaigns,
      ads: adsWithCreatives,
    };

    return NextResponse.json({ success: true, data: metrics });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Erro ao buscar dados da Meta:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados da Meta", details: message },
      { status: 500 }
    );
  }
}
