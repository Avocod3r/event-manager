import { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { Event } from "../types/models/event.model";

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export const EventTable: React.FC<EventTableProps> = ({
  events,
  onDelete,
  onEdit,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <span>Name</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        enableSorting: true,
      },
      {
        accessorKey: "description",
        header: () => <span>Description</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "category",
        header: () => <span>Category</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "date",
        header: () => <span>Date</span>,
        cell: (info) => (
          <span>
            {new Date(info.getValue() as string).toLocaleDateString()}
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: () => <span>Status</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="text-primary hover:underline"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="text-danger hover:underline"
              onClick={() => onDelete(row.original)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  const table = useReactTable({
    data: events,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(events.length / pageSize),
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-300 p-2 rounded-md"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>

        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border border-gray-300 p-2 px-8 rounded-md"
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
