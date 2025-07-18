import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
   Bookmark,
   Clock,
   Download,
   MoreVertical,
   Share2,
   Trash2,
   X,
} from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { open as saveModalOpen } from "@/store/reducers/saveModalReducer";
import { open as shareModalOpen } from "@/store/reducers/shareModalReducer";
import { useToggleVideoLikeMutation } from "@/store/api/likeApi";
import {
   useRemoveVideoFromWatchLaterMutation,
   useRemoveVideoMutation,
   useSaveVideoToWatchLaterMutation,
} from "@/store/api/playlistApi";
import { useRemoveVideoFromHistoryMutation } from "@/store/api/historyApi";

export const VideoActions = ({ video, variant = "default" }) => {
   const dispatch = useDispatch();

   const [dropdownOpen, setDropdownOpen] = useState(false);

   const { playlistId } = useParams();

   const [toggle] = useToggleVideoLikeMutation();
   const [removeFromPlaylist] = useRemoveVideoMutation();
   const [removeFromHistory] = useRemoveVideoFromHistoryMutation();
   const [saveToWatchLater] = useSaveVideoToWatchLaterMutation();
   const [removeFromWatchLater] = useRemoveVideoFromWatchLaterMutation();

   const handleUnlike = async (e) => {
      e.stopPropagation();
      try {
         const res = await toggle(video._id).unwrap();

         if (res.success) toast.success("Video removed from Liked Videos");
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   const handleRemoveFromPlaylist = async (e) => {
      e.stopPropagation();
      try {
         const res = await removeFromPlaylist({
            videoId: video._id,
            playlistId,
         }).unwrap();

         if (res.success) toast.success("Video removed from playlist");
      } catch (error) {
         const errorMessage = error?.data
            ? error.data.match(/Error: (.+?)<\/pre>/)?.[1] || error.data
            : "Something went wrong";

         toast.error(errorMessage);
      }
   };

   const handleRemoveFromWatchHistory = async (e) => {
      e.stopPropagation();
      try {
         const res = await removeFromHistory(video._id).unwrap();

         if (res.success) toast.success("Video removed from watch history");
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   const handleSaveToWatchLater = async (e) => {
      e.stopPropagation();
      try {
         const res = await saveToWatchLater(video._id).unwrap();

         if (res.success) toast.success("Video saved to Watch Later");
      } catch (error) {
         const errorMessage = error?.data
            ? error.data.match(/Error: (.+?)<\/pre>/)?.[1] || error.data
            : "Something went wrong";

         toast.error(errorMessage);
      }
   };

   const handleRemoveFromWatchLater = async (e) => {
      e.stopPropagation();
      try {
         const res = await removeFromWatchLater(video._id).unwrap();

         if (res.success) toast.success("Video removed from Watch Later");
      } catch (error) {
         const errorMessage = error?.data
            ? error.data.match(/Error: (.+?)<\/pre>/)?.[1] || error.data
            : "Something went wrong";

         toast.error(errorMessage);
      }
   };

   return (
      <div className="flex items-center">
         {variant === "history" && (
            <Button
               variant="ghost"
               size="icon"
               onClick={handleRemoveFromWatchHistory}
               className="z-[100] hidden sm:flex"
            >
               <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
         )}
         <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon" className="self-start">
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 sm:w-64">
               <DropdownMenuItem
                  onClick={(e) => {
                     e.stopPropagation();
                     setDropdownOpen(false);
                     dispatch(saveModalOpen({ videoId: video._id }));
                  }}
                  className="gap-2"
               >
                  <Bookmark className="w-4 h-4" /> Save to playlist
               </DropdownMenuItem>
               <DropdownMenuItem
                  className="gap-2"
                  onClick={handleSaveToWatchLater}
               >
                  <Clock className="w-4 h-4" /> Save to Watch Later
               </DropdownMenuItem>
               <DropdownMenuItem className="gap-2">
                  <Download className="w-4 h-4" /> Download
               </DropdownMenuItem>
               <DropdownMenuItem
                  className="gap-2"
                  onClick={(e) => {
                     e.stopPropagation();
                     setDropdownOpen(false);
                     dispatch(
                        shareModalOpen({
                           link: `${window.location.origin}/watch/${video._id}`,
                        })
                     );
                  }}
               >
                  <Share2 className="w-4 h-4" /> Share
               </DropdownMenuItem>
               {variant === "history" && (
                  <>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={handleRemoveFromWatchHistory}
                        className="sm:hidden gap-2"
                     >
                        <Trash2 className="w-4 h-4" />
                        Remove from history
                     </DropdownMenuItem>
                  </>
               )}
               {variant === "playlist" && (
                  <>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={handleRemoveFromPlaylist}
                        className="gap-2"
                     >
                        <Trash2 className="w-4 h-4" />
                        Remove from playlist
                     </DropdownMenuItem>
                  </>
               )}
               {variant === "liked" && (
                  <>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleUnlike} className="gap-2">
                        <Trash2 className="w-4 h-4" />
                        Remove from Liked Videos
                     </DropdownMenuItem>
                  </>
               )}
               {variant === "watch-later" && (
                  <>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        onClick={handleRemoveFromWatchLater}
                        className="gap-2"
                     >
                        <Trash2 className="w-4 h-4" />
                        Remove from Watch Later
                     </DropdownMenuItem>
                  </>
               )}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
