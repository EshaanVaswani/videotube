import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { setField } from "@/store/reducers/videoFormReducer";

const uploadSchema = z.object({
   videoFile: z
      .instanceof(File, { message: "Video is required" })
      .refine((file) => file.size > 0, { message: "Invalid video file" }),
   thumbnail: z
      .instanceof(File, { message: "Thumbnail is required" })
      .refine((file) => file.size > 0, { message: "Invalid thumbnail file" }),
});

export function UploadStep({ onNext }) {
   const dispatch = useDispatch();
   const { videoFile, thumbnail } = useSelector((state) => state.videoForm);

   const {
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(uploadSchema),
      defaultValues: { videoFile, thumbnail },
   });

   const onSubmit = () => {
      onNext();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <h2 className="text-lg font-semibold">Upload Video & Thumbnail</h2>

         <FileUpload
            name="videoFile"
            acceptedTypes="video/*"
            placeholder="Upload Video"
            containerClassName="w-full h-48"
            fieldChange={(files) => {
               const file = files?.[0];
               setValue("videoFile", file, { shouldValidate: true });
               dispatch(setField({ key: "videoFile", value: file }));
            }}
         />
         {errors.videoFile && (
            <p className="text-sm text-red-500">{errors.videoFile.message}</p>
         )}

         <FileUpload
            name="thumbnail"
            acceptedTypes="image/*"
            placeholder="Upload Thumbnail"
            containerClassName="w-full h-48"
            fieldChange={(files) => {
               const file = files?.[0];
               setValue("thumbnail", file, { shouldValidate: true });
               dispatch(setField({ key: "thumbnail", value: file }));
            }}
         />
         {errors.thumbnail && (
            <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
         )}

         <Button type="submit" className="w-full">
            Next
         </Button>
      </form>
   );
}
