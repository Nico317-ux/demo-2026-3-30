import { useMemo } from "react";
import { Boxes, PieChart as PieIcon, Warehouse } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
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
} from "recharts";
import { BarChartCard } from "../components/charts/BarChartCard";
import { PieChartCard } from "../components/charts/PieChartCard";
import { PageWrapper } from "../components/layout/PageWrapper";
import { DataTable } from "../components/tables/DataTable";
import { KpiCard } from "../components/shared/KpiCard";
import {
  finishedGoodsInventoryMock,
  inventoryParetoByValue,
  totalInventoryValue,
} from "../data/inventoryFG.mock";
import { formatNumber, formatUSD } from "../utils/predictiveModel";
import type { FinishedGoodsInventoryRow } from "../types";

const CHART_COLORS = [
  "#DC3920",
  "#F1EEEE",
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#60a5fa",
];

export function InventoryFG() {
  const totalValue = totalInventoryValue();
  const unitsByWh = useMemo(() => {
    const a = finishedGoodsInventoryMock
      .filter((r) => r.warehouse === "A")
      .reduce((s, r) => s + r.units, 0);
    const b = finishedGoodsInventoryMock
      .filter((r) => r.warehouse === "B")
      .reduce((s, r) => s + r.units, 0);
    return { a, b };
  }, []);

  const pareto = inventoryParetoByValue();
  const skuCountTo80 = pareto.filter((p) => p.accPct <= 80).length;
  const pctSkus = Math.round((skuCountTo80 / Math.max(1, pareto.length)) * 100);

  const noMovement = finishedGoodsInventoryMock.filter(
    (r) => r.daysWithoutMovement > 60,
  ).length;

  const pieWarehouse = [
    { name: "Almacén A", value: unitsByWh.a },
    { name: "Almacén B", value: unitsByWh.b },
  ];

  const paretoTop = pareto.slice(0, 8).map((p) => ({
    sku: p.sku,
    value: p.value,
    accPct: Math.round(p.accPct),
  }));

  const columns: ColumnDef<FinishedGoodsInventoryRow>[] = [
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "description", header: "Descripción" },
    { accessorKey: "warehouse", header: "Almacén" },
    { accessorKey: "units", header: "Unidades" },
    {
      accessorKey: "totalValue",
      header: "Valor USD",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: "daysWithoutMovement", header: "Días sin mov." },
  ];

  return (
    <PageWrapper
      title="Inventario de producto terminado"
      description="Stock en almacenes A y B, concentración de valor y vista Pareto."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Valor total de inventario"
          value={formatUSD(totalValue)}
          icon={Boxes}
        />
        <KpiCard
          label="Unidades A vs B"
          value={`${formatNumber(unitsByWh.a)} / ${formatNumber(unitsByWh.b)}`}
          icon={Warehouse}
        />
        <KpiCard
          label="Pareto (~80% del valor)"
          value={`${pctSkus}% SKUs`}
          deltaLabel="primera banda aprox."
          icon={PieIcon}
        />
        <KpiCard label="SKUs sin mov. &gt;60d" value={noMovement} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PieChartCard
          title="Unidades por almacén"
          subtitle="Distribución operativa"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieWarehouse}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pieWarehouse.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F1EEEE",
                  border: "1px solid #032C61",
                  color: "#0A204E",
                }}
                formatter={(v) => formatNumber(Number(v))}
              />
            </PieChart>
          </ResponsiveContainer>
        </PieChartCard>

        <BarChartCard
          title="Pareto — valor por SKU (top)"
          subtitle="Participación acumulada"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paretoTop}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis
                dataKey="sku"
                tick={{ fill: "#0A204E", opacity: 0.7, fontSize: 10 }}
              />
              <YAxis tick={{ fill: "#0A204E", opacity: 0.7 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F1EEEE",
                  border: "1px solid #032C61",
                  color: "#0A204E",
                }}
                formatter={(v) => formatUSD(Number(v))}
              />
              <Bar dataKey="value" fill="#DC3920" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      </div>

      <DataTable data={finishedGoodsInventoryMock} columns={columns} />
    </PageWrapper>
  );
}
