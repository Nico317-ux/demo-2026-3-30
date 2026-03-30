import type { ColumnDef } from "@tanstack/react-table";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { DataTable } from "../../components/tables/DataTable";
import { KpiCard } from "../../components/shared/KpiCard";
import { deadStockRawMaterials } from "../../utils/aggregations";
import { formatUSD } from "../../utils/predictiveModel";

type Row = ReturnType<typeof deadStockRawMaterials>[number];

export function DeadStock() {
  const rows = deadStockRawMaterials();
  const flagged = rows.filter((r) => r.dead);
  const deadValue = flagged.reduce((s, r) => s + r.inventoryValue, 0);

  const columns: ColumnDef<Row>[] = [
    { accessorKey: "code", header: "Código" },
    { accessorKey: "description", header: "Material" },
    { accessorKey: "rotationDays", header: "Rotación (días)" },
    {
      accessorKey: "inventoryValue",
      header: "Valor USD",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    {
      accessorKey: "dead",
      header: "¿Crítico?",
      cell: ({ getValue }) => ((getValue() as boolean) ? "Sí" : "No"),
    },
  ];

  return (
    <PageWrapper
      title="Material lento / muerto"
      description="Materia prima con rotación lenta o exceso vs consumo (reglas demo)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Items en banda crítica" value={flagged.length} />
        <KpiCard
          label="Valor de inventario (crítico)"
          value={formatUSD(deadValue)}
        />
        <KpiCard label="Total SKUs MP" value={rows.length} />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
