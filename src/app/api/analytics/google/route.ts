import { NextRequest, NextResponse } from "next/server";
import {
  getGA4Metrics,
  getGA4Events,
  getGA4SessionsByDay,
  getGA4TopPages,
  getGA4TrafficSources,
} from "@/lib/googleAnalytics";

export async function GET(request: NextRequest) {
  try {
    // Verificar se as credenciais estão configuradas
    if (!process.env.GA4_PROPERTY_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      return NextResponse.json(
        { error: "Credenciais do GA4 não configuradas" },
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
    console.error("Erro ao buscar dados do GA4:", error);
    return NextResponse.json(
      {
        error: "Erro ao buscar dados do Google Analytics",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
