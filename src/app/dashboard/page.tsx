"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  BarChart3,
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
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import DateRangePicker, { DateRange } from "@/components/dashboard/DateRangePicker";
import MetricCard from "@/components/dashboard/MetricCard";
import LineChart from "@/components/dashboard/LineChart";
import BarChart from "@/components/dashboard/BarChart";
import DataTable from "@/components/dashboard/DataTable";
import {
  generateVisitorsData,
  generateSpendData,
  getComparisonData,
  getOverviewMetrics,
  getMetaMetrics,
  getTopPages as getMockTopPages,
} from "@/lib/mockData";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

type TabType = "geral" | "google" | "meta" | "leads";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("geral");
  const [dateRange, setDateRange] = useState<DateRange>("7");
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Simula refresh dos dados
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  // Atualiza ao mudar período
  useEffect(() => {
    handleRefresh();
  }, [dateRange]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setLoggingOut(false);
    }
  };

  const tabs = [
    { id: "geral" as TabType, label: "Visão Geral", icon: BarChart3 },
    { id: "google" as TabType, label: "Google", icon: TrendingUp },
    { id: "meta" as TabType, label: "Meta", icon: Target },
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
          />

          {/* Tab Content */}
          {activeTab === "geral" && (
            <VisaoGeralTab dateRange={dateRange} loading={loading} />
          )}
          {activeTab === "google" && (
            <GoogleTab dateRange={dateRange} loading={loading} />
          )}
          {activeTab === "meta" && (
            <MetaTab dateRange={dateRange} loading={loading} />
          )}
          {activeTab === "leads" && <LeadsTab />}
        </main>
      </div>
    </AuthGuard>
  );
}

// =====================================================
// Tab: Visão Geral
// =====================================================
function VisaoGeralTab({
  dateRange,
  loading,
}: {
  dateRange: DateRange;
  loading: boolean;
}) {
  const metrics = getOverviewMetrics();
  const visitorsData = generateVisitorsData(parseInt(dateRange));
  const comparisonData = getComparisonData();
  const topPages = getMockTopPages();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Visão Geral</h2>
        <p className="text-cb-text-muted text-sm">
          Métricas combinadas do Google Analytics e Meta Ads
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Visitantes"
          value={metrics.visitors.value}
          change={metrics.visitors.change}
          icon={Users}
          loading={loading}
        />
        <MetricCard
          title="Leads"
          value={metrics.leads.value}
          change={metrics.leads.change}
          icon={FileText}
          loading={loading}
        />
        <MetricCard
          title="Vendas"
          value={metrics.sales.value}
          change={metrics.sales.change}
          icon={ShoppingCart}
          loading={loading}
        />
        <MetricCard
          title="Gasto Total"
          value={metrics.spend.value}
          change={metrics.spend.change}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
      </div>

      {/* Cards de métricas calculadas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="CPL (Custo por Lead)"
          value={metrics.cpl.value.toFixed(2)}
          change={metrics.cpl.change}
          icon={Target}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="CPA (Custo por Aquisição)"
          value={metrics.cpa.value.toFixed(2)}
          change={metrics.cpa.change}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="ROAS"
          value={metrics.roas.value.toFixed(2)}
          change={metrics.roas.change}
          icon={TrendingUp}
          loading={loading}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="📈 Visitantes por Dia"
          data={visitorsData}
          loading={loading}
        />
        <BarChart
          title="📊 Google vs Meta"
          data={comparisonData}
          loading={loading}
        />
      </div>

      {/* Tabela */}
      <DataTable
        title="🏆 Top 5 Páginas"
        columns={[
          { key: "pagina", label: "Página" },
          { key: "visualizacoes", label: "Visualizações", align: "right" },
          { key: "conversoes", label: "Conversões", align: "right" },
        ]}
        data={topPages}
        loading={loading}
      />
    </div>
  );
}

