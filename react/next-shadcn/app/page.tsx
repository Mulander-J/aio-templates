"use client"

import { DataTable } from '@/components/data-table';
import CopyText from "@/components/copy-text";
import { ColumnDef } from "@tanstack/react-table";
import { fruitsAPI } from "@/apis";
import type { Fruit } from "@/apis/models/fruit";

const columns: ColumnDef<Fruit>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({row}) => {
      return <CopyText text={row.original.name} />
    }
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Is Available",
    accessorKey: "isAvailable",
  }
];

export default function Home() {
  const queryOpt = {
    queryKey: ["GET_FRUITS"],
    queryFn: async (page:PageQuery) => {
      const res = await fruitsAPI.getFruits(page)
      return {
        list: res.data,
        total: res.pagination.total,
      }
    },
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h1 className="text-4xl font-bold">Hello</h1>
      <DataTable columns={columns} queryOpt={queryOpt} />
    </div>
  )
}
