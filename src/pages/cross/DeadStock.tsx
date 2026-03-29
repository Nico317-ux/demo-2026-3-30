import type { ColumnDef } from '@tanstack/react-table';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { DataTable } from '../../components/tables/DataTable';
import { KpiCard } from '../../components/shared/KpiCard';
import { deadStockRawMaterials } from '../../utils/aggregations';
import { formatUSD } from '../../utils/predictiveModel';

type Row = ReturnType<typeof deadStockRawMaterials>[number];

export function DeadStock() {
  const rows = deadStockRawMaterials();
  const flagged = rows.filter((r) => r.dead);
  const deadValue = flagged.reduce((s, r) => s + r.inventoryValue, 0);

  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'description', header: 'Material' },
    { accessorKey: 'rotationDays', header: 'Rotation (days)' },
    {
      accessorKey: 'inventoryValue',
      header: 'Value USD',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    {
      accessorKey: 'dead',
      header: 'Critical?',
      cell: ({ getValue }) => ((getValue() as boolean) ? 'Yes' : 'No'),
    },
  ];

  return (
    <PageWrapper
      title="Dead / slow raw stock"
      description="Raw materials with slow rotation or excess vs consumption (demo rules)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Items in critical band" value={flagged.length} />
        <KpiCard label="Inventory value (critical)" value={formatUSD(deadValue)} />
        <KpiCard label="Total RM SKUs" value={rows.length} />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
