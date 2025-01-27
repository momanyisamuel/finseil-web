import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/leads-table/columns";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteLead, fetchLeads } from "@/store/leadsSlice";
import { Lead } from "@/store/types";
import { Row } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LeadsProps = object;

const Leads: FC<LeadsProps> = () => {
  const leads = useAppSelector((state) => state.leads.leads);
  const dispatch = useAppDispatch();
  const router = useNavigate();

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const sorting = [
    {
      id: "name",
      desc: false,
    },
  ];

  const handleEdit = (selectedRows: Row<Lead>[]) => {
    router(`/leads/${selectedRows[0].original.id}`);
  };
  
  const handleCopy = (selectedRows: Row<Lead>[]) => {
    console.log("Copy", selectedRows);
  };
  const deleteRows = async (selectedRows: Row<Lead>[]) => {
    const deletePromises = selectedRows.map((row) => {
      //this is the mutation function
      return dispatch(deleteLead(row.original.id));
    });

    const result = await Promise.all(deletePromises);
    return result;
  };

  const handleDelete = (selectedRows: Row<Lead>[]) => {
    return deleteRows(selectedRows);
  };
  
  return (
    <div className="mx-2 mt-6 ">
      <div className="flex items-center justify-between px-2 py-4 mx-1 border shadow-sm">
        <div className="">
          <h1 className="text-2xl font-medium">Leads by Finseil Agents</h1>
          <p className="text-xs text-gray-500">
            <span>{leads.length} leads</span>
            <span className="">
              <span className="mx-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              </span>
              <span>Updated 3 minutes ago</span>
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="default"
            className="bg-[#9167C6] hover:bg-purple-700 rounded-none"
            onClick={() => router("/leads/new")}
          >
            <span>
              <PlusIcon className="w-4 h-4" strokeWidth={0.75} />
            </span>
            <span>Add Lead</span>
          </Button>
        </div>
      </div>
      <div className="px-1 mt-4">
        <DataTable
          columns={columns}
          data={leads}
          sorting={sorting}
          handleCopy={handleCopy}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Leads;
