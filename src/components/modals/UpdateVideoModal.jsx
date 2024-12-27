import { useDispatch, useSelector } from "react-redux";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { UpdateVideoForm } from "@/components/forms/UpdateVideoForm";

import { updateClose } from "@/store/reducers/videoModalReducer";

export const UpdateVideoModal = () => {
   const { isUpdateOpen, videoId } = useSelector((state) => state.videoModal);

   const dispatch = useDispatch();

   return (
      <Dialog open={isUpdateOpen} onOpenChange={() => dispatch(updateClose())}>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Update Video</DialogTitle>
            </DialogHeader>
            <UpdateVideoForm videoId={videoId} />
         </DialogContent>
      </Dialog>
   );
};
