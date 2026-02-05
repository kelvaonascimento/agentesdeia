/**
 * Neon PostgreSQL - Leads
 * Usa DATABASE_URL do .env (apenas a URL; se veio no formato "psql '...'", extraímos a URL)
 */

import { neon } from "@neondatabase/serverless";

function getConnectionString(): string | null {
  let raw = process.env.DATABASE_URL?.trim();
  if (!raw) return null;
  if (raw.startsWith("psql '") && raw.endsWith("'")) {
    raw = raw.slice(6, -1).trim();
  }
  return raw.startsWith("postgresql://") || raw.startsWith("postgres://") ? raw : null;
}

const connectionString = getConnectionString();
const sql = connectionString ? neon(connectionString) : null;

export interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  source: string;
}

/** Insere um lead na tabela leads (Neon). Não lança se DATABASE_URL não estiver definido. */
export async function insertLead(data: {
  name: string;
  email: string;
  phone: string | null;
  source?: string;
}): Promise<void> {
  if (!sql) return;
  try {
    await sql`
      INSERT INTO leads (name, email, phone, source)
      VALUES (${data.name}, ${data.email}, ${data.phone ?? null}, ${data.source ?? "workshop-agente-ia-fev26"})
    `;
  } catch (err) {
    console.error("[Neon] Erro ao inserir lead:", err);
  }
}

/** Lista leads do Neon, mais recentes primeiro. */
export async function getLeads(limit = 150): Promise<{ leads: LeadRow[]; total: number }> {
  if (!sql) return { leads: [], total: 0 };
  try {
    const rows = await sql`
      SELECT id, name, email, COALESCE(phone, '') AS phone, source,
             to_char(created_at AT TIME ZONE 'America/Sao_Paulo', 'DD/MM/YYYY HH24:MI') AS created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    const leads: LeadRow[] = (rows as Record<string, unknown>[]).map((r) => ({
      id: String(r.id),
      name: String(r.name ?? "—"),
      email: String(r.email ?? "—"),
      phone: String(r.phone ?? "—"),
      created_at: String(r.created_at ?? "—"),
      source: String(r.source ?? "—"),
    }));
    const countResult = await sql`SELECT COUNT(*) AS total FROM leads`;
    const total = Number((countResult as Record<string, unknown>[])[0]?.total ?? 0);
    return { leads, total };
  } catch (err) {
    console.error("[Neon] Erro ao listar leads:", err);
    return { leads: [], total: 0 };
  }
}

export function isDbConfigured(): boolean {
  return Boolean(connectionString);
}
