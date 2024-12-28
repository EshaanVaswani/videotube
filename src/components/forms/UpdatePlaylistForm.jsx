import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
   useGetPlaylistByIdQuery,
   useUpdatePlaylistMutation,
} from "@/store/api/playlistApi";
import { updateClose } from "@/store/reducers/playlistModalReducer";

const UpdatePlaylistSchema = z.object({
   name: z.string().min(1, "Name is required"),
   description: z.string().min(1, "Description is required"),
   visibility: z.boolean(),
});

export const UpdatePlaylistForm = ({ playlistId }) => {
   const dispatch = useDispatch();

   const [isLoading, setIsLoading] = useState(false);

   const [update] = useUpdatePlaylistMutation();

   const { data: playlist, isLoading: playlistLoading } =
      useGetPlaylistByIdQuery(playlistId);

   const form = useForm({
      resolver: zodResolver(UpdatePlaylistSchema),
      defaultValues: {
         name: "",
         description: "",
         visibility: true,
      },
   });

   useEffect(() => {
      if (playlist) {
         form.reset({
            name: playlist.name,
            description: playlist.description,
            visibility: playlist.visibility,
         });
      }
   }, [playlist, form]);

   const onSubmit = async (values) => {
      console.log(values);

      setIsLoading(true);
      try {
         const res = await update({
            playlistId,
            data: values,
         }).unwrap();

         if (res.success) {
            toast.success(res.message);
            dispatch(updateClose());
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
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Playlist name"
                              type="text"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Playlist description"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex justify-between items-center">
                  <FormField
                     control={form.control}
                     name="visibility"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Visibility</FormLabel>
                           <Select
                              onValueChange={(value) =>
                                 field.onChange(value === "public")
                              }
                              value={field.value ? "public" : "private"}
                           >
                              <SelectTrigger className="w-[200px]">
                                 <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="public">Public</SelectItem>
                                 <SelectItem value="private">
                                    Private
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" disabled={isLoading}>
                     {isLoading ? "Updating..." : "Update"}
                  </Button>
               </div>
            </div>
         </form>
      </Form>
   );
};