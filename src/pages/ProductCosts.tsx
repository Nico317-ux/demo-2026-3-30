import type { ColumnDef } from "@tanstack/react-table";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieChartCard } from "../components/charts/PieChartCard";
import { PageWrapper } from "../components/layout/PageWrapper";
import { DataTable } from "../components/tables/DataTable";
import { KpiCard } from "../components/shared/KpiCard";
import { productCostsMock } from "../data/productCosts.mock";
import { formatUSD } from "../utils/predictiveModel";
import type { ProductCost } from "../types";

const COLORS = ["#DC3920", "#F1EEEE", "#6366f1"];

export function ProductCosts() {
  const avgUnitCost =
    productCostsMock.length === 0
      ? 0
      : productCostsMock.reduce((s, c) => s + c.totalCost, 0) /
        productCostsMock.length;
  const topCost = [...productCostsMock]
    .sort((a, b) => b.totalCost - a.totalCost)
    .slice(0, 3);

  const structure = [
    {
      name: "Materiales",
      value: productCostsMock.reduce((s, c) => s + c.materialCost, 0),
    },
    {
      name: "Mano de obra",
      value: productCostsMock.reduce((s, c) => s + c.laborCost, 0),
    },
    {
      name: "Gastos generales",
      value: productCostsMock.reduce((s, c) => s + c.overheadCost, 0),
    },
  ];

  const columns: ColumnDef<ProductCost>[] = [
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "product", header: "Producto" },
    {
      accessorKey: "totalCost",
      header: "Costo unitario",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    {
      accessorKey: "salePrice",
      header: "Precio",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: "marginPct", header: "Margen %" },
  ];

  return (
    <PageWrapper
      title="Costos de producto"
      description="Estructura de materiales / mano de obra / gastos generales y margen por SKU (modelo demo)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Costo unitario promedio"
          value={formatUSD(avgUnitCost)}
        />
        <KpiCard
          label="Productos en catálogo"
          value={productCostsMock.length}
        />
        <KpiCard label="SKU de mayor costo" value={topCost[0]?.sku ?? "—"} />
        <KpiCard
          label="Margen promedio %"
          value={`${(productCostsMock.reduce((s, c) => s + c.marginPct, 0) / productCostsMock.length).toFixed(1)}%`}
        />
      </div>

      <PieChartCard
        title="Estructura de costos"
        subtitle="Participación por componente"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={structure}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {structure.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatUSD(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
      </PieChartCard>

      <DataTable data={productCostsMock} columns={columns} />
    </PageWrapper>
  );
}
