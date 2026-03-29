import type { ColumnDef } from '@tanstack/react-table';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChartCard } from '../../components/charts/BarChartCard';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { DataTable } from '../../components/tables/DataTable';
import { KpiCard } from '../../components/shared/KpiCard';
import { stockCoverageByProduct } from '../../utils/aggregations';

type Row = ReturnType<typeof stockCoverageByProduct>[number];

export function CoverageRisk() {
  const rows = stockCoverageByProduct();
  const lowCov = rows.filter((r) => r.band === 'low').length;
  const excess = rows.filter((r) => r.band === 'excess').length;

  const chart = [...rows]
    .sort((a, b) => a.coverageDays - b.coverageDays)
    .slice(0, 12)
    .map((r) => ({ product: r.product.slice(0, 18), days: r.coverageDays }));

  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'stock', header: 'Stock' },
    { accessorKey: 'salesMonthUnits', header: 'Sales/mo' },
    { accessorKey: 'coverageDays', header: 'Cov. days' },
    { accessorKey: 'band', header: 'Band' },
  ];

  return (
    <PageWrapper
      title="Coverage & stockout risk"
      description="Days of coverage from recent sales velocity — low vs excess inventory bands."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Products &lt;7 days coverage" value={lowCov} />
        <KpiCard label="Products &gt;90 days coverage" value={excess} />
        <KpiCard label="SKUs evaluated" value={rows.length} />
      </div>

      <BarChartCard title="Lowest coverage (days)" subtitle="Top 12 stockout risk">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
            <XAxis dataKey="product" className="text-[10px]" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="days" fill="#e11d48" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BarChartCard>

      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
