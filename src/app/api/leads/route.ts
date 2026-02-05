import { NextResponse } from "next/server";
import { getLeads as getLeadsFromNeon, isDbConfigured } from "@/lib/db";

const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const INTERCOM_API_URL = "https://api.intercom.io";
const INTERCOM_VERSION = "2.14";
const WORKSHOP_TAG = "workshop-agente-ia-fev26";

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  role?: string;
}

/** Busca o ID da tag do workshop no Intercom */
async function getWorkshopTagId(): Promise<string | null> {
  const res = await fetch(`${INTERCOM_API_URL}/tags`, {
    headers: {
      Authorization: `Bearer ${INTERCOM_TOKEN}`,
      Accept: "application/json",
      "Intercom-Version": INTERCOM_VERSION,
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const tag = data.data?.find((t: { name: string }) => t.name === WORKSHOP_TAG);
  return tag?.id ?? null;
}

/**
 * GET /api/leads
 * Só inscritos das LPs do workshop:
 * - Se DATABASE_URL: lê do Neon (só quem passou pelo formulário).
 * - Se Intercom: filtra por tag workshop-agente-ia-fev26 (só inscritos do workshop).
 */
export async function GET() {
  try {
    if (isDbConfigured()) {
      const { leads, total } = await getLeadsFromNeon(150);
      return NextResponse.json({ leads, total });
    }

    if (!INTERCOM_TOKEN) {
      return NextResponse.json(
        { error: "INTERCOM_ACCESS_TOKEN não configurado" },
        { status: 503 }
      );
    }

    const tagId = await getWorkshopTagId();
    if (!tagId) {
      return NextResponse.json({ leads: [], total: 0 });
    }

    const response = await fetch(`${INTERCOM_API_URL}/contacts/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${INTERCOM_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Intercom-Version": INTERCOM_VERSION,
      },
      body: JSON.stringify({
        query: {
          field: "tag_id",
          operator: "=",
          value: tagId,
        },
        pagination: { per_page: 150 },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[Intercom] Erro ao buscar leads:", response.status, text);
      return NextResponse.json(
        { error: "Falha ao buscar leads no Intercom" },
        { status: 502 }
      );
    }

    const json = await response.json();
    const contacts = json.data || [];
    const totalCount = json.total_count ?? contacts.length;

    const leads: LeadRow[] = contacts.map((c: Record<string, unknown>) => ({
      id: String(c.id ?? ""),
      name: String(c.name ?? "—"),
      email: String(c.email ?? "—"),
      phone: String(c.phone ?? "—"),
      created_at: formatDate(c.created_at),
      role: String(c.role ?? "lead"),
    }));

    return NextResponse.json({
      leads,
      total: totalCount,
    });
  } catch (error) {
    console.error("[API leads]", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar leads" },
      { status: 500 }
    );
  }
}

function formatDate(value: unknown): string {
  if (typeof value !== "number") return "—";
  try {
    const d = new Date(value * 1000);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}
