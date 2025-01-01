import { useRef } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { BsFacebook, BsTwitterX, BsWhatsapp } from "react-icons/bs";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { close } from "@/store/reducers/shareModalReducer";

export const ShareModal = () => {
   const { isOpen, link } = useSelector((state) => state.shareModal);

   const dispatch = useDispatch();

   const inputRef = useRef(null);

   const handleCopy = () => {
      if (inputRef.current) {
         inputRef.current.select();
         navigator.clipboard.writeText(link);
         toast.message("Link copied to clipboard");
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={() => dispatch(close())}>
         <DialogContent className="max-w-2xl">
            <DialogHeader>
               <DialogTitle>Share</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
               <Input ref={inputRef} value={link} readOnly className="flex-1" />
               <Button size="icon" variant="ghost" onClick={handleCopy}>
                  <Copy />
               </Button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
               <Button variant="ghost" size="icon">
                  <BsWhatsapp />
               </Button>
               <Button variant="ghost" size="icon">
                  <BsFacebook />
               </Button>
               <Button variant="ghost" size="icon">
                  <BsTwitterX />
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};
