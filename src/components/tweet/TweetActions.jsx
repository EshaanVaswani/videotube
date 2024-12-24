import { memo } from "react";
import { MessagesSquare, Share2, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export const TweetActions = memo(({ tweet, onLike }) => {
   return (
      <div className="flex items-center gap-2">
         <Button variant="ghost" size="sm" onClick={() => onLike(tweet)}>
            {tweet.isLiked ? (
               <ThumbsUp fill="currentColor" className="h-5 w-5" />
            ) : (
               <ThumbsUp className="h-5 w-5" />
            )}
            {tweet.likeCount}
         </Button>
         <Button variant="ghost" size="sm">
            <ThumbsDown className="h-5 w-5" />
         </Button>
         <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5" />
         </Button>
         <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 ml-auto"
         >
            <Share2 className="h-5 w-5" />
            Share
         </Button>
      </div>
   );
});
