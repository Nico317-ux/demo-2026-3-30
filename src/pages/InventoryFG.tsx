import { useMemo } from 'react';
import { Boxes, PieChart as PieIcon, Warehouse } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChartCard } from '../components/charts/BarChartCard';
import { PieChartCard } from '../components/charts/PieChartCard';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DataTable } from '../components/tables/DataTable';
import { KpiCard } from '../components/shared/KpiCard';
import {
  finishedGoodsInventoryMock,
  inventoryParetoByValue,
  totalInventoryValue,
} from '../data/inventoryFG.mock';
import { formatNumber, formatUSD } from '../utils/predictiveModel';
import type { FinishedGoodsInventoryRow } from '../types';

const CHART_COLORS = ['#0284c7', '#6366f1', '#a855f7', '#ec4899', '#f97316', '#eab308'];

export function InventoryFG() {
  const totalValue = totalInventoryValue();
  const unitsByWh = useMemo(() => {
    const a = finishedGoodsInventoryMock
      .filter((r) => r.warehouse === 'A')
      .reduce((s, r) => s + r.units, 0);
    const b = finishedGoodsInventoryMock
      .filter((r) => r.warehouse === 'B')
      .reduce((s, r) => s + r.units, 0);
    return { a, b };
  }, []);

  const pareto = inventoryParetoByValue();
  const skuCountTo80 = pareto.filter((p) => p.accPct <= 80).length;
  const pctSkus = Math.round((skuCountTo80 / Math.max(1, pareto.length)) * 100);

  const noMovement = finishedGoodsInventoryMock.filter((r) => r.daysWithoutMovement > 60).length;

  const pieWarehouse = [
    { name: 'Warehouse A', value: unitsByWh.a },
    { name: 'Warehouse B', value: unitsByWh.b },
  ];

  const paretoTop = pareto.slice(0, 8).map((p) => ({
    sku: p.sku,
    value: p.value,
    accPct: Math.round(p.accPct),
  }));

  const columns: ColumnDef<FinishedGoodsInventoryRow>[] = [
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'warehouse', header: 'Wh.' },
    { accessorKey: 'units', header: 'Units' },
    {
      accessorKey: 'totalValue',
      header: 'Value USD',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: 'daysWithoutMovement', header: 'Days idle' },
  ];

  return (
    <PageWrapper
      title="Finished goods inventory"
      description="Stock in warehouses A and B, value concentration, and Pareto view."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total inventory value" value={formatUSD(totalValue)} icon={Boxes} />
        <KpiCard
          label="Units · A vs B"
          value={`${formatNumber(unitsByWh.a)} / ${formatNumber(unitsByWh.b)}`}
          icon={Warehouse}
        />
        <KpiCard
          label="Pareto (~80% value)"
          value={`${pctSkus}% SKUs`}
          deltaLabel="approx. first band"
          icon={PieIcon}
        />
        <KpiCard label="SKUs idle &gt;60d" value={noMovement} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PieChartCard title="Units by warehouse" subtitle="Operational split">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieWarehouse} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieWarehouse.map((entry, i) => (
                  <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatNumber(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        </PieChartCard>

        <BarChartCard title="Pareto — value by SKU (top)" subtitle="Cumulative share">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paretoTop}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="sku" className="text-[10px]" />
              <YAxis />
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="value" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      </div>

      <DataTable data={finishedGoodsInventoryMock} columns={columns} />
    </PageWrapper>
  );
}
