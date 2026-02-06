import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * API Pagar.me – lista pedidos para vendas reais no dashboard.
 * Retorna apenas pedidos no período, separando: pagos (confirmados), pendentes, cancelados.
 * Use a chave secreta de PRODUÇÃO para não incluir pedidos de teste.
 */

const PAGARME_BASE = "https://api.pagar.me/core/v5";

type OrderStatus = "pending" | "paid" | "canceled" | "failed";

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

function parseSinceUntil(searchParams: URLSearchParams): { since: Date; until: Date } {
  const sinceParam = searchParams.get("since");
  const untilParam = searchParams.get("until");
  const daysParam = searchParams.get("days");

  if (sinceParam && untilParam) {
    const since = new Date(sinceParam);
    const until = new Date(untilParam);
    if (!Number.isNaN(since.getTime()) && !Number.isNaN(until.getTime())) {
      return { since, until };
    }
  }

  const days = Math.min(365, Math.max(1, parseInt(daysParam || "7", 10) || 7));
  const until = new Date();
  const since = new Date(until);
  since.setDate(since.getDate() - days);
  return { since, until };
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
        const createdAt = order.created_at ? new Date(order.created_at) : null;
        if (createdAt && !Number.isNaN(createdAt.getTime())) {
          if (createdAt >= since && createdAt <= until) {
            allOrders.push(order);
          }
        }
      }

      if (list.length < size) break;
      page += 1;
    }

    let totalReceitaConfirmada = 0;
    const vendasConfirmadas: PagarmeOrder[] = [];
    const vendasPendentes: PagarmeOrder[] = [];
    const vendasCanceladasOuFalhas: PagarmeOrder[] = [];

    for (const order of allOrders) {
      const amount = order.amount ?? 0;
      const valorReais = amount / 100;

      if (order.status === "paid") {
        vendasConfirmadas.push(order);
        totalReceitaConfirmada += valorReais;
      } else if (order.status === "pending") {
        vendasPendentes.push(order);
      } else {
        vendasCanceladasOuFalhas.push(order);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        vendasConfirmadas: vendasConfirmadas.length,
        vendasPendentes: vendasPendentes.length,
        vendasCanceladasOuFalhas: vendasCanceladasOuFalhas.length,
        totalReceitaConfirmada: Math.round(totalReceitaConfirmada * 100) / 100,
        periodo: { since: since.toISOString(), until: until.toISOString() },
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
