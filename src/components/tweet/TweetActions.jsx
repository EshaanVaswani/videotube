import { memo, useState } from "react";
import { Edit, Flag, MoreVertical, Trash } from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const TweetActions = memo(({ tweet, isOwner, onEdit, onDelete }) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   return (
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
               <MoreVertical className="size-6" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            {isOwner ? (
               <>
                  <DropdownMenuItem onClick={() => onEdit(tweet)}>
                     <Edit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                     onClick={() => {
                        setDropdownOpen(false);
                        onDelete(tweet);
                     }}
                  >
                     <Trash /> Delete
                  </DropdownMenuItem>
               </>
            ) : (
               <DropdownMenuItem>
                  <Flag /> Report
               </DropdownMenuItem>
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
});
