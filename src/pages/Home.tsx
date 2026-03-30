import { Link } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { navCrossModules, navExtra, navCoreModules } from "../utils/navConfig";
import type { NavItem } from "../utils/navConfig";

// KPI Strip — mock data representative of the business
const kpiData = [
  {
    label: "Ventas del período",
    value: "$2.4M",
    trend: +8.3,
    icon: TrendingUp,
  },
  {
    label: "Galones despachados",
    value: "184,200",
    trend: +5.1,
    icon: TrendingUp,
  },
  {
    label: "Backorders activos",
    value: "37",
    trend: -12.4,
    icon: TrendingDown,
    invertTrend: true,
  },
  {
    label: "Alertas críticas",
    value: "8",
    trend: +2,
    icon: TrendingDown,
    invertTrend: true,
  },
];

function KpiStrip() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {kpiData.map((kpi) => {
        const isGood = kpi.invertTrend ? kpi.trend < 0 : kpi.trend >= 0;
        const trendColor = isGood ? "text-[#22C55E]" : "text-[#DC3920]";
        const TrendIcon = kpi.trend >= 0 ? TrendingUp : TrendingDown;
        return (
          <div
            key={kpi.label}
            className="bg-[#0D1E3D] border border-[#1C3260] rounded-xl p-4 hover:border-[#DC3920]/30 transition-colors"
          >
            <p className="text-xs font-medium text-white/80 uppercase tracking-wider mb-2">
              {kpi.label}
            </p>
            <p className="text-2xl font-semibold text-white tabular-nums">
              {kpi.value}
            </p>
            <div
              className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${trendColor}`}
            >
              <TrendIcon className="w-3 h-3" />
              <span>
                {kpi.trend > 0 ? "+" : ""}
                {kpi.trend}% vs período ant.
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PredictiveBanner() {
  return (
    <div className="bg-linear-to-r from-[#DC3920]/10 to-transparent border border-[#DC3920]/20 rounded-xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-[#DC3920]/15 shrink-0">
          <BrainCircuit className="w-5 h-5 text-[#DC3920]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0A204E]">
            Inteligencia Predictiva
          </p>
          <p className="text-xs text-[#0A204E]/60 mt-0.5">
            8 alertas activas · Última actualización: hace 5 min
          </p>
        </div>
      </div>
      <Link
        to="/predictive"
        className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#F1EEEE]"
        style={{
          background: "linear-gradient(135deg, #DC3920 0%, #B02E18 100%)",
        }}
      >
        Ver alertas
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

function ModuleCard({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className="group bg-white border border-[#0A204E]/10 shadow-sm rounded-xl p-5
        hover:border-[#DC3920]/40 cursor-pointer
        transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-[#0A204E]/5 group-hover:bg-[#DC3920]/10 transition-colors">
          <Icon className="w-5 h-5 text-[#032C61] group-hover:text-[#DC3920] transition-colors" />
        </div>
        <ArrowRight className="w-4 h-4 text-[#0A204E]/30 group-hover:text-[#DC3920] translate-x-0 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-[#0A204E] text-base font-semibold mb-1">
        {item.label}
      </h3>
      {item.description && (
        <p className="text-[#0A204E]/60 text-sm">{item.description}</p>
      )}
    </Link>
  );
}

export function Home() {
  return (
    <div className="space-y-6">
      {/* Zona 1 — KPI Strip */}
      <KpiStrip />

      {/* Zona 2 — Predictive Banner */}
      <PredictiveBanner />

      {/* Zona 3 — Module Grid */}
      <div className="space-y-4">
        <p className="text-[#0A204E]/50 text-xs font-semibold uppercase tracking-widest">
          Módulos
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {navCoreModules.map((n) => (
            <ModuleCard key={n.to} item={n} />
          ))}
        </div>

        <hr className="border-[#0A204E]/10 my-6" />

        <p className="text-[#0A204E]/50 text-xs font-semibold uppercase tracking-widest">
          Análisis
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {navCrossModules.map((n) => (
            <ModuleCard key={n.to} item={n} />
          ))}
        </div>

        <hr className="border-[#0A204E]/10 my-6" />

        <div className="grid gap-3 sm:grid-cols-2">
          {navExtra.map((n) => (
            <ModuleCard key={n.to} item={n} />
          ))}
        </div>
      </div>
    </div>
  );
}
