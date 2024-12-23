import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const CommentContent = memo(({ comment, onLike }) => {
   return (
      <>
         <div className="flex items-center gap-2">
            <span className="font-medium">@{comment.owner.username}</span>
            <span className="text-sm text-muted-foreground">
               {formatDistanceToNow(new Date(comment.createdAt))} ago
            </span>
            {comment.createdAt !== comment.updatedAt && (
               <span className="text-sm text-muted-foreground">(edited)</span>
            )}
         </div>
         <p className="mt-1">{comment.content}</p>
         <div className="flex items-center gap-4 mt-2">
            <Button
               className="flex items-center gap-1 text-sm hover:text-primary"
               variant="ghost"
               size="icon"
               onClick={() => onLike(comment)}
            >
               {comment.isLiked ? (
                  <ThumbsUp fill="currentColor" className="w-4 h-4" />
               ) : (
                  <ThumbsUp className="w-4 h-4" />
               )}
               <span>{comment.likeCount}</span>
            </Button>
            <Button
               className="flex items-center gap-1 text-sm hover:text-primary"
               variant="ghost"
               size="icon"
            >
               <ThumbsDown className="w-4 h-4" />
            </Button>
         </div>
      </>
   );
});
