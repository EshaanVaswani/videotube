import { useCallback, useEffect, useMemo, useState } from "react";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Comment } from "@/components/comment/Comment";
import { CommentForm } from "@/components/forms/CommentForm";
import { CommentSkeleton } from "@/components/skeleton/CommentSkeleton";

import { useGetVideoCommentsQuery } from "@/store/api/commentApi";

export const CommentList = ({ videoId }) => {
   const [sortBy, setSortBy] = useState("latest");

   const { data: comments, isLoading } = useGetVideoCommentsQuery(
      {
         videoId,
         page: 1,
         limit: 10,
         sortBy,
      },
      {
         refetchOnMountOrArgChange: true,
      }
   );

   const sortComments = useCallback(
      (comments) => {
         if (!comments?.docs) return [];

         return [...comments.docs].sort((a, b) => {
            switch (sortBy) {
               case "latest":
                  return new Date(b.createdAt) - new Date(a.createdAt);
               case "mostLiked":
                  return b.likes - a.likes;
               case "oldest":
                  return new Date(a.createdAt) - new Date(b.createdAt);
               default:
                  return 0;
            }
         });
      },
      [sortBy]
   );

   const sortedComments = useMemo(
      () => sortComments(comments),
      [comments, sortComments]
   );

   if (isLoading) {
      return (
         <div className="space-y-4">
            {[1, 2, 3].map((i) => (
               <CommentSkeleton key={i} />
            ))}
         </div>
      );
   }

   return (
      <>
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
               {comments?.docs?.length || 0} Comments
            </h2>
            <Select value={sortBy} onValueChange={setSortBy}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="latest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="mostLiked">Most liked</SelectItem>
               </SelectContent>
            </Select>
         </div>

         <CommentForm videoId={videoId} />

         <div className="space-y-6">
            {sortedComments?.map((comment) => (
               <Comment key={comment._id} comment={comment} videoId={videoId} />
            ))}
         </div>
      </>
   );
};
