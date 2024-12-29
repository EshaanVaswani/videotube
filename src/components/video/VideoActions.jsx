import { useState } from "react";
import { useDispatch } from "react-redux";
import {
   Bookmark,
   Clock,
   Download,
   MoreVertical,
   Share2,
   Trash2,
} from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { open } from "@/store/reducers/saveModalReducer";

export const VideoActions = ({ video, variant = "default" }) => {
   const dispatch = useDispatch();

   const [dropdownOpen, setDropdownOpen] = useState(false);

   return (
      <div>
         <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon" className="self-start">
                  <MoreVertical className="w-5 h-5" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem
                  onClick={(e) => {
                     e.stopPropagation();
                     setDropdownOpen(false);
                     dispatch(open(video._id));
                  }}
               >
                  <Bookmark /> Save to playlist
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Clock /> Save to Watch Later
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Download /> Download
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Share2 /> Share
               </DropdownMenuItem>
               {variant === "playlist" && (
                  <>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                        <Trash2 />
                        Remove from playlist
                     </DropdownMenuItem>
                  </>
               )}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
