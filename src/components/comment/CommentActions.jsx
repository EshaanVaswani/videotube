import { memo } from "react";
import { MoreVertical, Trash, Edit, Flag } from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const CommentActions = memo(({ comment, onEdit, onDelete, isOwner }) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
               <MoreVertical className="size-6" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            {isOwner ? (
               <>
                  <DropdownMenuItem onClick={() => onEdit(comment)}>
                     <Edit /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(comment)}>
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
