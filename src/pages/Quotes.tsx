import type { ColumnDef } from "@tanstack/react-table";
import { PageWrapper } from "../components/layout/PageWrapper";
import { DataTable } from "../components/tables/DataTable";
import { KpiCard } from "../components/shared/KpiCard";
import { quotesMock } from "../data/quotes.mock";
import { formatUSD } from "../utils/predictiveModel";
import type { Quote } from "../types";

export function Quotes() {
  const pending = quotesMock.filter((c) => c.status === "pending").length;
  const totalAmount = quotesMock.reduce((s, c) => s + c.totalAmount, 0);

  const columns: ColumnDef<Quote>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "date", header: "Fecha" },
    { accessorKey: "customer", header: "Cliente" },
    { accessorKey: "seller", header: "Vendedor" },
    {
      accessorKey: "totalAmount",
      header: "Monto",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: "status", header: "Estado" },
    { accessorKey: "probability", header: "Prob. %" },
  ];

  return (
    <PageWrapper
      title="Cotizaciones"
      description="Pipeline comercial simulado — complementa la vista de ventas."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Cotizaciones" value={quotesMock.length} />
        <KpiCard label="Pendientes" value={pending} />
        <KpiCard label="Monto total" value={formatUSD(totalAmount)} />
      </div>
      <DataTable data={quotesMock} columns={columns} />
    </PageWrapper>
  );
}
