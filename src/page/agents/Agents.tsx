import { columns } from '@/components/agents-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { User } from '@/store/types';
import { deleteUser, fetchUsers } from '@/store/usersSlice';
import { Row } from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

type AgentsProps = object

const Agents: FC<AgentsProps> = () => {
    const agents = useAppSelector((state) => state.users.users);
    const dispatch = useAppDispatch();
    const router = useNavigate();
  
    console.log(agents);
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  
    const sorting = [
      {
        id: "name",
        desc: false,
      },
    ];
  
    const handleEdit = (selectedRows: Row<User>[]) => {
      router(`/agents/${selectedRows[0].original.id}`);
    };
    
    const handleCopy = (selectedRows: Row<User>[]) => {
      console.log("Copy", selectedRows);
    };

    const deleteRows = async (selectedRows: Row<User>[]) => {
      const deletePromises = selectedRows.map((row) => {
        //this is the mutation function
        return dispatch(deleteUser(row.original.id));
      });
  
      const result = await Promise.all(deletePromises);
      return result;
    };
  
    const handleDelete = (selectedRows: Row<User>[]) => {
      return deleteRows(selectedRows);
    };
  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center justify-between px-2 py-4 mx-1 border shadow-sm">
        <div className="">
          <h1 className="text-2xl font-medium">Finseil Agents</h1>
          <p className="text-xs text-gray-500">
            <span>{agents.length} agents</span>
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
            variant="outline"
            className="bg-[#9167C6] hover:bg-purple-700 rounded-none text-white"
            onClick={() => router("/agents/new")}
          >
            <PlusIcon size={16} />
            <span className="mx-1">New Agent</span>
          </Button>
        </div>
      </div>
      <div className='px-1 mt-4'>
      <DataTable
        columns={columns}
        data={agents}
        sorting={sorting}
        handleEdit={handleEdit}
        handleCopy={handleCopy}
        handleDelete={handleDelete}
      />
      </div>
    </div>
  )
}

export default Agents