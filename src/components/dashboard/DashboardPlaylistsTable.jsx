import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Edit, MoreHorizontal, Share2, Trash2 } from "lucide-react";
import {
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dashboard/table/table";
import { ColumnsToggle } from "@/components/dashboard/table/ColumnsToggle";
import { PaginationTools } from "@/components/dashboard/table/PaginationTools";
import { SortButton } from "@/components/dashboard/table/SortButton";

import { useConfirm } from "@/hooks/useConfirm";
import {
   useDeletePlaylistMutation,
   useToggleVisibilityMutation,
} from "@/store/api/playlistApi";
import { updateOpen } from "@/store/reducers/playlistModalReducer";

export const DashboardPlaylistsTable = ({ playlists: p }) => {
   const dispatch = useDispatch();

   const [sorting, setSorting] = useState([]);
   const [columnFilters, setColumnFilters] = useState([]);
   const [columnVisibility, setColumnVisibility] = useState({});
   const [globalFilter, setGlobalFilter] = useState("");

   const [playlists, setPlaylists] = useState(p);

   const confirm = useConfirm();

   const columns = [
      {
         id: "id",
         header: "ID",
         accessorKey: "_id",
      },
      {
         id: "name",
         header: "Name",
         accessorKey: "name",
      },
      {
         id: "description",
         header: "Description",
         accessorKey: "description",
      },
      {
         id: "visibility",
         header: "Visibility",
         accessorKey: "visibility",
         cell: ({ row }) => {
            const [toggle] = useToggleVisibilityMutation();

            const toggleVisibility = async (row) => {
               const playlistId = row.getValue("id");

               try {
                  const res = await toggle(playlistId).unwrap();

                  if (res.success) {
                     setPlaylists((prev) =>
                        prev.map((p) =>
                           p._id === playlistId
                              ? {
                                   ...p,
                                   visibility: !p.visibility,
                                }
                              : p
                        )
                     );
                     toast.success(res.message);
                  }
               } catch (error) {
                  toast.error("Something went wrong");
               }
            };

            return (
               <Switch
                  checked={row.getValue("visibility")}
                  onCheckedChange={(e) => toggleVisibility(row)}
               />
            );
         },
      },
      {
         id: "visibilityText",
         accessorKey: "visibility",
         cell: ({ row }) => (
            <div className="">
               {row.getValue("visibility") ? (
                  <span className="text-green-500 border-green-400 border text-xs px-2 py-1 rounded-full ">
                     Public
                  </span>
               ) : (
                  <span className="text-red-500 border-red-400 border text-xs px-2 py-1 rounded-full ">
                     Private
                  </span>
               )}
            </div>
         ),
      },
      {
         id: "videos",
         header: "Videos",
         accessorKey: "totalVideos",
      },
      {
         id: "updatedAt",
         header: ({ column }) => (
            <SortButton column={column} title="UpdatedAt" />
         ),
         accessorKey: "updatedAt",
         cell: ({ row }) =>
            new Date(row.getValue("updatedAt")).toLocaleString(),
      },
      {
         id: "actions",
         enableHiding: false,
         cell: ({ row }) => {
            const [dropdownOpen, setDropdownOpen] = useState(false);

            const playlistId = row.getValue("id");

            const [deletePlaylist] = useDeletePlaylistMutation();

            const handleDelete = async () => {
               const ok = await confirm(
                  "Delete playlist",
                  "Are you sure you want to delete this playlist?"
               );

               if (!ok) return;

               try {
                  const res = await deletePlaylist(playlistId).unwrap();

                  if (res.success) {
                     setPlaylists((prev) =>
                        prev.filter((p) => p._id !== playlistId)
                     );
                     toast.success(res.message);
                  }
               } catch (error) {
                  toast.error("Something went wrong");
               }
            };

            return (
               <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost">
                        <MoreHorizontal />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem
                        onClick={() => {
                           setDropdownOpen(false);
                           dispatch(updateOpen({ playlistId }));
                        }}
                     >
                        <Edit /> Edit
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => {
                           setDropdownOpen(false);
                           handleDelete(playlistId);
                        }}
                     >
                        <Trash2 /> Delete
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Share2 /> Share
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            );
         },
      },
   ];

   const table = useReactTable({
      data: playlists,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         globalFilter,
      },
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: (row, _columnId, filterValue) => {
         const v = filterValue.toLowerCase();
         return (
            row.getValue("name").toLowerCase().includes(v) ||
            row.getValue("description").toLowerCase().includes(v)
         );
      },
   });

   return (
      <>
         <div className="flex justify-between py-5">
            <Input
               placeholder="Search playlists..."
               value={globalFilter ?? ""}
               onChange={(e) => setGlobalFilter(e.target.value)}
               className="max-w-md"
            />
            <ColumnsToggle table={table} />
         </div>
         <div className="rounded-md border">
            <DataTable table={table} columns={columns} />
         </div>
         <PaginationTools table={table} />
      </>
   );
};
