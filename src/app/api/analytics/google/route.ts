import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import {
  getGA4Metrics,
  getGA4Events,
  getGA4SessionsByDay,
  getGA4TopPages,
  getGA4TrafficSources,
} from "@/lib/googleAnalytics";

export async function GET(request: NextRequest) {
  const unauth = requireAuth(request);
  if (unauth) return unauth;

  try {
    // Verificar se as credenciais estão configuradas (Service Account para GA4 Data API)
    const missing: string[] = [];
    if (!process.env.GA4_PROPERTY_ID) missing.push("GA4_PROPERTY_ID");
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
    if (!process.env.GOOGLE_PRIVATE_KEY) missing.push("GOOGLE_PRIVATE_KEY");
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: "Credenciais do GA4 não configuradas em produção",
          details: `Defina na Vercel (Environment Variables): ${missing.join(", ")}. Use a chave da conta de serviço (JSON).`,
        },
        { status: 500 }
      );
    }

    // Obter período da query string
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "7");

    // Buscar todos os dados em paralelo
    const [metrics, events, sessionsByDay, topPages, trafficSources] =
      await Promise.all([
        getGA4Metrics(days),
        getGA4Events(days),
        getGA4SessionsByDay(days),
        getGA4TopPages(days),
        getGA4TrafficSources(days),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        events,
        sessionsByDay,
        topPages,
        trafficSources,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Erro ao buscar dados do GA4:", error);
    const isPermission =
      message.includes("403") ||
      message.includes("PERMISSION_DENIED") ||
      message.includes("permission");
    return NextResponse.json(
      {
        error: "Erro ao buscar dados do Google Analytics",
        details: message,
        hint: isPermission
          ? "Adicione o e-mail da conta de serviço no GA4: Admin → Acesso à propriedade → Adicionar usuário (função Visualizador)."
          : undefined,
      },
      { status: 500 }
    );
  }
}
