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
import { profitabilityByProduct } from '../../utils/aggregations';
import { formatUSD } from '../../utils/predictiveModel';

type Row = ReturnType<typeof profitabilityByProduct>[number];

export function Profitability() {
  const rows = profitabilityByProduct();
  const lowMargin = rows.filter((r) => r.marginPct < 10).length;

  const chart = [...rows].sort((a, b) => b.grossMarginUSD - a.grossMarginUSD).slice(0, 10);

  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'product', header: 'Product' },
    {
      accessorKey: 'revenueUSD',
      header: 'Revenue',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    {
      accessorKey: 'costUSD',
      header: 'Cost',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    {
      accessorKey: 'grossMarginUSD',
      header: 'Margin $',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: 'marginPct', header: 'Margin %' },
  ];

  return (
    <PageWrapper
      title="Profitability by product"
      description="Approximate gross margin from revenue vs unit cost rollups."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="SKUs with margin &lt;10%" value={lowMargin} />
        <KpiCard
          label="Total gross margin (demo)"
          value={formatUSD(rows.reduce((s, r) => s + r.grossMarginUSD, 0))}
        />
        <KpiCard label="Products" value={rows.length} />
      </div>

      <BarChartCard title="Gross margin contribution (top 10)" subtitle="USD">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
            <XAxis dataKey="sku" className="text-[10px]" />
            <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => formatUSD(Number(v))} />
            <Bar dataKey="grossMarginUSD" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BarChartCard>

      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
