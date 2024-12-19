import { useDispatch, useSelector } from "react-redux";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { PublishVideoForm } from "@/components/forms/PublishVideoForm";

import { close } from "@/store/reducers/videoModalReducer";

export const PublishVideoModal = () => {
   const isOpen = useSelector((state) => state.videoModal.isOpen);

   const dispatch = useDispatch();

   return (
      <Dialog open={isOpen} onOpenChange={() => dispatch(close())}>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Publish Video</DialogTitle>
            </DialogHeader>
            <PublishVideoForm />
         </DialogContent>
      </Dialog>
   );
};
