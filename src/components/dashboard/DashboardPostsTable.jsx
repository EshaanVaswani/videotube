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
import { useDeleteTweetMutation } from "@/store/api/tweetApi";

export const DashboardPostsTable = ({ posts: p }) => {
   const dispatch = useDispatch();

   const [sorting, setSorting] = useState([]);
   const [columnFilters, setColumnFilters] = useState([]);
   const [columnVisibility, setColumnVisibility] = useState({});

   const [posts, setPosts] = useState(p);

   const confirm = useConfirm();

   const columns = [
      {
         id: "id",
         header: "ID",
         accessorKey: "_id",
      },
      {
         id: "content",
         header: "Content",
         accessorKey: "content",
      },
      {
         id: "likes",
         accessorKey: "likeCount",
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

            const postId = row.getValue("id");

            const confirm = useConfirm();

            const [deletePost] = useDeleteTweetMutation();

            const handleDelete = async () => {
               const ok = await confirm(
                  "Delete Post",
                  "Are you sure you want to delete this post?"
               );

               if (!ok) return;

               try {
                  const res = await deletePost(postId).unwrap();

                  if (res.success) {
                     setPosts((prev) => prev.filter((p) => p._id !== postId));
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
                     <DropdownMenuItem>
                        <Edit /> Edit
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => {
                           setDropdownOpen(false);
                           handleDelete();
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
      data: posts,
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
               placeholder="Search posts..."
               value={table.getColumn("content")?.getFilterValue() ?? ""}
               onChange={(e) =>
                  table.getColumn("content")?.setFilterValue(e.target.value)
               }
               className="max-w-md"
            />
            <ColumnsToggle table={table} />
         </div>

         <div className="rounded-md border">
            <DataTable table={table} />
         </div>

         <PaginationTools table={table} />
      </>
   );
};
