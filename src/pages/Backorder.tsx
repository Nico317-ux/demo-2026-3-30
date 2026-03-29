import { useMemo } from 'react';
import { ClipboardList, Clock, Package } from 'lucide-react';
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
import { BarChartCard } from '../components/charts/BarChartCard';
import { LineChartCard } from '../components/charts/LineChartCard';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DataTable } from '../components/tables/DataTable';
import { KpiCard } from '../components/shared/KpiCard';
import { backorderMock } from '../data/backorder.mock';
import { backorderAgingBuckets, weeklyBackorderTrendSimulated } from '../utils/aggregations';
import { formatNumber } from '../utils/predictiveModel';
import type { BackorderItem } from '../types';

export function Backorder() {
  const kpis = useMemo(() => {
    const totalUnits = backorderMock.reduce((s, b) => s + b.pendingUnits, 0);
    const agingAvg =
      backorderMock.length === 0
        ? 0
        : Math.round(backorderMock.reduce((s, b) => s + b.daysPending, 0) / backorderMock.length);
    return { totalUnits, agingAvg };
  }, []);

  const top10 = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of backorderMock) {
      map.set(b.product, (map.get(b.product) ?? 0) + b.pendingUnits);
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([product, units]) => ({ product: product.slice(0, 28), units }));
  }, []);

  const agingData = backorderAgingBuckets();
  const weeklyTrend = weeklyBackorderTrendSimulated();

  const columns: ColumnDef<BackorderItem>[] = [
    { accessorKey: 'orderId', header: 'Order' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'pendingUnits', header: 'Pending' },
    { accessorKey: 'daysPending', header: 'Days' },
    { accessorKey: 'priority', header: 'Priority' },
  ];

  return (
    <PageWrapper
      title="Backorder"
      description="Open order lines with aging, volume by product, and simulated weekly trend."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Total units in backorder" value={formatNumber(kpis.totalUnits)} icon={Package} />
        <KpiCard label="Average aging" value={`${kpis.agingAvg} days`} icon={Clock} />
        <KpiCard label="Active lines" value={backorderMock.length} icon={ClipboardList} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard title="Top 10 products by pending units" subtitle="Highest backorder impact">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top10} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis type="number" className="text-[10px]" />
              <YAxis dataKey="product" type="category" width={120} className="text-[10px]" />
              <Tooltip formatter={(v) => formatNumber(Number(v))} />
              <Bar dataKey="units" fill="#0284c7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>

        <BarChartCard title="Aging buckets" subtitle="Distribution by age">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agingData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="label" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      </div>

      <LineChartCard title="Weekly trend (simulated)" subtitle="Units in backorder — demo">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip formatter={(v) => formatNumber(Number(v))} />
            <Bar dataKey="units" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </LineChartCard>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800">Order detail</h3>
        <DataTable data={backorderMock} columns={columns} />
      </div>
    </PageWrapper>
  );
}
