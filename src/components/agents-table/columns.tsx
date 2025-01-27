import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/datatable-column-header";
import { User } from "@/store/types";
import { format } from "date-fns";

export const columns: ColumnDef<User>[] = [
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
      <DataTableColumnHeader column={column} title="Agent Id No" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("identification_number")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("username")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    accessorFn: (user) => user.first_name + " " + user.last_name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "MPESA_NUMBER",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MPESA NUMBER" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("MPESA_NUMBER")}</div>,
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
    accessorKey: "is_active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.is_active ? "active" : "inactive";
    
      switch (status) {
        case "active":
          return (
            <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
              {status}
            </span>
          );
        case "inactive":
          return (
            <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
              {status}
            </span>
          );
      }
    
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("role")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created AT" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const cleanDate = format(date, "dd-MM-yyyy-hh:mm:ss a");
    return <div className="">{cleanDate}</div>
  },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated AT" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
      const cleanDate = format(date, "dd-MM-yyyy-hh:mm:ss a");
      return <div className="">{cleanDate}</div>
    },
    enableSorting: true,
    enableHiding: true,
  }
];
