import { NextResponse } from "next/server";
import { checkConnection } from "@/lib/db";

/**
 * GET /api/health
 * Verifica se o Neon está conectado. Use para validar a variável DATABASE_URL antes de subir para produção.
 */
export async function GET() {
  const db = await checkConnection();
  if (!db.ok) {
    return NextResponse.json(
      { ok: false, database: "error", message: db.error },
      { status: 503 }
    );
  }
  return NextResponse.json({
    ok: true,
    database: "connected",
  });
}
