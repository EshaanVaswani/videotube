import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   Bookmark,
   Download,
   MoreVertical,
   Pencil,
   Play,
   Plus,
   Share2,
   Trash2,
} from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useConfirm } from "@/hooks/useConfirm";
import { updateOpen } from "@/store/reducers/playlistModalReducer";
import { useDeletePlaylistMutation } from "@/store/api/playlistApi";
import { open as openShare } from "@/store/reducers/shareModalReducer";

export const PlaylistActions = ({ playlist }) => {
   const dispatch = useDispatch();

   const [dropdownOpen, setDropdownOpen] = useState(false);

   const confirm = useConfirm();

   const user = useSelector((state) => state.auth.user);

   const isOwner = playlist?.owner._id === user?._id;

   const [deletePlaylist] = useDeletePlaylistMutation();

   const handleDelete = async () => {
      const ok = await confirm(
         "Delete playlist",
         "Are you sure you want to delete this playlist?"
      );

      if (!ok) return;

      try {
         const res = await deletePlaylist(playlist._id).unwrap();

         if (res.success) {
            toast.success(res.message);
         }
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   return (
      <div className="flex flex-wrap gap-2 pt-2">
         <Button size="sm" className="gap-2">
            <Play className="size-4" />
            Play All
         </Button>

         {isOwner && (
            <>
               <Button size="icon" variant="outline" className="gap-2">
                  <Plus className="size-4" />
               </Button>

               <Button
                  size="icon"
                  variant="outline"
                  className="gap-2"
                  onClick={() =>
                     dispatch(updateOpen({ playlistId: playlist._id }))
                  }
               >
                  <Pencil className="size-4" />
               </Button>
            </>
         )}

         {!isOwner && (
            <Button size="icon" variant="outline" className="gap-2">
               <Bookmark className="size-4" />
            </Button>
         )}

         <Button
            size="icon"
            variant="outline"
            className="gap-2"
            onClick={() =>
               dispatch(
                  openShare({
                     link: `${window.location.origin}/playlist/${playlist._id}`,
                  })
               )
            }
         >
            <Share2 className="size-4" />
         </Button>

         <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
               <Button size="icon" variant="outline" className="gap-2">
                  <MoreVertical className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem>
                  <Download className="size-4" />
                  Download
               </DropdownMenuItem>
               {isOwner && (
                  <DropdownMenuItem
                     onClick={() => {
                        setDropdownOpen(false);
                        handleDelete();
                     }}
                  >
                     <Trash2 className="size-4" />
                     Delete Playlist
                  </DropdownMenuItem>
               )}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
