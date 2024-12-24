import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Flag } from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TweetActions } from "@/components/tweet/TweetActions";

import { useToggleTweetLikeMutation } from "@/store/api/likeApi";
import { memo, useCallback, useState } from "react";

export const TweetCard = memo(({ tweet: t }) => {
   const [tweet, setTweet] = useState(t);

   const [toggleLike] = useToggleTweetLikeMutation();

   const handleLike = useCallback(
      async (tweet) => {
         try {
            const res = await toggleLike(tweet._id).unwrap();
            console.log(res);

            if (res.success) {
               setTweet((prev) => ({
                  ...prev,
                  isLiked: !prev.isLiked,
                  likeCount: prev.isLiked
                     ? prev.likeCount - 1
                     : prev.likeCount + 1,
               }));
            }
         } catch (error) {
            toast.error("Something went wrong");
         }
      },
      [toggleLike]
   );

   return (
      <Card className="max-w-3xl">
         <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                     <AvatarImage
                        src={tweet.owner.avatar}
                        alt={tweet.owner.username}
                     />
                  </Avatar>
                  <div className="flex items-center gap-2">
                     <span className="font-medium">{tweet.owner.fullName}</span>
                     <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(tweet.createdAt))} ago
                     </span>
                     {tweet.createdAt !== tweet.updatedAt && (
                        <span className="text-xs text-muted-foreground">
                           (edited)
                        </span>
                     )}
                  </div>
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem>
                        <Flag />
                        Report
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <div className="whitespace-pre-wrap">{tweet.content}</div>
         </CardContent>

         <CardFooter>
            <TweetActions tweet={tweet} onLike={handleLike} />
         </CardFooter>
      </Card>
   );
});
