import { toast } from "sonner";
import { useState } from "react";
import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import {
   ArrowUpDown,
   ChevronDown,
   Edit,
   MoreHorizontal,
   Trash2,
} from "lucide-react";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { formatDuration } from "@/lib/utils";
import { useTogglePublishStatusMutation } from "@/store/api/videoApi";
import { SortButton } from "./SortButton";

export const DashboardVideosTable = ({ videos: v }) => {
   const [sorting, setSorting] = useState([]);
   const [columnFilters, setColumnFilters] = useState([]);
   const [columnVisibility, setColumnVisibility] = useState({});

   const [videos, setVideos] = useState(v);

   const columns = [
      {
         id: "id",
         header: "ID",
         accessorKey: "_id",
      },
      {
         id: "status",
         header: "Status",
         accessorKey: "isPublished",
         cell: ({ row }) => (
            <Switch
               checked={row.getValue("status")}
               onCheckedChange={(e) => togglePublishStatus(row)}
            />
         ),
      },
      {
         id: "statusText",
         accessorKey: "isPublished",
         cell: ({ row }) => (
            <div className="">
               {row.getValue("status") ? (
                  <span className="text-green-500 border-green-400 border text-xs px-2 py-1 rounded-full ">
                     Published
                  </span>
               ) : (
                  <span className="text-red-500 border-red-400 border text-xs px-2 py-1 rounded-full ">
                     Unpublished
                  </span>
               )}
            </div>
         ),
      },
      {
         id: "thumbnail",
         header: "Thumbnail",
         accessorKey: "thumbnail",
         cell: ({ row }) => (
            <img
               src={row.getValue("thumbnail")}
               alt={row.getValue("title")}
               className="h-20 aspect-video rounded-md"
            />
         ),
      },
      {
         id: "title",
         header: "Title",
         accessorKey: "title",
      },
      {
         id: "duration",
         accessorKey: "duration",
         header: ({ column }) => (
            <SortButton column={column} title="Duration" />
         ),
         cell: ({ row }) => formatDuration(row.getValue("duration")),
      },
      {
         id: "views",
         accessorKey: "views",
         header: ({ column }) => <SortButton column={column} title="Views" />,
      },
      {
         id: "likes",
         accessorKey: "likesCount",
         header: ({ column }) => <SortButton column={column} title="Likes" />,
      },
      {
         id: "dateUploaded",
         header: ({ column }) => (
            <SortButton column={column} title="Date Uploaded" />
         ),
         accessorKey: "createdAt",
         cell: ({ row }) =>
            new Date(row.getValue("dateUploaded")).toLocaleDateString(),
      },
      {
         id: "actions",
         enableHiding: false,
         cell: () => (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                     <MoreHorizontal />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuItem>
                     <Edit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Trash2 /> Delete
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         ),
      },
   ];

   const table = useReactTable({
      data: videos,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         sorting,
         columnVisibility,
         columnFilters,
      },
   });

   const [toggle] = useTogglePublishStatusMutation();

   const togglePublishStatus = async (row) => {
      const videoId = row.getValue("id");

      try {
         const res = await toggle(videoId).unwrap();

         if (res.success) {
            setVideos((prev) =>
               prev.map((v) =>
                  v._id === videoId ? { ...v, isPublished: !v.isPublished } : v
               )
            );
            toast.success(res.message);
         }
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   return (
      <>
         <div className="flex justify-between py-5">
            <Input
               placeholder="Search videos..."
               value={table.getColumn("title")?.getFilterValue() ?? ""}
               onChange={(e) =>
                  table.getColumn("title")?.setFilterValue(e.target.value)
               }
               className="max-w-md"
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                     Columns <ChevronDown />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  {table
                     .getAllColumns()
                     .filter((c) => c.getCanHide())
                     .map((c) => (
                        <DropdownMenuCheckboxItem
                           key={c.id}
                           checked={c.getIsVisible()}
                           onCheckedChange={(v) => c.toggleVisibility(!!v)}
                        >
                           {c.id}
                        </DropdownMenuCheckboxItem>
                     ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="rounded-md border text-center">
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
                                 {flexRender(
                                    c.column.columnDef.cell,
                                    c.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
      </>
   );
};