// =====================================================
// Tab: Google (DADOS REAIS DO GA4)
// =====================================================
function GoogleTab({
  dateRange,
}: {
  dateRange: DateRange;
  loading: boolean;
}) {
  const { data, loading: gaLoading, error } = useGoogleAnalytics(parseInt(dateRange));

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
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-400 mb-2">Erro ao carregar dados do GA4</p>
          <p className="text-cb-text-muted text-sm">{error}</p>
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
          loading={gaLoading}
        />
        <MetricCard
          title="Usuários"
          value={data?.metrics.users.value || 0}
          change={data?.metrics.users.change}
          icon={Users}
          loading={gaLoading}
        />
        <MetricCard
          title="Pageviews"
          value={data?.metrics.pageviews.value || 0}
          change={data?.metrics.pageviews.change}
          icon={Eye}
          loading={gaLoading}
        />
        <MetricCard
          title="Bounce Rate"
          value={(data?.metrics.bounceRate.value || 0).toFixed(1)}
          change={data?.metrics.bounceRate.change}
          icon={Percent}
          suffix="%"
          loading={gaLoading}
        />
        <MetricCard
          title="Duração Média"
          value={formatDuration(data?.metrics.avgSessionDuration.value || 0)}
          change={data?.metrics.avgSessionDuration.change}
          icon={Clock}
          loading={gaLoading}
        />
      </div>

      {/* Cards de conversão */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="form_start"
          value={data?.events.formStart.value || 0}
          change={data?.events.formStart.change}
          icon={MousePointer}
          loading={gaLoading}
        />
        <MetricCard
          title="form_submit"
          value={data?.events.formSubmit.value || 0}
          change={data?.events.formSubmit.change}
          icon={FileText}
          loading={gaLoading}
        />
        <MetricCard
          title="checkout_initiated"
          value={data?.events.checkoutInitiated.value || 0}
          change={data?.events.checkoutInitiated.change}
          icon={ShoppingCart}
          loading={gaLoading}
        />
        <MetricCard
          title="purchase"
          value={data?.events.purchase.value || 0}
          change={data?.events.purchase.change}
          icon={DollarSign}
          loading={gaLoading}
        />
      </div>

      {/* Gráfico */}
      <LineChart
        title="📈 Sessões por Dia"
        data={data?.sessionsByDay || []}
        color="#3B82F6"
        loading={gaLoading}
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
          loading={gaLoading}
        />
        <DataTable
          title="📍 Fontes de Tráfego"
          columns={[
            { key: "fonte", label: "Fonte" },
            { key: "sessoes", label: "Sessões", align: "right" },
            { key: "percentual", label: "%", align: "right" },
          ]}
          data={data?.trafficSources || []}
          loading={gaLoading}
        />
      </div>
    </div>
  );
}

// =====================================================
// Tab: Meta
// =====================================================
function MetaTab({
  dateRange,
  loading,
}: {
  dateRange: DateRange;
  loading: boolean;
}) {
  const metrics = getMetaMetrics();
  const spendData = generateSpendData(parseInt(dateRange));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Meta Ads</h2>
        <p className="text-cb-text-muted text-sm">
          Métricas do Facebook/Instagram Ads
        </p>
      </div>

      {/* Cards de alcance */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Impressões"
          value={metrics.impressions.value}
          change={metrics.impressions.change}
          icon={Eye}
          loading={loading}
        />
        <MetricCard
          title="Alcance"
          value={metrics.reach.value}
          change={metrics.reach.change}
          icon={Users}
          loading={loading}
        />
        <MetricCard
          title="Cliques"
          value={metrics.clicks.value}
          change={metrics.clicks.change}
          icon={MousePointer}
          loading={loading}
        />
      </div>

      {/* Cards de performance */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="CTR"
          value={metrics.ctr.value.toFixed(2)}
          change={metrics.ctr.change}
          icon={Percent}
          suffix="%"
          loading={loading}
        />
        <MetricCard
          title="CPC"
          value={metrics.cpc.value.toFixed(2)}
          change={metrics.cpc.change}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="CPM"
          value={metrics.cpm.value.toFixed(2)}
          change={metrics.cpm.change}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
      </div>

      {/* Cards de gasto */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Gasto Total"
          value={metrics.spend.value}
          change={metrics.spend.change}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="Gasto/Dia"
          value={metrics.spendPerDay.value.toFixed(2)}
          change={metrics.spendPerDay.change}
          icon={DollarSign}
          prefix="R$ "
          loading={loading}
        />
        <MetricCard
          title="Leads (Pixel)"
          value={metrics.leads.value}
          change={metrics.leads.change}
          icon={FileText}
          loading={loading}
        />
        <MetricCard
          title="Purchases (Pixel)"
          value={metrics.purchases.value}
          change={metrics.purchases.change}
          icon={ShoppingCart}
          loading={loading}
        />
      </div>

      {/* Gráfico */}
      <LineChart
        title="💰 Gastos por Dia"
        data={spendData}
        color="#E8590C"
        loading={loading}
      />
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
    setLoading(true);
    setError(null);
    fetch("/api/leads")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar leads");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setLeads(data.leads || []);
          setTotal(data.total ?? 0);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Erro ao buscar leads");
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
