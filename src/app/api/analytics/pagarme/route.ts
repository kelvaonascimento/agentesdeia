import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * API Pagar.me – lista pedidos para vendas reais no dashboard.
 * Retorna apenas pedidos no período, separando: pagos (confirmados), pendentes, cancelados.
 * Use a chave secreta de PRODUÇÃO para não incluir pedidos de teste.
 */

const PAGARME_BASE = "https://api.pagar.me/core/v5";

type OrderStatus = "pending" | "paid" | "canceled" | "failed";

interface PagarmeItem {
  id?: string;
  code?: string;
  description?: string;
  amount?: number;
  quantity?: number;
}

interface PagarmeCustomer {
  name?: string;
  email?: string;
}

interface PagarmeOrder {
  id: string;
  code?: string;
  status: OrderStatus;
  amount?: number; // em centavos
  currency?: string;
  created_at: string;
  updated_at?: string;
  closed?: boolean;
  metadata?: Record<string, string>;
  customer?: PagarmeCustomer;
  items?: PagarmeItem[];
  charges?: Array<{
    id: string;
    status: string;
    amount?: number;
  }>;
}

interface ListOrdersResponse {
  data: PagarmeOrder[];
  paging: {
    total: number;
    next: string | null;
    previous: string | null;
  };
}

function getAuthHeader(secretKey: string): string {
  const encoded = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");
  return `Basic ${encoded}`;
}

// Usa UTC para since/until para bater com created_at da API Pagar.me (ISO/UTC)
function parseSinceUntil(searchParams: URLSearchParams): { since: Date; until: Date } {
  const sinceParam = searchParams.get("since");
  const untilParam = searchParams.get("until");
  const daysParam = searchParams.get("days");

  if (sinceParam && untilParam) {
    const since = new Date(sinceParam + "T00:00:00.000Z");
    const until = new Date(untilParam + "T23:59:59.999Z");
    if (!Number.isNaN(since.getTime()) && !Number.isNaN(until.getTime())) {
      return applyMinSince(since, until);
    }
  }

  const days = Math.min(365, Math.max(1, parseInt(daysParam || "30", 10) || 30));
  const until = new Date();
  until.setUTCHours(23, 59, 59, 999);
  const since = new Date(until);
  since.setUTCDate(since.getUTCDate() - days);
  since.setUTCHours(0, 0, 0, 0);
  return applyMinSince(since, until);
}

// Garante "desde o dia 3": nunca começar depois de PAGARME_SINCE_DATE (ex.: 2026-02-03)
function applyMinSince(since: Date, until: Date): { since: Date; until: Date } {
  const minSinceStr = process.env.PAGARME_SINCE_DATE?.trim(); // YYYY-MM-DD
  if (!minSinceStr) return { since, until };
  const minSince = new Date(minSinceStr + "T00:00:00.000Z");
  if (Number.isNaN(minSince.getTime())) return { since, until };
  const effectiveSince = since.getTime() > minSince.getTime() ? minSince : since;
  return { since: effectiveSince, until };
}

