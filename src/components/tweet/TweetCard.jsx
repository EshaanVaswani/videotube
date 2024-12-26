import { toast } from "sonner";
import { useSelector } from "react-redux";
import { memo, useCallback, useState } from "react";
import { ThumbsUp, ThumbsDown, MessagesSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TweetHeader } from "@/components/tweet/TweetHeader";
import { TweetActions } from "@/components/tweet/TweetActions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { useToggleTweetLikeMutation } from "@/store/api/likeApi";
import { TweetForm } from "../forms/TweetForm";
import { useDeleteTweetMutation } from "@/store/api/tweetApi";
import { useConfirm } from "@/hooks/useConfirm";

export const TweetCard = memo(({ tweet: t }) => {
   const [tweet, setTweet] = useState(t);
   const [editingTweet, setEditingTweet] = useState(null);

   const [toggleLike] = useToggleTweetLikeMutation();
   const [deleteTweet] = useDeleteTweetMutation();

   const user = useSelector((state) => state.auth.user);

   const confirm = useConfirm();

   const handleLike = useCallback(
      async (tweet) => {
         try {
            const res = await toggleLike(tweet._id).unwrap();

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

   const handleEdit = useCallback((tweet) => {
      setEditingTweet(tweet);
   }, []);

   const handleClose = useCallback(() => {
      setEditingTweet(null);
   }, []);

   const handleDelete = useCallback(async () => {
      const ok = await confirm(
         "Delete Tweet",
         "Are you sure you want to delete this tweet?"
      );

      if (!ok) return;

      try {
         const res = await deleteTweet(tweet._id).unwrap();

         if (res.success) {
            toast.success(res.message);
         }
      } catch (error) {
         toast.error("Something went wrong");
      }
   }, [tweet, deleteTweet]);

   return (
      <Card className="max-w-3xl">
         <CardContent className="p-4 space-y-4">
            {editingTweet?._id === tweet._id ? (
               <TweetForm tweet={tweet} onClose={handleClose} />
            ) : (
               <>
                  <div className="flex items-center justify-between">
                     <TweetHeader tweet={tweet} />

                     <TweetActions
                        tweet={tweet}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isOwner={tweet.owner._id === user._id}
                     />
                  </div>

                  <div>{tweet.content}</div>
               </>
            )}
         </CardContent>

         <CardFooter>
            {!editingTweet && (
               <div className="flex items-center gap-2">
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => handleLike(tweet)}
                  >
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
                  <Button
                     variant="ghost"
                     size="sm"
                     className="flex items-center gap-2"
                  >
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
            )}
         </CardFooter>
      </Card>
   );
});
