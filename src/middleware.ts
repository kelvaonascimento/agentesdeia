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

/** Verifica se a rota é uma API que exige autenticação (bloqueio no Edge antes do handler). */
function isProtectedApi(pathname: string): boolean {
  if (pathname === "/api/leads" || pathname === "/api/chat") return true;
  return pathname.startsWith("/api/analytics/");
}

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const secret = process.env.AUTH_SECRET ?? "";
  return !!(token && secret && validateTokenInEdge(token, secret));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Páginas protegidas: redirecionar para /login
  const protectedPaths = ["/dashboard"];
  const isProtectedPage = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isProtectedPage) {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // APIs protegidas: retornar 401 sem executar o handler
  if (isProtectedApi(pathname)) {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Se já autenticado e tentando acessar /login, redirecionar para dashboard
  if (pathname === "/login") {
    if (isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/api/analytics/:path*",
    "/api/leads",
    "/api/chat",
  ],
};
