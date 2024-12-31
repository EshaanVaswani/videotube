import { toast } from "sonner";
import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommentForm } from "@/components/forms/CommentForm";
import { CommentContent } from "@/components/comment/CommentContent";
import { CommentActions } from "@/components/comment/CommentActions";

import { useToggleCommentLikeMutation } from "@/store/api/likeApi";
import { useDeleteCommentMutation } from "@/store/api/commentApi";
import { useConfirm } from "@/hooks/useConfirm";

export const Comment = memo(({ comment: c, videoId }) => {
   const user = useSelector((state) => state.auth.user);

   const [comment, setComment] = useState(c);
   const [editingComment, setEditingComment] = useState(null);

   const [toggleLike] = useToggleCommentLikeMutation();
   const [deleteComment] = useDeleteCommentMutation();

   const confirm = useConfirm();

   const handleLike = useCallback(
      async (comment) => {
         try {
            const res = await toggleLike(comment._id).unwrap();

            if (res.success) {
               setComment((prev) => ({
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

   const handleEdit = useCallback((comment) => {
      setEditingComment(comment);
   }, []);

   const handleClose = useCallback(() => {
      setEditingComment(null);
   }, []);

   const handleDelete = useCallback(async () => {
      const ok = await confirm(
         "Delete Comment",
         "Are you sure you want to delete this comment?"
      );

      if (!ok) return;

      try {
         const res = await deleteComment(comment._id).unwrap();

         if (res.success) {
            toast.success(res.message);
         }
      } catch (error) {
         toast.error("Something went wrong");
      }
   }, [comment, deleteComment]);

   const isOwner = user?._id === comment.owner._id;

   return (
      <div className="flex gap-4">
         <img
            src={comment.owner.avatar}
            alt={comment.owner.username}
            className="w-10 h-10 rounded-full"
            loading="lazy"
         />
         <div className="flex-1">
            {editingComment?._id === comment?._id ? (
               <CommentForm
                  videoId={videoId}
                  comment={editingComment}
                  onClose={handleClose}
               />
            ) : (
               <CommentContent comment={comment} onLike={handleLike} />
            )}
         </div>
         {!editingComment && (
            <CommentActions
               comment={comment}
               onEdit={handleEdit}
               onDelete={handleDelete}
               isOwner={isOwner}
            />
         )}
      </div>
   );
});
