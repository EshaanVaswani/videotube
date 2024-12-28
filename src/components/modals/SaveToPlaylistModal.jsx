import { toast } from "sonner";
import { useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaylistItem } from "@/components/playlist/PlaylistItem";
import { PlaylistSkeleton } from "@/components/skeleton/PlaylistSkeleton";

import {
   useAddVideoMutation,
   useGetPlaylistsQuery,
   useRemoveVideoMutation,
} from "@/store/api/playlistApi";
import { close } from "@/store/reducers/saveModalReducer";
import { open } from "@/store/reducers/playlistModalReducer";

export const SaveToPlaylistModal = () => {
   const user = useSelector((state) => state.auth.user);

   const { isOpen, videoId } = useSelector((state) => state.saveModal);

   const dispatch = useDispatch();

   const { data, isLoading } = useGetPlaylistsQuery(user?._id, {
      skip: !user?._id || !isOpen,
   });

   const [addVideo] = useAddVideoMutation();
   const [removeVideo] = useRemoveVideoMutation();

   const handleCheckbox = useCallback(
      async (checked, playlistId) => {
         try {
            if (checked) {
               const res = await addVideo({ videoId, playlistId }).unwrap();

               if (res.success) {
                  toast.success(res.message);
               }
            } else {
               const res = await removeVideo({ videoId, playlistId }).unwrap();

               if (res.success) {
                  toast.success(res.message);
               }
            }
         } catch (error) {
            let errorMessage = "Something went wrong";
            if (error?.data) {
               const match = error.data.match(/Error: (.+?)<\/pre>/);

               if (match && match[1]) {
                  errorMessage = match[1];
               }
            }
            toast.error(errorMessage);
         }
      },
      [addVideo, removeVideo, videoId]
   );

   const playlistItems = useMemo(() => {
      if (!data?.length) return null;

      return data.map((playlist) => (
         <PlaylistItem
            key={playlist._id}
            playlist={playlist}
            videoId={videoId}
            onChange={handleCheckbox}
         />
      ));
   }, [data, videoId, handleCheckbox]);

   return (
      <Dialog open={isOpen} onOpenChange={() => dispatch(close())}>
         <DialogContent className="max-w-xs">
            <DialogHeader>
               <DialogTitle>Save video to...</DialogTitle>
            </DialogHeader>
            {isLoading ? (
               <PlaylistSkeleton />
            ) : (
               <ScrollArea className="h-36">
                  {playlistItems || (
                     <div>
                        <p>No playlists found</p>
                     </div>
                  )}
               </ScrollArea>
            )}
            <Button
               size="sm"
               className="w-2/3 mx-auto"
               onClick={() => dispatch(open(""))}
            >
               <Plus /> New Playlist
            </Button>
         </DialogContent>
      </Dialog>
   );
};