export async function GET(request: NextRequest) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  const secretKey = process.env.PAGARME_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error: "Pagar.me não configurado",
        details: "Defina PAGARME_SECRET_KEY no .env.local (use a chave de produção para ver só vendas reais).",
      },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const { since, until } = parseSinceUntil(searchParams);

  // Filtrar só pedidos do produto desejado: por código do item OU por valor (ex.: Workshop R$ 167)
  const productCodesEnv = process.env.PAGARME_PRODUCT_CODES ?? "";
  const allowedCodes = productCodesEnv
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter(Boolean);
  const productAmountCents = process.env.PAGARME_PRODUCT_AMOUNT_CENTS
    ? parseInt(process.env.PAGARME_PRODUCT_AMOUNT_CENTS, 10)
    : 0;
  const amountToleranceCents = 100; // 1 real de margem (166–168)
  const amountToleranceReais = 1;
  const valorAlvoReais = productAmountCents / 100;

  // Aceita valor em centavos (16700) ou em reais (167) – a API pode vir nos dois formatos
  function valorBateNoProduto(amount: number): boolean {
    if (productAmountCents <= 0) return false;
    const emCentavos = Math.abs(amount - productAmountCents) <= amountToleranceCents;
    const emReais = Math.abs(amount - valorAlvoReais) <= amountToleranceReais;
    return emCentavos || emReais;
  }

  function getOrderAmount(order: PagarmeOrder): number | undefined {
    if (order.amount != null) return order.amount;
    const items = order.items ?? [];
    const fromItems = items.find((i) => i.amount != null);
    if (fromItems?.amount != null) return fromItems.amount;
    const charge = order.charges?.[0];
    if (charge?.amount != null) return charge.amount;
    return undefined;
  }

  function orderMatchesProduct(order: PagarmeOrder): boolean {
    const items = order.items ?? [];
    if (allowedCodes.length > 0) {
      const matchCode = items.some(
        (item) => item.code && allowedCodes.includes(String(item.code).trim().toLowerCase())
      );
      if (matchCode) return true;
    }
    if (productAmountCents > 0) {
      const matchAmount = items.some(
        (item) => item.amount != null && valorBateNoProduto(item.amount)
      );
      if (matchAmount) return true;
      const amount = getOrderAmount(order);
      if (amount != null && valorBateNoProduto(amount)) return true;
    }
    if (allowedCodes.length === 0 && productAmountCents === 0) return true;
    return false;
  }

  const allOrders: PagarmeOrder[] = [];
  let page = 1;
  const size = 30;
  const maxPages = 20; // evita timeout; ~600 pedidos no máximo

  try {
    while (page <= maxPages) {
      const url = new URL(`${PAGARME_BASE}/orders`);
      url.searchParams.set("page", String(page));
      url.searchParams.set("size", String(size));

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: getAuthHeader(secretKey),
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        let details = text;
        try {
          const j = JSON.parse(text);
          details = j.message || j.error || text;
        } catch {
          // keep text
        }
        return NextResponse.json(
          {
            error: "Erro ao buscar pedidos no Pagar.me",
            details: String(details),
            hint: "Confira se PAGARME_SECRET_KEY é a chave secreta de produção (não teste).",
          },
          { status: res.status === 401 ? 401 : 502 }
        );
      }

      const body = await res.json();
      const data = body.data ?? body;
      const list = Array.isArray(data) ? data : [];

      for (const order of list) {
        allOrders.push(order);
      }

      if (list.length < size) break;
      page += 1;
    }

    // Filtrar por data e produto depois de ter todos os pedidos (evita perder algum por causa da ordem da API)
    const filteredOrders = allOrders.filter((order) => {
      const createdAt = order.created_at ? new Date(order.created_at) : null;
      if (!createdAt || Number.isNaN(createdAt.getTime())) return false;
      if (createdAt < since || createdAt > until) return false;
      return orderMatchesProduct(order);
    });

    let totalReceitaConfirmada = 0;
    const vendasConfirmadas: PagarmeOrder[] = [];
    const vendasPendentes: PagarmeOrder[] = [];
    const vendasCanceladasOuFalhas: PagarmeOrder[] = [];

    const statusLower = (s: string | undefined) => String(s ?? "").toLowerCase();
    // Pagar.me pode vir em centavos (16700) ou reais (167)
    const toReais = (amount: number) =>
      amount >= 1000 && Number.isInteger(amount) ? amount / 100 : amount;

    for (const order of filteredOrders) {
      const amount = getOrderAmount(order) ?? 0;
      const valorReais = toReais(amount);
      const status = statusLower(order.status);

      if (status === "paid") {
        vendasConfirmadas.push(order);
        totalReceitaConfirmada += Number(valorReais);
      } else if (status === "pending") {
        vendasPendentes.push(order);
      } else {
        vendasCanceladasOuFalhas.push(order);
      }
    }

    // Últimas vendas (confirmadas): quem comprou, data, valor, origem (UTM se tiver no metadata)
    const ultimasVendas = vendasConfirmadas
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 50)
      .map((order) => {
        const valorReais = toReais(getOrderAmount(order) ?? 0);
        const meta = order.metadata ?? {};
        const utmSource = meta.utm_source ?? meta.utm_source_lead ?? "";
        const utmCampaign = meta.utm_campaign ?? meta.utm_campaign_lead ?? "";
        const origem =
          utmSource || utmCampaign
            ? [utmSource, utmCampaign].filter(Boolean).join(" · ")
            : "—";
        return {
          id: order.id,
          nome: order.customer?.name ?? "—",
          email: order.customer?.email ?? "—",
          data: order.created_at,
          valor: Math.round(valorReais * 100) / 100,
          origem,
        };
      });

    const filtroProdutoAtivo = allowedCodes.length > 0 || productAmountCents > 0;

    return NextResponse.json({
      success: true,
      data: {
        vendasConfirmadas: vendasConfirmadas.length,
        vendasPendentes: vendasPendentes.length,
        vendasCanceladasOuFalhas: vendasCanceladasOuFalhas.length,
        totalReceitaConfirmada: Math.round(totalReceitaConfirmada * 100) / 100,
        periodo: { since: since.toISOString(), until: until.toISOString() },
        filtroProdutoAtivo,
        ultimasVendas,
        resumo: [
          { label: "Pagas (confirmadas)", value: vendasConfirmadas.length, status: "paid" },
          { label: "Pendentes (ex.: boleto)", value: vendasPendentes.length, status: "pending" },
          { label: "Canceladas/Falha", value: vendasCanceladasOuFalhas.length, status: "other" },
        ],
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Erro Pagar.me:", error);
    return NextResponse.json(
      {
        error: "Erro ao conectar ao Pagar.me",
        details: message,
      },
      { status: 500 }
    );
  }
}
