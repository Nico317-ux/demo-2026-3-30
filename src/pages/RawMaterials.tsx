import type { ColumnDef } from "@tanstack/react-table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChartCard } from "../components/charts/BarChartCard";
import { PageWrapper } from "../components/layout/PageWrapper";
import { DataTable } from "../components/tables/DataTable";
import { KpiCard } from "../components/shared/KpiCard";
import { rawMaterialsMock } from "../data/rawMaterials.mock";
import { formatNumber, formatUSD } from "../utils/predictiveModel";
import type { RawMaterial } from "../types";

export function RawMaterials() {
  const avgRotation =
    rawMaterialsMock.length === 0
      ? 0
      : Math.round(
          rawMaterialsMock.reduce((s, m) => s + m.rotationDays, 0) /
            rawMaterialsMock.length,
        );
  const slowMoving = rawMaterialsMock.filter((m) => m.rotationDays > 45).length;
  const stockoutRisk = rawMaterialsMock.filter(
    (m) => m.currentStock / Math.max(1, m.monthlyConsumption) < 0.5,
  ).length;

  const chartData = [...rawMaterialsMock]
    .sort((a, b) => b.rotationDays - a.rotationDays)
    .slice(0, 10)
    .map((m) => ({ code: m.code, days: m.rotationDays }));

  const columns: ColumnDef<RawMaterial>[] = [
    { accessorKey: "code", header: "Código" },
    { accessorKey: "description", header: "Material" },
    { accessorKey: "rotationDays", header: "Rotación (días)" },
    { accessorKey: "currentStock", header: "Stock" },
    { accessorKey: "monthlyConsumption", header: "Uso mensual" },
    {
      accessorKey: "inventoryValue",
      header: "Valor USD",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: "supplier", header: "Proveedor" },
  ];

  return (
    <PageWrapper
      title="Rotación de materia prima"
      description="Consumo, días en mano, y enfoque en movimientos lentos o riesgo de stockout."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Rotación promedio (días)"
          value={`${avgRotation} days`}
        />
        <KpiCard label="Artículos de movimiento lento" value={slowMoving} />
        <KpiCard label="Riesgo de stockout" value={stockoutRisk} />
        <KpiCard label="SKUs rastreados" value={rawMaterialsMock.length} />
      </div>

      <BarChartCard
        title="Días de rotación más altos — top 10"
        subtitle="Revisar compras y uso"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
            <XAxis dataKey="code" className="text-[10px]" />
            <YAxis />
            <Tooltip formatter={(v) => formatNumber(Number(v))} />
            <Bar dataKey="days" fill="#0369a1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BarChartCard>

      <DataTable data={rawMaterialsMock} columns={columns} />
    </PageWrapper>
  );
}
