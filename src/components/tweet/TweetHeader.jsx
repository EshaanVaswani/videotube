import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const TweetHeader = ({ tweet }) => {
   return (
      <div className="flex items-center gap-3">
         <Avatar className="h-10 w-10">
            <AvatarImage src={tweet.owner.avatar} alt={tweet.owner.username} />
         </Avatar>
         <div className="flex items-center gap-2">
            <span className="font-medium">{tweet.owner.fullName}</span>
            <span className="text-xs text-muted-foreground">
               {formatDistanceToNow(new Date(tweet.createdAt))} ago
            </span>
            {tweet.createdAt !== tweet.updatedAt && (
               <span className="text-xs text-muted-foreground">(edited)</span>
            )}
         </div>
      </div>
   );
};
