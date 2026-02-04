import { NextRequest, NextResponse } from "next/server";
import { validateAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME);

  if (!token?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const isValid = validateAuthToken(token.value);

  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true }, { status: 200 });
}
