import { z } from "zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
import {
   useGetVideoByIdQuery,
   useUpdateVideoMutation,
} from "@/store/api/videoApi";
import { updateClose } from "@/store/reducers/videoModalReducer";
import { Loader } from "../Loader";
import { Badge } from "../ui/badge";

const UpdateVideoSchema = z.object({
   title: z.string("Title is required"),
   description: z.string("Description is required"),
   thumbnail: z.array(z.instanceof(File, "Thumbnail is required")).optional(),
   tags: z.array(z.string()).optional(),
   category: z.array(z.string()).optional(),
   transcript: z.string().optional(),
});

export const UpdateVideoForm = ({ videoId }) => {
   const dispatch = useDispatch();

   const [isLoading, setIsLoading] = useState(false);

   const [update] = useUpdateVideoMutation();

   const { data: video, isLoading: videoLoading } =
      useGetVideoByIdQuery(videoId);

   const [tags, setTags] = useState(video?.tags || []);
   const [tagInput, setTagInput] = useState("");
   const [categories, setCategories] = useState(video?.category || []);
   const [categoryInput, setCategoryInput] = useState("");

   const form = useForm({
      resolver: zodResolver(UpdateVideoSchema),
      defaultValues: {
         title: "",
         description: "",
         thumbnail: undefined,
         tags: [],
         category: [],
         transcript: "",
      },
   });

   useEffect(() => {
      if (video) {
         form.reset({
            title: video.title,
            description: video.description,
            thumbnail: undefined,
            tags: video.tags || [],
            category: video.category || [],
            transcript: video.transcript || "",
         });

         setTags(video.tags || []);
         setCategories(video.category || []);
      }
   }, [video, form]);

   if (videoLoading) {
      return <Loader />;
   }

   const onSubmit = async (values) => {
      if (!values.title || !values.description) {
         toast.error("Title and Description are required");
         return;
      }

      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.thumbnail) {
         formData.append("thumbnail", values.thumbnail[0]);
      }

      formData.append("tags", JSON.stringify(tags));
      formData.append("category", JSON.stringify(categories));
      formData.append("transcript", values.transcript || "");

      setIsLoading(true);
      try {
         const res = await update({
            videoId,
            data: formData,
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
      <div className="max-h-[80vh] overflow-y-auto p-4">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              mediaUrl={video?.thumbnail}
                              fieldChange={(files) =>
                                 form.setValue("thumbnail", Array.from(files))
                              }
                              containerClassName="w-1/2 h-48"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

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

                  <FormField
                     control={form.control}
                     name="tags"
                     render={() => (
                        <FormItem>
                           <FormLabel>Tags</FormLabel>
                           <div className="flex flex-wrap gap-2">
                              {tags.map((tag, index) => (
                                 <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                 >
                                    {tag}
                                    <Button
                                       size="icon"
                                       variant="ghost"
                                       className="h-4 w-4"
                                       onClick={() =>
                                          setTags((prev) =>
                                             prev.filter((_, i) => i !== index)
                                          )
                                       }
                                       type="button"
                                    >
                                       ×
                                    </Button>
                                 </Badge>
                              ))}
                           </div>
                           <Input
                              placeholder="Type tag and press Enter"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    e.preventDefault();
                                    const trimmed = tagInput.trim();
                                    if (trimmed && !tags.includes(trimmed)) {
                                       setTags([...tags, trimmed]);
                                    }
                                    setTagInput("");
                                 }
                              }}
                              className="mt-2"
                           />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="category"
                     render={() => (
                        <FormItem>
                           <FormLabel>Category</FormLabel>
                           <div className="flex flex-wrap gap-2">
                              {categories.map((cat, index) => (
                                 <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                 >
                                    {cat}
                                    <Button
                                       size="icon"
                                       variant="ghost"
                                       className="h-4 w-4"
                                       onClick={() =>
                                          setCategories((prev) =>
                                             prev.filter((_, i) => i !== index)
                                          )
                                       }
                                       type="button"
                                    >
                                       ×
                                    </Button>
                                 </Badge>
                              ))}
                           </div>
                           <Input
                              placeholder="Type category and press Enter"
                              value={categoryInput}
                              onChange={(e) => setCategoryInput(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    e.preventDefault();
                                    const trimmed = categoryInput.trim();
                                    if (
                                       trimmed &&
                                       !categories.includes(trimmed)
                                    ) {
                                       setCategories([...categories, trimmed]);
                                    }
                                    setCategoryInput("");
                                 }
                              }}
                              className="mt-2"
                           />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="transcript"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Transcript</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Transcript of the video"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
               </Button>
            </form>
         </Form>
      </div>
   );
};
