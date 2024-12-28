import { useDispatch, useSelector } from "react-redux";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { UpdatePlaylistForm } from "@/components/forms/UpdatePlaylistForm";

import { updateClose } from "@/store/reducers/playlistModalReducer";

export const UpdatePlaylistModal = () => {
   const { isUpdateOpen, playlistId } = useSelector(
      (state) => state.playlistModal
   );

   const dispatch = useDispatch();

   return (
      <Dialog open={isUpdateOpen} onOpenChange={() => dispatch(updateClose())}>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Update Playlist</DialogTitle>
            </DialogHeader>
            <UpdatePlaylistForm playlistId={playlistId} />
         </DialogContent>
      </Dialog>
   );
};
