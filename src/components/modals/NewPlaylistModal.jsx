import { useDispatch, useSelector } from "react-redux";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { NewPlaylistForm } from "@/components/forms/NewPlaylistForm";

import { close } from "@/store/reducers/playlistModalReducer";

export const NewPlaylistModal = () => {
   const isOpen = useSelector((state) => state.playlistModal.isOpen);

   const dispatch = useDispatch();

   return (
      <Dialog open={isOpen} onOpenChange={() => dispatch(close())}>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Create Playlist</DialogTitle>
            </DialogHeader>
            <NewPlaylistForm />
         </DialogContent>
      </Dialog>
   );
};
