import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
   useAddCommentMutation,
   useEditCommentMutation,
} from "@/store/api/commentApi";

const AddCommentSchema = z.object({
   content: z.string().min(1, "Content is required"),
});

export const CommentForm = ({ videoId, comment, onClose }) => {
   const [isLoading, setIsLoading] = useState(false);

   const user = useSelector((state) => state.auth.user);

   const [addComment] = useAddCommentMutation();
   const [editComment] = useEditCommentMutation();

   const form = useForm({
      resolver: zodResolver(AddCommentSchema),
      defaultValues: {
         content: "",
      },
   });

   useEffect(() => {
      if (comment) {
         form.setValue("content", comment.content);
      }
   }, [comment]);

   const handleClose = () => {
      form.reset();
      onClose?.();
   };

   const onSubmit = async (values) => {
      setIsLoading(true);
      try {
         if (comment) {
            const res = await editComment({
               commentId: comment._id,
               content: values.content,
            }).unwrap();

            if (res.success) {
               toast.success(res.message);
               handleClose();
            }
         } else {
            const res = await addComment({
               videoId,
               content: values.content,
            }).unwrap();

            if (res.success) {
               toast.success(res.message);
               handleClose();
            }
         }
      } catch (error) {
         let errorMessage = "Something went wrong";
         if (error?.data) {
            const match = error.data.match(/Error: (.+?)<\/pre>/);

            if (match && match[1]) {
               errorMessage = match[1];
            }
         }
         toast.error(errorMessage);
      } finally {
         setIsLoading(false);
      }
   };

   if (!user) return null;

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
            <div className="flex items-start gap-4">
               {!comment && (
                  <img
                     src={user.avatar}
                     alt={user.username}
                     className="w-10 h-10 rounded-full"
                  />
               )}
               <div className="flex-1">
                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Textarea
                                 name="content"
                                 placeholder="Add a comment..."
                                 className="min-h-[80px]"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="flex justify-end gap-2 mt-2">
                     <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClose}
                     >
                        Cancel
                     </Button>
                     <Button type="submit" disabled={isLoading}>
                        {comment ? "Edit" : "Comment"}
                     </Button>
                  </div>
               </div>
            </div>
         </form>
      </Form>
   );
};
