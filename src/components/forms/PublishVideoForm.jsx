import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch } from "react-redux";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/FileUpload";
import { usePublishVideoMutation } from "@/store/api/videoApi";

const PublishVideoSchema = z.object({
   title: z.string("Title is required"),
   description: z.string("Description is required"),
   thumbnail: z.array(z.instanceof(File, "Thumbnail is required")),
   videoFile: z.array(z.instanceof(File, "Video is required")),
});

export const PublishVideoForm = () => {
   const [isLoading, setIsLoading] = useState(false);

   const [publish] = usePublishVideoMutation();

   const form = useForm({
      resolver: zodResolver(PublishVideoSchema),
      defaultValues: {
         title: "",
         description: "",
         thumbnail: null,
         videoFile: null,
      },
   });

   const onSubmit = async (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.thumbnail) {
         formData.append("thumbnail", values.thumbnail[0]);
      }

      if (values.videoFile) {
         formData.append("videoFile", values.videoFile[0]);
      }

      setIsLoading(true);
      try {
         const res = await publish(formData).unwrap();

         if (res.success) {
            toast.success(res.message);
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
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                  control={form.control}
                  name="videoFile"
                  render={() => (
                     <FormItem>
                        <FormLabel>Video File</FormLabel>
                        <FormControl>
                           <FileUpload
                              name="videoFile"
                              placeholder="Upload Video"
                              acceptedTypes="video/*"
                              fieldChange={(files) =>
                                 form.setValue("videoFile", Array.from(files))
                              }
                              containerClassName="w-full h-48"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="thumbnail"
                  render={() => (
                     <FormItem>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                           <FileUpload
                              name="thumbnail"
                              placeholder="Upload Thumbnail"
                              acceptedTypes="image/*"
                              fieldChange={(files) =>
                                 form.setValue("thumbnail", Array.from(files))
                              }
                              containerClassName="w-full h-48"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className="space-y-4">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Video title"
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
                              placeholder="Video description"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <Button type="submit" disabled={isLoading}>
               {isLoading ? "Publishing..." : "Publish"}
            </Button>
         </form>
      </Form>
   );
};
