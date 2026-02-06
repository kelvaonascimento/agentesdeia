/**
 * Autenticação - Dashboard Interno
 * Cultura Builder
 */

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Credenciais (obrigatórias via .env / Vercel; sem fallback para não expor segredos)
const VALID_USERNAME = process.env.ADMIN_USERNAME ?? "";
const VALID_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const AUTH_COOKIE_NAME = "cb_auth_token";
const AUTH_SECRET = process.env.AUTH_SECRET ?? "";

/**
 * Valida as credenciais de login
 */
export function validateCredentials(username: string, password: string): boolean {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}

/** Token válido por no máximo 8 dias (cookie é 7 dias; margem para clock skew) */
const TOKEN_MAX_AGE_MS = 8 * 24 * 60 * 60 * 1000;

/**
 * Cria um token simples de autenticação
 */
export function createAuthToken(): string {
  const payload = {
    authenticated: true,
    timestamp: Date.now(),
    secret: AUTH_SECRET,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

/**
 * Valida o token de autenticação (inclui expiração)
 */
export function validateAuthToken(token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    if (decoded.authenticated !== true || decoded.secret !== AUTH_SECRET) return false;
    const age = Date.now() - (decoded.timestamp ?? 0);
    return age >= 0 && age <= TOKEN_MAX_AGE_MS;
  } catch {
    return false;
  }
}

/**
 * Verifica se o usuário está autenticado (server-side)
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!token?.value) {
    return false;
  }
  
  return validateAuthToken(token.value);
}

/**
 * Para uso em API routes: exige autenticação.
 * Retorna uma NextResponse 401 se não autenticado; caso contrário retorna null.
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token || !validateAuthToken(token)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  return null;
}

/**
 * Nome do cookie de autenticação
 */
export { AUTH_COOKIE_NAME };
