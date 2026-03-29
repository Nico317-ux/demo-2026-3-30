import type { ColumnDef } from '@tanstack/react-table';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChartCard } from '../components/charts/PieChartCard';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DataTable } from '../components/tables/DataTable';
import { KpiCard } from '../components/shared/KpiCard';
import { productCostsMock } from '../data/productCosts.mock';
import { formatUSD } from '../utils/predictiveModel';
import type { ProductCost } from '../types';

const COLORS = ['#0284c7', '#6366f1', '#f97316'];

export function ProductCosts() {
  const avgUnitCost =
    productCostsMock.length === 0
      ? 0
      : productCostsMock.reduce((s, c) => s + c.totalCost, 0) / productCostsMock.length;
  const topCost = [...productCostsMock].sort((a, b) => b.totalCost - a.totalCost).slice(0, 3);

  const structure = [
    { name: 'Materials', value: productCostsMock.reduce((s, c) => s + c.materialCost, 0) },
    { name: 'Labor', value: productCostsMock.reduce((s, c) => s + c.laborCost, 0) },
    { name: 'Overhead', value: productCostsMock.reduce((s, c) => s + c.overheadCost, 0) },
  ];

  const columns: ColumnDef<ProductCost>[] = [
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'product', header: 'Product' },
    {
      accessorKey: 'totalCost',
      header: 'Unit cost',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    {
      accessorKey: 'salePrice',
      header: 'Price',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: 'marginPct', header: 'Margin %' },
  ];

  return (
    <PageWrapper
      title="Product costs"
      description="Materials / labor / overhead structure and margin by SKU (demo model)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Average unit cost" value={formatUSD(avgUnitCost)} />
        <KpiCard label="Products in catalog" value={productCostsMock.length} />
        <KpiCard label="Highest cost SKU" value={topCost[0]?.sku ?? '—'} />
        <KpiCard
          label="Avg margin %"
          value={`${(productCostsMock.reduce((s, c) => s + c.marginPct, 0) / productCostsMock.length).toFixed(1)}%`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PieChartCard title="Aggregated cost structure" subtitle="Share by component">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={structure} dataKey="value" nameKey="name" outerRadius={100} label>
                {structure.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </PieChartCard>

        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Top unit costs</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {topCost.map((c) => (
              <li key={c.sku} className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <span className="truncate">{c.product}</span>
                <span className="font-medium tabular-nums">{formatUSD(c.totalCost)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <DataTable data={productCostsMock} columns={columns} />
    </PageWrapper>
  );
}
