"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  MousePointer,
  FileText,
  ShoppingCart,
  Eye,
  Clock,
  Percent,
  UserPlus,
  BarChart2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { ChatDrawer } from "@/components/dashboard/ChatDrawer";
import DateRangePicker, {
  DateRange,
  CustomRange,
  MAX_DATE,
  MIN_DATE,
} from "@/components/dashboard/DateRangePicker";
import MetricCard from "@/components/dashboard/MetricCard";
import LineChart from "@/components/dashboard/LineChart";
import BarChart from "@/components/dashboard/BarChart";
import DataTable from "@/components/dashboard/DataTable";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";
import { useMetaAnalytics } from "@/hooks/useMetaAnalytics";
import { usePagarmeSales } from "@/hooks/usePagarmeSales";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Base saudável Meta Ads (referência de tráfego pago sustentável – low ticket)
// Valores de referência para custo + lucro; compare seus resultados contra ela.
export const BASE_SAUDAVEL_META = {
  ctrMin: 1.2,              // CTR mínimo esperado (%) – criativo/audiência engajando
  cplMax: 25,               // CPL máximo saudável (R$) – margem em lead
  cpaMax: 60,               // CPA máximo saudável (R$) – paga custo e gera lucro em low ticket
  leadToPurchaseMin: 8,     // Taxa lead→compra mínima (%) – funil convertendo
} as const;

type TabType = "google" | "meta" | "comparativo" | "leads";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("google");
  const [dateRange, setDateRange] = useState<DateRange>("7");
  const [customRange, setCustomRange] = useState<CustomRange>({
    since: MIN_DATE,
    until: MAX_DATE,
  });
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Simula refresh dos dados
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "X-CB-Dashboard-Logout": "1" },
      });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setLoggingOut(false);
    }
  };

  const tabs = [
    { id: "google" as TabType, label: "Google", icon: TrendingUp },
    { id: "meta" as TabType, label: "Meta", icon: Target },
    { id: "comparativo" as TabType, label: "Comparativo", icon: BarChart2 },
    { id: "leads" as TabType, label: "Leads", icon: UserPlus },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-cb-surface border-b border-cb-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <Image
                  src="/images/logo-cultura-builder.svg"
                  alt="Cultura Builder"
                  width={140}
                  height={47}
                  className="h-8 w-auto"
                />
                <span className="text-cb-text-muted text-sm hidden sm:block">|</span>
                <span className="text-white font-semibold text-sm hidden sm:block">Dashboard</span>
              </div>

              {/* Tabs */}
              <nav className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-cb-orange text-white"
                          : "text-cb-text-muted hover:text-white hover:bg-cb-surface-light"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout */}
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 text-cb-text-muted hover:text-white text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Date Range Picker */}
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            onRefresh={handleRefresh}
            loading={loading}
            customRange={customRange}
            onCustomRangeChange={(since, until) =>
              setCustomRange((prev) => ({ ...prev, since, until }))
            }
          />

          {/* Tab Content */}
          {activeTab === "google" && (
            <GoogleTab
              dateRange={dateRange}
              customRange={customRange}
              loading={loading}
            />
          )}
          {activeTab === "meta" && (
            <MetaTab
              dateRange={dateRange}
              customRange={customRange}
              loading={loading}
            />
          )}
          {activeTab === "comparativo" && (
            <ComparativoTab
              dateRange={dateRange}
              customRange={customRange}
              loading={loading}
            />
          )}
          {activeTab === "leads" && <LeadsTab />}
        </main>

        {/* Assistente: botão do chat só aparece quando a aba Comparativo está ativa */}
        {activeTab === "comparativo" && (
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-30 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full border-0 bg-transparent shadow-lg hover:scale-105 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-cb-orange focus:ring-offset-2 focus:ring-offset-background"
            title="Abrir chat com assistente de tráfego"
            aria-label="Abrir assistente de tráfego"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- PNG robô AI, fundo escuro some com screen */}
            <img
              src="/images/brand/ai-robot.png"
              alt=""
              className="w-full h-full object-contain pointer-events-none rounded-full"
              style={{ mixBlendMode: "screen" }}
            />
          </button>
        )}

        <ChatDrawer
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          onSwitchToComparativo={() => setActiveTab("comparativo")}
          comparativoTabActive={activeTab === "comparativo"}
        />
      </div>
    </AuthGuard>
  );
}

