import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/datatable-column-header";
import { Lead } from "@/store/types";
import { format } from "date-fns";

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center mr-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className=""
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center mr-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className=""
        />
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "identification_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Id No" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("identification_number")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    accessorFn: (lead) => lead.first_name + " " + lead.last_name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "KRA_PIN",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KRA PIN" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("KRA_PIN")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("phone_number")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const rawStatus = row.original.status;
      const status = rawStatus.replace("_", " ");
      
      switch (status) {
        case "in progress":
          return (
            <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
              {status}
            </span>
          );
        case "received":
            return (
                <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                {status}
                </span>
            );
        case "client denied":
          return (
            <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
              {status}
            </span>
          );
        case "contract concluded":
            return (
                <span className="px-2 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 rounded-full">
                {status}
                </span>
            );
      }

        return (
            <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            {status}
            </span>
        );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "requested_loan_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested Loan Amount" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("requested_loan_amount")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "application_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("application_date"));
      const formattedDate = format(date, "dd-MM-yyyy-hh:mm:ss a");
      return <div className="">{formattedDate}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
];
