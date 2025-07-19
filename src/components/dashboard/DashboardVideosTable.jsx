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
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/table/Table";
import { SortButton } from "@/components/dashboard/table/SortButton";
import { ColumnsToggle } from "@/components/dashboard/table/ColumnsToggle";
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
         cell: ({ row }) => {
            const videoId = row.getValue("id");

            const [toggle] = useTogglePublishStatusMutation();

            const togglePublishStatus = async () => {
               try {
                  const res = await toggle(videoId).unwrap();

                  if (res.success) {
                     setVideos((prev) =>
                        prev.map((v) =>
                           v._id === videoId
                              ? { ...v, isPublished: !v.isPublished }
                              : v
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
                  checked={row.getValue("status")}
                  onCheckedChange={(e) => togglePublishStatus()}
               />
            );
         },
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
         id: "tags",
         header: "Tags",
         accessorKey: "tags",
         cell: ({ row }) => {
            const tags = row.getValue("tags") || [];
            const displayed = tags.slice(0, 3);
            const remaining = tags.length - displayed.length;

            return (
               <div className="flex flex-wrap gap-1">
                  {displayed.map((tag, i) => (
                     <span
                        key={i}
                        className="text-xs bg-muted px-2 py-0.5 rounded-full"
                     >
                        {tag}
                     </span>
                  ))}
                  {remaining > 0 && (
                     <span
                        className="text-xs bg-muted px-2 py-0.5 rounded-full cursor-pointer"
                        title={tags.slice(3).join(", ")}
                     >
                        +{remaining} more
                     </span>
                  )}
               </div>
            );
         },
      },
      {
         id: "category",
         header: "Category",
         accessorKey: "category",
         cell: ({ row }) => {
            const categories = row.getValue("category") || [];
            const displayed = categories.slice(0, 3);
            const remaining = categories.length - displayed.length;

            return (
               <div className="flex flex-wrap gap-1">
                  {displayed.map((cat, i) => (
                     <span
                        key={i}
                        className="text-xs bg-muted px-2 py-0.5 rounded-full"
                     >
                        {cat}
                     </span>
                  ))}
                  {remaining > 0 && (
                     <span
                        className="text-xs bg-muted px-2 py-0.5 rounded-full cursor-pointer"
                        title={categories.slice(3).join(", ")}
                     >
                        +{remaining} more
                     </span>
                  )}
               </div>
            );
         },
      },
      {
         id: "totalWatchTime",
         header: "Watch Time",
         accessorKey: "totalWatchTime",
         cell: ({ row }) => {
            const seconds = row.getValue("totalWatchTime");
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            const pad = (v) => String(v).padStart(2, "0");

            return <span>{`${pad(hrs)}:${pad(mins)}:${pad(secs)}`}</span>;
         },
      },

      {
         id: "actions",
         enableHiding: false,
         cell: ({ row }) => {
            const [dropdownOpen, setDropdownOpen] = useState(false);

            const videoId = row.getValue("id");

            const [deleteVideo] = useDeleteVideoMutation();

            const handleDelete = async () => {
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
            <ColumnsToggle table={table} />
         </div>

         <div className="rounded-md border text-center">
            <DataTable table={table} />
         </div>

         <PaginationTools table={table} />
      </>
   );
};