// =====================================================
// Tab: Google (DADOS REAIS DO GA4)
// =====================================================
function GoogleTab({
  dateRange,
  customRange,
  loading: parentLoading,
}: {
  dateRange: DateRange;
  customRange: CustomRange;
  loading: boolean;
}) {
  const days =
    dateRange === "custom"
      ? Math.ceil(
          (new Date(customRange.until).getTime() -
            new Date(customRange.since).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : parseInt(dateRange, 10);
  const effectiveDays = Number.isNaN(days) ? 7 : Math.min(90, Math.max(1, days));
  const { data, loading: gaLoading, error } = useGoogleAnalytics(effectiveDays);
  const { data: pagarmeData, loading: pagarmeLoading } = usePagarmeSales({
    days: effectiveDays,
    since: dateRange === "custom" ? customRange.since : undefined,
    until: dateRange === "custom" ? customRange.until : undefined,
  });
  const loading = parentLoading || gaLoading || pagarmeLoading;

  // Formatar duração média (segundos para mm:ss)
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  // Se houver erro, mostrar mensagem
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Google Analytics</h2>
          <p className="text-cb-text-muted text-sm">Métricas do GA4 - Workshop Agentes IA</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-left max-w-2xl">
          <p className="text-red-400 font-medium mb-2">Erro ao carregar dados do GA4</p>
          <p className="text-cb-text-muted text-sm whitespace-pre-wrap">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Google Analytics</h2>
          <p className="text-cb-text-muted text-sm">
            Métricas do GA4 - Workshop Agentes IA
            {data && <span className="text-green-400 ml-2">● Dados em tempo real</span>}
          </p>
        </div>
      </div>

      {/* Cards de tráfego */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Sessões"
          value={data?.metrics.sessions.value || 0}
          change={data?.metrics.sessions.change}
          icon={Users}
          loading={loading}
        />
        <MetricCard
          title="Usuários"
          value={data?.metrics.users.value || 0}
          change={data?.metrics.users.change}
          icon={Users}
          loading={loading}
        />
        <MetricCard
          title="Pageviews"
          value={data?.metrics.pageviews.value || 0}
          change={data?.metrics.pageviews.change}
          icon={Eye}
          loading={loading}
        />
        <MetricCard
          title="Bounce Rate"
          value={(data?.metrics.bounceRate.value || 0).toFixed(1)}
          change={data?.metrics.bounceRate.change}
          icon={Percent}
          suffix="%"
          loading={loading}
        />
        <MetricCard
          title="Duração Média"
          value={formatDuration(data?.metrics.avgSessionDuration.value || 0)}
          change={data?.metrics.avgSessionDuration.change}
          icon={Clock}
          loading={loading}
        />
      </div>

      {/* Cards de conversão */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="form_start"
          value={data?.events.formStart.value || 0}
          change={data?.events.formStart.change}
          icon={MousePointer}
          loading={loading}
        />
        <MetricCard
          title="form_submit"
          value={data?.events.formSubmit.value || 0}
          change={data?.events.formSubmit.change}
          icon={FileText}
          loading={loading}
        />
        <MetricCard
          title="checkout_initiated"
          value={data?.events.checkoutInitiated.value || 0}
          change={data?.events.checkoutInitiated.change}
          icon={ShoppingCart}
          loading={loading}
        />
        <MetricCard
          title="purchase (eventos GA4)"
          value={data?.events.purchase.value || 0}
          change={data?.events.purchase.change}
          icon={DollarSign}
          loading={loading}
        />
      </div>

      {/* Vendas reais – Pagar.me (só confirmadas; excl. boleto pendente e teste) */}
      <div>
        <h3 className="text-white font-semibold mb-2 text-sm">💰 Vendas reais (Pagar.me)</h3>
        <p className="text-cb-text-muted text-xs mb-3">
          Só pedidos <strong>pagos</strong> no período. Pendentes (ex.: boleto) e cancelados não entram nas confirmadas. Use a chave de produção para não contar testes.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Vendas confirmadas"
            value={pagarmeData?.vendasConfirmadas ?? 0}
            icon={CheckCircle2}
            loading={loading}
          />
          <MetricCard
            title="Pendentes (ex.: boleto)"
            value={pagarmeData?.vendasPendentes ?? 0}
            icon={Clock}
            loading={loading}
          />
          <MetricCard
            title="Receita (confirmadas)"
            value={pagarmeData != null ? `R$ ${pagarmeData.totalReceitaConfirmada.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}
            icon={DollarSign}
            loading={loading}
          />
        </div>
      </div>

      {/* Gráfico */}
      <LineChart
        title="📈 Sessões por Dia"
        data={data?.sessionsByDay || []}
        color="#3B82F6"
        loading={loading}
      />

      {/* Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable
          title="🏆 Top Páginas"
          columns={[
            { key: "pagina", label: "Página" },
            { key: "visualizacoes", label: "Views", align: "right" },
          ]}
          data={data?.topPages || []}
          loading={loading}
        />
        <DataTable
          title="📍 Fontes de Tráfego"
          columns={[
            { key: "fonte", label: "Fonte" },
            { key: "sessoes", label: "Sessões", align: "right" },
            { key: "percentual", label: "%", align: "right" },
          ]}
          data={data?.trafficSources || []}
          loading={loading}
        />
      </div>
    </div>
  );
}

// =====================================================
// Anúncios e criativos (Meta) – para identificar onde se perde a venda
// =====================================================
function AdsAndCreativesSection({
  ads,
  loading,
  fmtCur,
  fmtRate,
}: {
  ads: Array<{
    adId: string;
    adName: string;
    campaignName: string;
    creative: { title: string; body: string; imageUrl: string | null; thumbnailUrl: string | null };
    impressions: number;
    reach: number;
    clicks: number;
    spend: number;
    ctr: number;
    cpc: number;
    cpm: number;
    leads: number;
    purchases: number;
  }>;
  loading: boolean;
  fmtCur: (n: number) => string;
  fmtRate: (n: number) => string;
}) {
  if (loading) {
    return (
      <div className="bg-cb-surface border border-cb-border rounded-xl p-6 animate-pulse">
        <div className="w-64 h-6 bg-cb-surface-light rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-cb-surface-light rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!ads.length) {
    return (
      <div className="bg-cb-surface border border-cb-border rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">🎯 Anúncios e criativos</h3>
        <p className="text-cb-text-muted text-sm">Nenhum anúncio encontrado nas campanhas Low Ticket no período.</p>
      </div>
    );
  }

  const base = BASE_SAUDAVEL_META;

  return (
    <div className="bg-cb-surface border border-cb-border rounded-xl p-6">
      <h3 className="text-white font-semibold mb-2">🎯 Anúncios e criativos</h3>
      <p className="text-cb-text-muted text-sm mb-4">
        Ordenado por gasto (maior primeiro). <strong>Base saudável:</strong> CTR ≥ {base.ctrMin}%, CPL ≤ R$ {base.cplMax}, CPA ≤ R$ {base.cpaMax}, Lead→Compra ≥ {base.leadToPurchaseMin}%. Compare cada anúncio para ver onde melhorar.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cb-border">
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-left">Criativo</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-left">Anúncio</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-left">Campanha</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">Impressões</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">Cliques</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">Gasto (R$)</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">CTR %</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">CPC (R$)</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">CPL (R$)</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">CPA (R$)</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">Leads</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-right">Compras</th>
              <th className="py-3 px-4 text-xs font-semibold text-cb-text-muted uppercase tracking-wider text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => {
              const cpl = ad.leads > 0 ? ad.spend / ad.leads : null;
              const cpa = ad.purchases > 0 ? ad.spend / ad.purchases : null;
              const leadToPurchase = ad.leads > 0 ? (ad.purchases / ad.leads) * 100 : null;
              const ctrOk = ad.ctr >= base.ctrMin;
              const cplOk = cpl != null ? cpl <= base.cplMax : true;
              const cpaOk = cpa != null ? cpa <= base.cpaMax : true;
              const rateOk = leadToPurchase != null ? leadToPurchase >= base.leadToPurchaseMin : true;
              const saudavel = ctrOk && cplOk && cpaOk && rateOk;
              return (
                <tr key={ad.adId} className="border-b border-cb-border/50 hover:bg-cb-surface-light/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-cb-text-secondary">
                    <div className="flex items-start gap-3">
                      {(ad.creative.thumbnailUrl || ad.creative.imageUrl) ? (
                        // eslint-disable-next-line @next/next/no-img-element -- thumbnails da API Meta (URLs externas)
                        <img
                          src={ad.creative.thumbnailUrl || ad.creative.imageUrl || ""}
                          alt=""
                          className="w-14 h-14 object-cover rounded border border-cb-border shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded border border-cb-border bg-cb-surface-light shrink-0 flex items-center justify-center text-cb-text-muted text-xs">—</div>
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate max-w-[220px]" title={ad.creative.title}>
                          {ad.creative.title !== "—" ? ad.creative.title : "Sem título"}
                        </div>
                        <div className="text-cb-text-muted text-xs truncate max-w-[220px]" title={ad.creative.body}>
                          {ad.creative.body !== "—" ? ad.creative.body : "Sem corpo"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary max-w-[160px] truncate" title={ad.adName}>{ad.adName}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary max-w-[160px] truncate" title={ad.campaignName}>{ad.campaignName}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{ad.impressions.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{ad.clicks.toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{fmtCur(ad.spend)}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{fmtRate(ad.ctr)}%</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{fmtCur(ad.cpc)}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{cpl != null ? fmtCur(cpl) : "—"}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{cpa != null ? fmtCur(cpa) : "—"}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{ad.leads}</td>
                  <td className="py-3 px-4 text-sm text-cb-text-secondary text-right">{ad.purchases}</td>
                  <td className="py-3 px-4 text-center">
                    {saudavel ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-xs font-medium whitespace-nowrap">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Saudável
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-medium whitespace-nowrap" title="Ajustar criativo, público ou oferta">
                        <AlertCircle className="w-3.5 h-3.5" /> Atenção
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================================================
// Tab: Meta (DADOS REAIS DA API META – valores sem arredondar)
// =====================================================
function MetaTab({
  dateRange,
  customRange,
  loading: parentLoading,
}: {
  dateRange: DateRange;
  customRange: CustomRange;
  loading: boolean;
}) {
  const metaParams =
    dateRange === "custom"
      ? { since: customRange.since, until: customRange.until }
      : parseInt(dateRange, 10);
  const { data, loading: metaLoading, error } = useMetaAnalytics(metaParams);
  const loading = parentLoading || metaLoading;

  // Formata gastos por dia para o gráfico (data exata, valor sem arredondar)
  const spendChartData =
    data?.spendByDay?.map((d) => ({
      date: format(parseISO(d.date), "dd/MM", { locale: ptBR }),
      value: d.value,
    })) ?? [];

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Meta Ads</h2>
          <p className="text-cb-text-muted text-sm">Métricas do Facebook/Instagram Ads</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-left max-w-2xl">
          <p className="text-red-400 font-medium mb-2">Erro ao carregar dados da Meta</p>
          <p className="text-cb-text-muted text-sm whitespace-pre-wrap">{error}</p>
        </div>
      </div>
    );
  }

  const m = data;
  // Exibição: números exatos da API – sem arredondar (ex: 2,7358)
  // Moeda: 2 decimais; taxas (CTR, CPC, CPM): 4 decimais para não “jogar” valor
  const toBr = (s: string) => s.replace(".", ",");
  const fmtCur = (n: number) => (m ? toBr(Number(n).toFixed(2)) : "0,00");
  const fmtRate = (n: number) => (m ? toBr(Number(n).toFixed(4)) : "0,0000");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Meta Ads</h2>
          <p className="text-cb-text-muted text-sm">
            Métricas do Facebook/Instagram Ads • Apenas campanhas Low Ticket
            {data && <span className="text-green-400 ml-2">● Dados em tempo real</span>}
          </p>
        </div>
      </div>

      {/* Cards de alcance */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Impressões"
          value={m?.impressions ?? 0}
          icon={Eye}
          loading={loading}
        />
        <MetricCard
          title="Alcance"
          value={m?.reach ?? 0}
          icon={Users}
          loading={loading}
        />
        <MetricCard
          title="Cliques"
          value={m?.clicks ?? 0}
          icon={MousePointer}
          loading={loading}
        />
      </div>

      {/* Cards de performance – valores exatos (ex: 2.7358) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="CTR"
          value={m ? fmtRate(m.ctr) : "0,0000"}
          icon={Percent}
          suffix="%"
          loading={loading}
        />
        <MetricCard
          title="CPC"
          value={m ? fmtCur(m.cpc) : "0,00"}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="CPM"
          value={m ? fmtCur(m.cpm) : "0,00"}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
      </div>

      {/* Cards de gasto e conversões */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Gasto Total"
          value={m ? fmtCur(m.spend) : "0,00"}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="Gasto/Dia"
          value={m ? fmtCur(m.spendPerDay) : "0,00"}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="Leads (Pixel)"
          value={m?.leads ?? 0}
          icon={FileText}
          loading={loading}
        />
        <MetricCard
          title="Purchases (Pixel)"
          value={m?.purchases ?? 0}
          icon={ShoppingCart}
          loading={loading}
        />
      </div>

      {/* Gráfico – gastos por dia (dados reais) */}
      <LineChart
        title="💰 Gastos por Dia"
        data={spendChartData}
        color="#E8590C"
        loading={loading}
      />

      {/* Painéis visuais – Meta: gasto e leads por campanha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="📊 Gasto por Campanha (Top 8)"
          data={
            m?.campaigns
              ?.slice()
              .sort((a, b) => b.spend - a.spend)
              .slice(0, 8)
              .map((c) => ({
                name: c.name.length > 25 ? c.name.slice(0, 25) + "…" : c.name,
                value: Math.round(c.spend * 100) / 100,
              })) ?? []
          }
          loading={loading}
        />
        <BarChart
          title="📈 Leads por Campanha (Top 8)"
          data={
            m?.campaigns
              ?.slice()
              .sort((a, b) => b.leads - a.leads)
              .slice(0, 8)
              .map((c) => ({
                name: c.name.length > 25 ? c.name.slice(0, 25) + "…" : c.name,
                value: c.leads,
              })) ?? []
          }
          loading={loading}
        />
      </div>

      {/* Tabela – campanhas que estamos acompanhando no Meta */}
      <DataTable
        title="📋 Campanhas (Meta)"
        columns={[
          { key: "name", label: "Campanha" },
          { key: "impressions", label: "Impressões", align: "right" },
          { key: "clicks", label: "Cliques", align: "right" },
          { key: "spend", label: "Gasto (R$)", align: "right" },
          { key: "leads", label: "Leads", align: "right" },
          { key: "purchases", label: "Compras", align: "right" },
        ]}
        data={
          m?.campaigns?.map((c) => ({
            name: c.name,
            impressions: c.impressions,
            clicks: c.clicks,
            spend: Number(c.spend).toFixed(2).replace(".", ","),
            leads: c.leads,
            purchases: c.purchases,
          })) ?? []
        }
        loading={loading}
      />

      {/* Anúncios e criativos – para ver onde estamos perdendo a venda */}
      <AdsAndCreativesSection ads={m?.ads ?? []} loading={loading} fmtCur={fmtCur} fmtRate={fmtRate} />
    </div>
  );
}

// Textos de orientação por métrica (o que pode ser o problema)
const TEXTOS_ATENCAO = {
  ctr: "CTR baixo costuma indicar **criativo** ou **headline** pouco relevante para o público. Teste novos visuais e textos que falem direto com a dor/desejo da audiência.",
  cpl: "CPL alto pode ser **criativo** que não converte, **audiência** muito fria ou **oferta** pouco clara no anúncio. Afine o targeting ou teste mensagens mais diretas.",
  cpa: "CPA alto indica que o custo por venda está pesado. Revise **oferta**, **página de vendas** e se o **público** é o certo para comprar. Às vezes o problema é a landing ou o momento da oferta.",
  taxa: "Poucos leads viram compra. Melhore a **landing page**, o **momento da oferta** ou o **follow-up**. O funil depois do clique pode estar perdendo a venda.",
} as const;

// =====================================================
// Tab: Comparativo (anúncios do Meta avaliados um a um com base saudável)
// =====================================================
function ComparativoTab({
  dateRange,
  customRange,
  loading: parentLoading,
}: {
  dateRange: DateRange;
  customRange: CustomRange;
  loading: boolean;
}) {
  const metaParams =
    dateRange === "custom"
      ? { since: customRange.since, until: customRange.until }
      : parseInt(dateRange, 10);
  const { data, loading: metaLoading, error } = useMetaAnalytics(metaParams);
  const loading = parentLoading || metaLoading;
  const toBr = (s: string) => s.replace(".", ",");
  const fmtCur = (n: number) => toBr(Number(n).toFixed(2));
  const fmtRate = (n: number) => toBr(Number(n).toFixed(2));
  const base = BASE_SAUDAVEL_META;

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Comparativo</h2>
          <p className="text-cb-text-muted text-sm">Anúncios do Meta avaliados um a um com a base saudável</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-left max-w-2xl">
          <p className="text-red-400 font-medium mb-2">Erro ao carregar dados</p>
          <p className="text-cb-text-muted text-sm whitespace-pre-wrap">{error}</p>
        </div>
      </div>
    );
  }

  const ads = data?.ads ?? [];

  // Resumo para o painel visual: contar saudáveis vs em atenção
  const { countSaudavel, countAtencao, comparativoChartData } = (() => {
    let saudavel = 0;
    let atencao = 0;
    for (const ad of ads) {
      const cpl = ad.leads > 0 ? ad.spend / ad.leads : null;
      const cpa = ad.purchases > 0 ? ad.spend / ad.purchases : null;
      const leadToPurchase = ad.leads > 0 ? (ad.purchases / ad.leads) * 100 : null;
      const ctrOk = ad.ctr >= base.ctrMin;
      const cplOk = cpl != null ? cpl <= base.cplMax : true;
      const cpaOk = cpa != null ? cpa <= base.cpaMax : true;
      const rateOk = leadToPurchase != null ? leadToPurchase >= base.leadToPurchaseMin : true;
      const isSaudavel = ctrOk && cplOk && cpaOk && rateOk;
      if (isSaudavel) saudavel++;
      else atencao++;
    }
    const chartData = [
      { name: "Saudáveis", value: saudavel, color: "#10B981" },
      { name: "Em atenção", value: atencao, color: "#F59E0B" },
    ];
    return { countSaudavel: saudavel, countAtencao: atencao, comparativoChartData: chartData };
  })();

  return (
    <div className="space-y-8" data-capture-comparativo>
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Comparativo</h2>
        <p className="text-cb-text-muted text-sm">
          Anúncios das campanhas <strong>Low Ticket</strong> do Meta trazidos para cá. Cada um é avaliado com a <strong>base saudável</strong> (CTR ≥ {base.ctrMin}%, CPL ≤ R$ {base.cplMax}, CPA ≤ R$ {base.cpaMax}, lead→compra ≥ {base.leadToPurchaseMin}%). Abaixo de cada card: o que precisa de atenção e o que pode ser (criativo, público, oferta, etc.).
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-cb-surface border border-cb-border rounded-xl p-6 animate-pulse">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-cb-surface-light rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-cb-surface-light rounded w-3/4" />
                  <div className="h-4 bg-cb-surface-light rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : ads.length === 0 ? (
        <div className="bg-cb-surface border border-cb-border rounded-xl p-8 text-center">
          <p className="text-cb-text-muted">Nenhum anúncio encontrado nas campanhas Low Ticket no período. Ajuste o período ou confira as campanhas no Meta.</p>
        </div>
      ) : (
        <>
          {/* Painel visual – resumo saudável vs atenção */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MetricCard title="Saudáveis" value={String(countSaudavel)} suffix=" anúncios na base" icon={CheckCircle2} loading={false} />
            <MetricCard title="Em atenção" value={String(countAtencao)} suffix=" anúncios para revisar" icon={AlertCircle} loading={false} />
            <div className="lg:col-span-1">
              <BarChart title="Distribuição (Saudável vs Atenção)" data={comparativoChartData} loading={false} />
            </div>
          </div>

          {ads.map((ad) => {
          const cpl = ad.leads > 0 ? ad.spend / ad.leads : null;
          const cpa = ad.purchases > 0 ? ad.spend / ad.purchases : null;
          const leadToPurchase = ad.leads > 0 ? (ad.purchases / ad.leads) * 100 : null;
          const ctrOk = ad.ctr >= base.ctrMin;
          const cplOk = cpl != null ? cpl <= base.cplMax : true;
          const cpaOk = cpa != null ? cpa <= base.cpaMax : true;
          const rateOk = leadToPurchase != null ? leadToPurchase >= base.leadToPurchaseMin : true;
          const saudavel = ctrOk && cplOk && cpaOk && rateOk;

          const atencao: { titulo: string; texto: string }[] = [];
          if (!ctrOk) atencao.push({ titulo: "CTR abaixo da base", texto: TEXTOS_ATENCAO.ctr });
          if (cpl != null && !cplOk) atencao.push({ titulo: "CPL acima da base", texto: TEXTOS_ATENCAO.cpl });
          if (cpa != null && !cpaOk) atencao.push({ titulo: "CPA acima da base", texto: TEXTOS_ATENCAO.cpa });
          if (leadToPurchase != null && !rateOk) atencao.push({ titulo: "Taxa lead→compra abaixo da base", texto: TEXTOS_ATENCAO.taxa });

          return (
            <div key={ad.adId} className="bg-cb-surface border border-cb-border rounded-xl overflow-hidden">
              {/* Card: imagem + base + métricas */}
              <div className="p-6 flex flex-wrap gap-6">
                {/* Imagem do anúncio */}
                <div className="shrink-0">
                  {(ad.creative.thumbnailUrl || ad.creative.imageUrl) ? (
                    // eslint-disable-next-line @next/next/no-img-element -- thumbnails da API Meta (URLs externas)
                    <img
                      src={ad.creative.thumbnailUrl || ad.creative.imageUrl || ""}
                      alt=""
                      className="w-28 h-28 object-cover rounded-lg border border-cb-border"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-lg border border-cb-border bg-cb-surface-light flex items-center justify-center text-cb-text-muted text-xs text-center px-2">Sem imagem</div>
                  )}
                  <p className="text-cb-text-muted text-xs mt-2 max-w-[112px] truncate" title={ad.adName}>{ad.adName}</p>
                  <p className="text-cb-text-muted text-xs max-w-[112px] truncate" title={ad.campaignName}>{ad.campaignName}</p>
                </div>

                {/* Base saudável */}
                <div className="flex-1 min-w-[200px]">
                  <h4 className="text-white font-semibold text-sm mb-2">Base saudável (referência)</h4>
                  <ul className="text-cb-text-muted text-sm space-y-1">
                    <li>CTR ≥ {base.ctrMin}%</li>
                    <li>CPL ≤ R$ {base.cplMax}</li>
                    <li>CPA ≤ R$ {base.cpaMax}</li>
                    <li>Taxa lead → compra ≥ {base.leadToPurchaseMin}%</li>
                  </ul>
                </div>

                {/* Métricas deste anúncio */}
                <div className="flex-1 min-w-[200px]">
                  <h4 className="text-white font-semibold text-sm mb-2">Métricas deste anúncio</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-cb-text-muted">CTR</span>
                    <span className={ctrOk ? "text-green-400" : "text-amber-400"}>{fmtRate(ad.ctr)}%</span>
                    <span className="text-cb-text-muted">CPL</span>
                    <span className={cplOk ? "text-green-400" : "text-amber-400"}>{cpl != null ? `R$ ${fmtCur(cpl)}` : "—"}</span>
                    <span className="text-cb-text-muted">CPA</span>
                    <span className={cpaOk ? "text-green-400" : "text-amber-400"}>{cpa != null ? `R$ ${fmtCur(cpa)}` : "—"}</span>
                    <span className="text-cb-text-muted">Lead→Compra</span>
                    <span className={rateOk ? "text-green-400" : "text-amber-400"}>{leadToPurchase != null ? `${fmtRate(leadToPurchase)}%` : "—"}</span>
                    <span className="text-cb-text-muted">Impressões</span>
                    <span className="text-cb-text-secondary">{ad.impressions.toLocaleString("pt-BR")}</span>
                    <span className="text-cb-text-muted">Cliques</span>
                    <span className="text-cb-text-secondary">{ad.clicks.toLocaleString("pt-BR")}</span>
                    <span className="text-cb-text-muted">Gasto</span>
                    <span className="text-cb-text-secondary">R$ {fmtCur(ad.spend)}</span>
                    <span className="text-cb-text-muted">Leads</span>
                    <span className="text-cb-text-secondary">{ad.leads}</span>
                    <span className="text-cb-text-muted">Compras</span>
                    <span className="text-cb-text-secondary">{ad.purchases}</span>
                  </div>
                </div>

                {saudavel && (
                  <div className="flex items-center shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-green-400 font-medium text-sm">
                      <CheckCircle2 className="w-5 h-5" /> Saudável
                    </span>
                  </div>
                )}
              </div>

              {/* O que precisa de atenção (com texto por métrica) */}
              {atencao.length > 0 && (
                <div className="border-t border-cb-border bg-amber-500/5 px-6 py-4">
                  <h4 className="text-amber-400 font-semibold text-sm mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> O que precisa de atenção
                  </h4>
                  <ul className="space-y-3">
                    {atencao.map((item, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium text-amber-400/90">{item.titulo}.</span>{" "}
                        <span className="text-cb-text-secondary">{item.texto.split("**").map((part, j) => (j % 2 === 1 ? <strong key={j} className="text-cb-text-secondary font-semibold">{part}</strong> : part))}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
        </>
      )}
    </div>
  );
}

// =====================================================
// Tab: Leads (Intercom)
// =====================================================
function LeadsTab() {
  const [leads, setLeads] = useState<Record<string, string | number>[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leads")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar leads");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setError(null);
          setLeads(data.leads || []);
          setTotal(data.total ?? 0);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Erro ao buscar leads");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Leads</h2>
          <p className="text-cb-text-muted text-sm">Contatos capturados pelo formulário (Intercom)</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-400 mb-2">Erro ao carregar leads</p>
          <p className="text-cb-text-muted text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Leads</h2>
        <p className="text-cb-text-muted text-sm">
          Contatos capturados pelo formulário (Intercom). Total: <strong>{total}</strong>
        </p>
      </div>

      <DataTable
        title="📋 Inscritos (Workshop Agente IA)"
        columns={[
          { key: "name", label: "Nome" },
          { key: "email", label: "E-mail" },
          { key: "phone", label: "Telefone" },
          { key: "created_at", label: "Data", align: "right" },
        ]}
        data={leads}
        loading={loading}
      />
    </div>
  );
}
