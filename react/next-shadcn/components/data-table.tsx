"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { parseTime } from "@/lib/dayjs";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  queryOpt: {
    queryKey: any[];
    queryFn: (pagination: PageQuery) => Promise<{
      list: TData[];
      total?: number;
    }>;
  };
  onRowClick?: (row: TData) => void;
}

export interface DataTableRef {
  resetPageIndex: () => void;
}

export const DataTable = React.forwardRef<
  DataTableRef,
  DataTableProps<any, any>
>(({ columns, queryOpt: { queryKey, queryFn }, onRowClick }, ref) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const query = useQuery({
    queryKey: [...queryKey, pagination],
    queryFn: () =>
      queryFn({
        pageNum: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
      }),
  });
  const table = useReactTable({
    columns,
    data: query.data?.list ?? [],
    rowCount: query.data?.total ?? 0,
    manualPagination: true,
    autoResetPageIndex: false,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const hasData = query.data?.list?.length ?? 0 > 0;
  const isQuerying = query.status === 'pending';

  React.useImperativeHandle(ref, () => ({
    resetPageIndex: () => {
      table.resetPageIndex();
    },
  }));

  return (
    <div className="flex flex-col gap-2 overflow-x-auto min-h-[300px]">
      {/* 表格 */}
      <Table className="bg-background rounded-md overflow-hidden">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="last:text-right">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isQuerying ? (
            <TableEmpty colspan={columns.length}>
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Loader2Icon className="w-8 h-8 animate-spin" />
                <span>Loading...</span>
              </div>
            </TableEmpty>
          ) : hasData ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  onRowClick && "cursor-pointer",
                  "transition-colors"
                )}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={cn("last:text-right")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableEmpty colspan={columns.length}>
              <div className="text-sm text-foreground/50">No data</div>
            </TableEmpty>
          )}
        </TableBody>
      </Table>

      {/* 总条数和最后搜索时间 */}
      <div className="px-2 text-sm text-foreground/50 flex items-center justify-between gap-2 w-full">
        <div>Total: {query.data?.total ?? 0}</div>
        {query.isLoading ? (
          <Loader2Icon className="w-4 h-4 animate-spin" />
        ) : (
          <div>
            Last search: {parseTime(query.dataUpdatedAt, 0, "HH:mm:ss")}
          </div>
        )}
      </div>

      {/* 分页 */}
      {!isQuerying && hasData && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Prev
              </Button>
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => table.setPageIndex(index)}
                  isActive={index === table.getState().pagination.pageIndex}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                variant="ghost"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
});
