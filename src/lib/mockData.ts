/**
 * Dados mockados para o Dashboard
 * Serão substituídos por dados reais nas Fases 3 e 4
 */

import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Gera dados de visitantes por dia
export function generateVisitorsData(days: number) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, "dd/MM", { locale: ptBR }),
      value: Math.floor(Math.random() * 300) + 100,
    });
  }
  return data;
}

// Gera dados de sessões por dia (Google)
export function generateSessionsData(days: number) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, "dd/MM", { locale: ptBR }),
      value: Math.floor(Math.random() * 500) + 150,
    });
  }
  return data;
}

// Gera dados de gastos por dia (Meta)
export function generateSpendData(days: number) {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, "dd/MM", { locale: ptBR }),
      value: Math.floor(Math.random() * 200) + 50,
    });
  }
  return data;
}

// Dados comparativos Google vs Meta
export function getComparisonData() {
  return [
    { name: "Google", value: 1850, color: "#3B82F6" },
    { name: "Meta", value: 1230, color: "#E8590C" },
  ];
}

// Métricas da Visão Geral (combinadas)
export function getOverviewMetrics() {
  return {
    visitors: { value: 3080, change: 12.5 },
    leads: { value: 156, change: 8.2 },
    sales: { value: 23, change: -3.1 },
    spend: { value: 2500, change: 15.0 },
    cpl: { value: 16.02, change: -5.3 },
    cpa: { value: 108.69, change: 8.7 },
    roas: { value: 2.73, change: -2.1 },
  };
}

// Métricas do Google Analytics
export function getGoogleMetrics() {
  return {
    sessions: { value: 4521, change: 10.2 },
    users: { value: 3890, change: 8.5 },
    pageviews: { value: 12340, change: 15.3 },
    bounceRate: { value: 42.5, change: -3.2 },
    avgDuration: { value: "2m 34s", change: 5.1 },
    formStart: { value: 423, change: 12.0 },
    formSubmit: { value: 156, change: 8.2 },
    checkoutInitiated: { value: 89, change: 6.5 },
    purchase: { value: 23, change: -3.1 },
  };
}

// Métricas do Meta Ads
export function getMetaMetrics() {
  return {
    impressions: { value: 125430, change: 22.5 },
    reach: { value: 45670, change: 18.3 },
    clicks: { value: 3240, change: 14.2 },
    ctr: { value: 2.58, change: -6.5 },
    cpc: { value: 0.77, change: -8.2 },
    cpm: { value: 19.93, change: 3.4 },
    spend: { value: 2500, change: 15.0 },
    spendPerDay: { value: 357.14, change: 15.0 },
    leads: { value: 156, change: 8.2 },
    purchases: { value: 23, change: -3.1 },
  };
}

// Top páginas
export function getTopPages() {
  return [
    { pagina: "/lps", visualizacoes: 0, conversoes: 0 },
    { pagina: "/principal", visualizacoes: 0, conversoes: 0 },
    { pagina: "/workshop-agente-ia", visualizacoes: 3421, conversoes: 45 },
    { pagina: "/automatize", visualizacoes: 2156, conversoes: 32 },
    { pagina: "/construir-agente", visualizacoes: 1843, conversoes: 28 },
    { pagina: "/primeiro-agente", visualizacoes: 1567, conversoes: 21 },
    { pagina: "/sem-codigo", visualizacoes: 1234, conversoes: 18 },
  ];
}

// Fontes de tráfego
export function getTrafficSources() {
  return [
    { fonte: "Facebook Ads", sessoes: 2340, percentual: "51.8%" },
    { fonte: "Instagram Ads", sessoes: 1230, percentual: "27.2%" },
    { fonte: "Google Ads", sessoes: 650, percentual: "14.4%" },
    { fonte: "Orgânico", sessoes: 210, percentual: "4.6%" },
    { fonte: "Direto", sessoes: 91, percentual: "2.0%" },
  ];
}
