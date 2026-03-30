import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  emptyLabel?: string;
}

export function DataTable<T>({
  data,
  columns,
  emptyLabel = "Sin datos",
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-[#0A204E] bg-white shadow-sm">
        <table className="w-full min-w-160 border-collapse text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr
                key={hg.id}
                className="border-b border-[#0A204E]/20 bg-[#F1EEEE]"
              >
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="whitespace-nowrap px-3 py-2 font-semibold text-[#0A204E]"
                  >
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-[#0A204E]/50 bg-white"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#0A204E]/20 hover:bg-[#F1EEEE]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-2 text-[#0A204E] bg-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4 px-1">
        <span className="text-xs text-[#0A204E]/50">
          Mostrando{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          {" – "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}
          {" de "}
          {table.getFilteredRowModel().rows.length} registros
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 text-xs rounded-md border border-[#F1EEEE]/20
              text-[#0A204E] hover:bg-[#0A204E]/5 disabled:opacity-30
              disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>

          {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`w-7 h-7 text-xs rounded-md transition-colors
                ${
                  table.getState().pagination.pageIndex === i
                    ? "bg-[#DC3920] text-white font-medium"
                    : "text-[#0A204E] hover:bg-[#0A204E]/5 border border-[#0A204E]/20"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 text-xs rounded-md border border-[#F1EEEE]/20
              text-[#0A204E] hover:bg-[#0A204E]/5 disabled:opacity-30
              disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
