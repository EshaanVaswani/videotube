import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   ChevronLeft,
   ChevronRight,
   ChevronsLeft,
   ChevronsRight,
} from "lucide-react";

export const PaginationTools = ({ table }) => {
   return (
      <>
         <div className="flex justify-between px-10 pt-7">
            <div className="flex items-center space-x-2">
               <p className="text-sm font-medium">Rows per page</p>
               <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                     table.setPageSize(Number(value));
                  }}
               >
                  <SelectTrigger className="h-8 w-[70px]">
                     <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                     />
                  </SelectTrigger>
                  <SelectContent side="top">
                     {[5, 10, 15, 20].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div className="flex w-[100px] items-center justify-end text-sm font-medium">
               Page {table.getState().pagination.pageIndex + 1} of{" "}
               {table.getPageCount()}
            </div>
         </div>
         <div className="flex items-center justify-center space-x-2">
            <Button
               variant="outline"
               className="hidden h-8 w-8 p-0 lg:flex"
               onClick={() => table.setPageIndex(0)}
               disabled={!table.getCanPreviousPage()}
            >
               <ChevronsLeft />
            </Button>
            <Button
               variant="outline"
               className="h-8 w-8 p-0"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               <ChevronLeft />
            </Button>
            <Button
               variant="outline"
               className="h-8 w-8 p-0"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               <ChevronRight />
            </Button>
            <Button
               variant="outline"
               className="hidden h-8 w-8 p-0 lg:flex"
               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               disabled={!table.getCanNextPage()}
            >
               <ChevronsRight />
            </Button>
         </div>
      </>
   );
};
