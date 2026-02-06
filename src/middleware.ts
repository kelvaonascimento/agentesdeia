import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "cb_auth_token";

/** Token válido por no máximo 8 dias (alinhado a lib/auth.ts) */
const TOKEN_MAX_AGE_MS = 8 * 24 * 60 * 60 * 1000;

/**
 * Valida o token de auth no Edge (sem Buffer).
 * Deve ser consistente com lib/auth.ts (createAuthToken / validateAuthToken).
 */
function validateTokenInEdge(token: string, secret: string): boolean {
  try {
    const decoded = JSON.parse(atob(token));
    if (decoded.authenticated !== true || decoded.secret !== secret) return false;
    const age = Date.now() - (decoded.timestamp ?? 0);
    return age >= 0 && age <= TOKEN_MAX_AGE_MS;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas que exigem autenticação (servidor): dashboard
  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isProtected) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const secret = process.env.AUTH_SECRET ?? "";

    if (!token || !secret || !validateTokenInEdge(token, secret)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Se já autenticado e tentando acessar /login, redirecionar para dashboard
  if (pathname === "/login") {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const secret = process.env.AUTH_SECRET ?? "";
    if (token && secret && validateTokenInEdge(token, secret)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
