/**
 * Autenticação - Dashboard Interno
 * Cultura Builder
 */

import { cookies } from "next/headers";

// Credenciais (vêm do .env.local)
const VALID_USERNAME = process.env.ADMIN_USERNAME || "Cultura";
const VALID_PASSWORD = process.env.ADMIN_PASSWORD || "Builder2026!";
const AUTH_COOKIE_NAME = "cb_auth_token";
const AUTH_SECRET = process.env.AUTH_SECRET || "cultura-builder-secret-key-2026";

/**
 * Valida as credenciais de login
 */
export function validateCredentials(username: string, password: string): boolean {
  return username === VALID_USERNAME && password === VALID_PASSWORD;
}

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
 * Valida o token de autenticação
 */
export function validateAuthToken(token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    return decoded.authenticated === true && decoded.secret === AUTH_SECRET;
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
 * Nome do cookie de autenticação
 */
export { AUTH_COOKIE_NAME };
