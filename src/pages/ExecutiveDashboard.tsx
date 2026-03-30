import { AlertTriangle, Gauge, Package, Percent, Truck } from "lucide-react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { KpiCard } from "../components/shared/KpiCard";
import { finishedGoodsInventoryMock } from "../data/inventoryFG.mock";
import {
  fillRateDemo,
  globalGrossMarginDemo,
  stockCoverageByProduct,
} from "../utils/aggregations";
import { predictiveAlerts, formatUSD } from "../utils/predictiveModel";

export function ExecutiveDashboard() {
  const cov = stockCoverageByProduct();
  const avgCov =
    cov.length === 0
      ? 0
      : Math.round(cov.reduce((s, r) => s + r.coverageDays, 0) / cov.length);
  const invVal = finishedGoodsInventoryMock.reduce(
    (s, r) => s + r.totalValue,
    0,
  );
  const { margin, pct } = globalGrossMarginDemo();
  const fill = fillRateDemo();
  const criticalAlerts = predictiveAlerts.filter(
    (a) => a.severity === "critical",
  ).length;

  return (
    <PageWrapper
      title="Dashboard ejecutivo"
      description="Instantánea de liderazgo: KPIs consolidados y alertas críticas (demo)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard label="Tasa de servicio" value={`${fill}%`} icon={Gauge} />
        <KpiCard
          label="Valor total inventario"
          value={formatUSD(invVal)}
          icon={Package}
        />
        <KpiCard
          label="Margen bruto (global)"
          value={formatUSD(margin)}
          icon={Percent}
        />
        <KpiCard
          label="Cobertura promedio"
          value={`${avgCov} días`}
          icon={Truck}
        />
        <KpiCard
          label="Alertas críticas ML"
          value={criticalAlerts}
          icon={AlertTriangle}
        />
      </div>

      <div className="rounded-xl border border-[#0A204E]/10 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0A204E]">
          Resumen financiero
        </h3>
        <p className="text-[#0A204E]/55 text-sm mt-1">
          Tasa de margen bruto sobre ingresos estimados:{" "}
          <span className="font-semibold text-[#0A204E]">
            {pct.toFixed(1)}%
          </span>
          . Las cifras se derivan de reglas de agregación simuladas y no
          reemplazan los estados financieros auditados.
        </p>
      </div>
    </PageWrapper>
  );
}
