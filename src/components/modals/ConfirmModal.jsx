import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { close } from "@/store/reducers/confirmModalReducer";
import { getResolver, clearResolver } from "@/hooks/useConfirm";

export const ConfirmModal = () => {
   const dispatch = useDispatch();

   const { isOpen, title, message } = useSelector(
      (state) => state.confirmModal
   );

   const handleClose = () => {
      const resolve = getResolver();
      if (resolve) {
         resolve(false);
         clearResolver();
      }
      dispatch(close());
   };

   const handleConfirm = () => {
      const resolve = getResolver();
      if (resolve) {
         resolve(true);
         clearResolver();
      }
      dispatch(close());
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="pt-2">
               <Button onClick={handleClose} variant="outline">
                  Cancel
               </Button>
               <Button onClick={handleConfirm}>Confirm</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
