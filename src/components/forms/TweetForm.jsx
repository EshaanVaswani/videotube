import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import {
   useAddTweetMutation,
   useUpdateTweetMutation,
} from "@/store/api/tweetApi";

const AddTweetSchema = z.object({
   content: z.string().min(1, "Content is required"),
});

export const TweetForm = ({ tweet, onClose }) => {
   const [isLoading, setIsLoading] = useState(false);

   const user = useSelector((state) => state.auth.user);

   const [addTweet] = useAddTweetMutation();
   const [updateTweet] = useUpdateTweetMutation();

   const form = useForm({
      resolver: zodResolver(AddTweetSchema),
      defaultValues: {
         content: "",
      },
   });

   useEffect(() => {
      if (tweet) {
         form.setValue("content", tweet.content);
      }
   }, [tweet]);

   const handleClose = () => {
      form.reset();
      onClose?.();
   };

   const onSubmit = async (values) => {
      setIsLoading(true);
      try {
         if (tweet) {
            const res = await updateTweet({
               tweetId: tweet._id,
               content: values.content,
            }).unwrap();

            if (res.success) {
               toast.success(res.message);
               handleClose();
            }
         } else {
            const res = await addTweet({
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

   return (
      <Card className="mb-8 max-w-3xl bg-gray-900">
         <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                     <AvatarImage src={user.avatar} alt={user.username} />
                  </Avatar>
                  <span className="font-medium">{user.fullName}</span>
               </div>
            </div>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="content"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Textarea
                                 name="content"
                                 placeholder="Add a post..."
                                 className="bg-transparent border-none"
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
                        {tweet ? "Update" : "Tweet"}
                     </Button>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
