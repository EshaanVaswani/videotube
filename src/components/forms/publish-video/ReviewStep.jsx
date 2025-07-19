import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { close } from "@/store/reducers/videoModalReducer";
import { resetForm } from "@/store/reducers/videoFormReducer";
import { usePublishVideoMutation } from "@/store/api/videoApi";

const schema = z.object({
   title: z.string().min(1, "Title is required"),
   description: z.string().min(1, "Description is required"),
   transcript: z.string().min(1, "Transcript is required"),
   tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
   category: z.string().min(1, "Category is required"),
   videoFile: z.any().refine((file) => file instanceof File, {
      message: "Video file is required",
   }),
   thumbnail: z.any().refine((file) => file instanceof File, {
      message: "Thumbnail is required",
   }),
});

export const ReviewStep = ({ onBack }) => {
   const dispatch = useDispatch();
   const data = useSelector((state) => state.videoForm);
   const [publish, { isLoading }] = usePublishVideoMutation();

   const {
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(schema),
      defaultValues: data,
   });

   const handlePublish = async () => {
      try {
         schema.parse(data);
      } catch (e) {
         toast.error("Validation failed. Please check all fields.");
         return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("transcript", data.transcript);
      data.tags.forEach((tag) => formData.append("tags[]", tag));
      formData.append("category", data.category);
      if (data.videoFile) formData.append("videoFile", data.videoFile);
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

      try {
         const res = await publish(formData).unwrap();
         if (res.success) {
            toast.success(res.message);
            dispatch(resetForm());
            dispatch(close());
         }
      } catch (err) {
         toast.error("Publishing failed");
      }
   };

   return (
      <form onSubmit={handleSubmit(handlePublish)} className="space-y-4">
         <h2 className="text-lg font-semibold">Review & Publish</h2>

         <div className="space-y-2 text-sm">
            <p>
               <strong>Title:</strong> {data.title}
            </p>
            <p>
               <strong>Description:</strong> {data.description}
            </p>
            <p>
               <strong>Transcript:</strong> {data.transcript?.slice(0, 200)}...
            </p>
            <p>
               <strong>Tags:</strong> {data.tags.join(", ")}
            </p>
            <p>
               <strong>Category:</strong> {data.category}
            </p>
         </div>

         <div className="space-y-1 text-sm text-red-500">
            {errors.title && <p>{errors.title.message}</p>}
            {errors.description && <p>{errors.description.message}</p>}
            {errors.transcript && <p>{errors.transcript.message}</p>}
            {errors.tags && <p>{errors.tags.message}</p>}
            {errors.category && <p>{errors.category.message}</p>}
            {errors.videoFile && <p>{errors.videoFile.message}</p>}
            {errors.thumbnail && <p>{errors.thumbnail.message}</p>}
         </div>

         <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
               Back
            </Button>
            <Button type="submit" disabled={isLoading}>
               {isLoading ? "Publishing..." : "Publish"}
            </Button>
         </div>
      </form>
   );
};
