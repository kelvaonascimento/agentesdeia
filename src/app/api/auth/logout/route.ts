import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

/** Header enviado só pelo nosso dashboard (mitiga CSRF no logout) */
const DASHBOARD_LOGOUT_HEADER = "x-cb-dashboard-logout";

export async function POST(request: NextRequest) {
  if (request.headers.get(DASHBOARD_LOGOUT_HEADER) !== "1") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }
  const response = NextResponse.json(
    { success: true, message: "Logout realizado com sucesso" },
    { status: 200 }
  );

  // Remover cookie
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Expira imediatamente
    path: "/",
  });

  return response;
}
