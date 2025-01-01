import { flexRender } from "@tanstack/react-table";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

export const DataTable = ({ table, columns }) => {
   return (
      <Table>
         <TableHeader>
            {table.getHeaderGroups().map((hg) => (
               <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                     <TableHead key={h.id}>
                        {h.isPlaceholder
                           ? null
                           : flexRender(
                                h.column.columnDef.header,
                                h.getContext()
                             )}
                     </TableHead>
                  ))}
               </TableRow>
            ))}
         </TableHeader>
         <TableBody>
            {table.getRowModel().rows?.length ? (
               table.getRowModel().rows.map((r) => (
                  <TableRow
                     key={r.id}
                     data-state={r.getIsSelected() && "selected"}
                  >
                     {r.getVisibleCells().map((c) => (
                        <TableCell key={c.id}>
                           {flexRender(c.column.columnDef.cell, c.getContext())}
                        </TableCell>
                     ))}
                  </TableRow>
               ))
            ) : (
               <TableRow>
                  <TableCell
                     colSpan={columns?.length}
                     className="h-24 text-center"
                  >
                     No results.
                  </TableCell>
               </TableRow>
            )}
         </TableBody>
      </Table>
   );
};
