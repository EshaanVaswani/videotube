import { toast } from "sonner";
import { useState } from "react";
import {
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { ChevronDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";

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
import { DataTable } from "@/components/dashboard/table/Table";
import { SortButton } from "@/components/dashboard/table/SortButton";
import { PaginationTools } from "@/components/dashboard/table/PaginationTools";

import { formatDuration } from "@/lib/utils";
import { useConfirm } from "@/hooks/useConfirm";

import {
   useDeleteVideoMutation,
   useTogglePublishStatusMutation,
} from "@/store/api/videoApi";
import { updateOpen } from "@/store/reducers/videoModalReducer";

export const DashboardVideosTable = ({ videos: v }) => {
   const dispatch = useDispatch();

   const [sorting, setSorting] = useState([]);
   const [columnFilters, setColumnFilters] = useState([]);
   const [columnVisibility, setColumnVisibility] = useState({});

   const [videos, setVideos] = useState(v);

   const confirm = useConfirm();

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
         cell: ({ row }) => {
            const [dropdownOpen, setDropdownOpen] = useState(false);
            const videoId = row.getValue("id");

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
                           dispatch(updateOpen({ videoId }));
                        }}
                     >
                        <Edit /> Edit
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => {
                           setDropdownOpen(false);
                           handleDelete(videoId);
                        }}
                     >
                        <Trash2 /> Delete
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            );
         },
      },
   ];

   const table = useReactTable({
      data: videos,
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
         columnVisibility,
         columnFilters,
      },
   });

   const [toggle] = useTogglePublishStatusMutation();
   const [deleteVideo] = useDeleteVideoMutation();

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

   const handleDelete = async (videoId) => {
      const ok = confirm(
         "Delete this video",
         "Are you sure you want to delete this video?"
      );

      if (!ok) return;

      try {
         const res = await deleteVideo(videoId).unwrap();

         if (res.success) {
            setVideos((prev) => prev.filter((v) => v._id !== videoId));
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
            <DataTable table={table} />
         </div>

         <PaginationTools table={table} />
      </>
   );
};
