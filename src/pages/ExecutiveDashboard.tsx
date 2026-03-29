import { AlertTriangle, Gauge, Package, Percent, Truck } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { KpiCard } from '../components/shared/KpiCard';
import { finishedGoodsInventoryMock } from '../data/inventoryFG.mock';
import { fillRateDemo, globalGrossMarginDemo, stockCoverageByProduct } from '../utils/aggregations';
import { predictiveAlerts, formatUSD } from '../utils/predictiveModel';

export function ExecutiveDashboard() {
  const cov = stockCoverageByProduct();
  const avgCov =
    cov.length === 0 ? 0 : Math.round(cov.reduce((s, r) => s + r.coverageDays, 0) / cov.length);
  const invVal = finishedGoodsInventoryMock.reduce((s, r) => s + r.totalValue, 0);
  const { margin, pct } = globalGrossMarginDemo();
  const fill = fillRateDemo();
  const criticalAlerts = predictiveAlerts.filter((a) => a.severity === 'critical').length;

  return (
    <PageWrapper
      title="Executive dashboard"
      description="Leadership snapshot: consolidated KPIs and critical alerts (demo)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard label="Fill rate (service)" value={`${fill}%`} icon={Gauge} />
        <KpiCard label="Total inventory value" value={formatUSD(invVal)} icon={Package} />
        <KpiCard label="Gross margin (global)" value={formatUSD(margin)} icon={Percent} />
        <KpiCard label="Avg coverage" value={`${avgCov} days`} icon={Truck} />
        <KpiCard label="Critical ML alerts" value={criticalAlerts} icon={AlertTriangle} />
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Financial summary</h3>
        <p className="mt-2 text-sm text-slate-600">
          Gross margin rate on estimated revenue:{' '}
          <span className="font-semibold text-slate-900">{pct.toFixed(1)}%</span>. Figures are derived
          from mock aggregation rules and do not replace audited financials.
        </p>
      </div>
    </PageWrapper>
  );
}
