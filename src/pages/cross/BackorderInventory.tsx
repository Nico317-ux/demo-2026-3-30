import type { ColumnDef } from '@tanstack/react-table';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { DataTable } from '../../components/tables/DataTable';
import { KpiCard } from '../../components/shared/KpiCard';
import { backorderInventoryKpis, backorderVsInventory } from '../../utils/aggregations';
import { formatNumber } from '../../utils/predictiveModel';

type Row = ReturnType<typeof backorderVsInventory>[number];

export function BackorderInventory() {
  const rows = backorderVsInventory();
  const kpi = backorderInventoryKpis();

  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'orderId', header: 'Order' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'pendingUnits', header: 'Backorder' },
    { accessorKey: 'stockTotal', header: 'Total stock' },
    { accessorKey: 'warehouseAUnits', header: 'A' },
    { accessorKey: 'warehouseBUnits', header: 'B' },
    {
      accessorKey: 'covers',
      header: 'Covers?',
      cell: ({ getValue }) => ((getValue() as boolean) ? 'Yes' : 'No'),
    },
  ];

  return (
    <PageWrapper
      title="Backorder vs inventory"
      description="Open demand vs on-hand stock and warehouse imbalance signals."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Lines with stock &gt;0" value={kpi.linesWithStock} />
        <KpiCard label="Approx. covered %" value={`${kpi.approxCoveredPct}%`} />
        <KpiCard label="Rows analyzed" value={formatNumber(rows.length)} />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
