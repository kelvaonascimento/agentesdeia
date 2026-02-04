/**
 * Google Analytics 4 Data API
 * Cultura Builder Dashboard
 */

import { GoogleAuth } from "google-auth-library";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const GA4_API_URL = `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`;

interface GA4Response {
  rows?: Array<{
    dimensionValues?: Array<{ value: string }>;
    metricValues?: Array<{ value: string }>;
  }>;
  rowCount?: number;
}

interface MetricData {
  value: number;
  change: number;
}

/**
 * Obtém token de acesso do Google
 */
async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  
  if (!token.token) {
    throw new Error("Falha ao obter token de acesso");
  }
  
  return token.token;
}

/**
 * Executa uma query no GA4
 */
async function runReport(
  metrics: string[],
  dimensions: string[] = [],
  startDate: string = "7daysAgo",
  endDate: string = "today"
): Promise<GA4Response> {
  const accessToken = await getAccessToken();

  const body = {
    dateRanges: [{ startDate, endDate }],
    metrics: metrics.map((name) => ({ name })),
    dimensions: dimensions.map((name) => ({ name })),
  };

  const response = await fetch(GA4_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("GA4 API Error:", error);
    throw new Error(`GA4 API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * Calcula a variação percentual entre dois valores
 */
function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Obtém métricas básicas do GA4
 */
export async function getGA4Metrics(days: number = 7): Promise<{
  sessions: MetricData;
  users: MetricData;
  pageviews: MetricData;
  bounceRate: MetricData;
  avgSessionDuration: MetricData;
  eventCount: MetricData;
}> {
  const endDate = "today";
  const startDate = `${days}daysAgo`;
  const previousStartDate = `${days * 2}daysAgo`;
  const previousEndDate = `${days + 1}daysAgo`;

  // Período atual
  const currentData = await runReport(
    [
      "sessions",
      "totalUsers",
      "screenPageViews",
      "bounceRate",
      "averageSessionDuration",
      "eventCount",
    ],
    [],
    startDate,
    endDate
  );

  // Período anterior (para calcular variação)
  const previousData = await runReport(
    [
      "sessions",
      "totalUsers",
      "screenPageViews",
      "bounceRate",
      "averageSessionDuration",
      "eventCount",
    ],
    [],
    previousStartDate,
    previousEndDate
  );

  const currentMetrics = currentData.rows?.[0]?.metricValues || [];
  const previousMetrics = previousData.rows?.[0]?.metricValues || [];

  const getValue = (arr: Array<{ value: string }>, index: number) =>
    parseFloat(arr[index]?.value || "0");

  return {
    sessions: {
      value: getValue(currentMetrics, 0),
      change: calculateChange(getValue(currentMetrics, 0), getValue(previousMetrics, 0)),
    },
    users: {
      value: getValue(currentMetrics, 1),
      change: calculateChange(getValue(currentMetrics, 1), getValue(previousMetrics, 1)),
    },
    pageviews: {
      value: getValue(currentMetrics, 2),
      change: calculateChange(getValue(currentMetrics, 2), getValue(previousMetrics, 2)),
    },
    bounceRate: {
      value: getValue(currentMetrics, 3) * 100,
      change: calculateChange(getValue(currentMetrics, 3), getValue(previousMetrics, 3)),
    },
    avgSessionDuration: {
      value: getValue(currentMetrics, 4),
      change: calculateChange(getValue(currentMetrics, 4), getValue(previousMetrics, 4)),
    },
    eventCount: {
      value: getValue(currentMetrics, 5),
      change: calculateChange(getValue(currentMetrics, 5), getValue(previousMetrics, 5)),
    },
  };
}

/**
 * Obtém contagem de eventos específicos (conversões)
 */
export async function getGA4Events(days: number = 7): Promise<{
  formStart: MetricData;
  formSubmit: MetricData;
  checkoutInitiated: MetricData;
  purchase: MetricData;
}> {
  const endDate = "today";
  const startDate = `${days}daysAgo`;
  const previousStartDate = `${days * 2}daysAgo`;
  const previousEndDate = `${days + 1}daysAgo`;

  const eventNames = ["form_start", "form_submit", "checkout_initiated", "purchase"];

  const results: Record<string, { current: number; previous: number }> = {};

  for (const eventName of eventNames) {
    // Período atual
    const currentData = await runReport(
      ["eventCount"],
      ["eventName"],
      startDate,
      endDate
    );

    // Período anterior
    const previousData = await runReport(
      ["eventCount"],
      ["eventName"],
      previousStartDate,
      previousEndDate
    );

    const findEventCount = (data: GA4Response, name: string): number => {
      const row = data.rows?.find(
        (r) => r.dimensionValues?.[0]?.value === name
      );
      return parseFloat(row?.metricValues?.[0]?.value || "0");
    };

    results[eventName] = {
      current: findEventCount(currentData, eventName),
      previous: findEventCount(previousData, eventName),
    };
  }

  return {
    formStart: {
      value: results.form_start?.current || 0,
      change: calculateChange(
        results.form_start?.current || 0,
        results.form_start?.previous || 0
      ),
    },
    formSubmit: {
      value: results.form_submit?.current || 0,
      change: calculateChange(
        results.form_submit?.current || 0,
        results.form_submit?.previous || 0
      ),
    },
    checkoutInitiated: {
      value: results.checkout_initiated?.current || 0,
      change: calculateChange(
        results.checkout_initiated?.current || 0,
        results.checkout_initiated?.previous || 0
      ),
    },
    purchase: {
      value: results.purchase?.current || 0,
      change: calculateChange(
        results.purchase?.current || 0,
        results.purchase?.previous || 0
      ),
    },
  };
}

/**
 * Obtém sessões por dia
 */
export async function getGA4SessionsByDay(days: number = 7): Promise<
  Array<{ date: string; value: number }>
> {
  const data = await runReport(
    ["sessions"],
    ["date"],
    `${days}daysAgo`,
    "today"
  );

  return (
    data.rows?.map((row) => {
      const dateStr = row.dimensionValues?.[0]?.value || "";
      const formattedDate = `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}`;
      return {
        date: formattedDate,
        value: parseInt(row.metricValues?.[0]?.value || "0"),
      };
    }) || []
  ).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Obtém top páginas
 */
export async function getGA4TopPages(days: number = 7): Promise<
  Array<{ pagina: string; visualizacoes: number }>
> {
  const data = await runReport(
    ["screenPageViews"],
    ["pagePath"],
    `${days}daysAgo`,
    "today"
  );

  return (
    data.rows
      ?.map((row) => ({
        pagina: row.dimensionValues?.[0]?.value || "",
        visualizacoes: parseInt(row.metricValues?.[0]?.value || "0"),
      }))
      .sort((a, b) => b.visualizacoes - a.visualizacoes)
      .slice(0, 5) || []
  );
}

/**
 * Obtém fontes de tráfego
 */
export async function getGA4TrafficSources(days: number = 7): Promise<
  Array<{ fonte: string; sessoes: number; percentual: string }>
> {
  const data = await runReport(
    ["sessions"],
    ["sessionSource"],
    `${days}daysAgo`,
    "today"
  );

  const sources =
    data.rows
      ?.map((row) => ({
        fonte: row.dimensionValues?.[0]?.value || "(direto)",
        sessoes: parseInt(row.metricValues?.[0]?.value || "0"),
      }))
      .sort((a, b) => b.sessoes - a.sessoes)
      .slice(0, 5) || [];

  const total = sources.reduce((sum, s) => sum + s.sessoes, 0);

  return sources.map((s) => ({
    ...s,
    percentual: total > 0 ? `${((s.sessoes / total) * 100).toFixed(1)}%` : "0%",
  }));
}
