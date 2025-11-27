import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Upload, Video, Image, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { uploadSchema } from "@/schemas/video.schema";
import { setUploadedFiles, nextStep } from "@/store/reducers/videoFormReducer";
import { useUploadFilesMutation } from "@/store/api/videoApi";
import { useTranscriptGenerator } from "@/hooks/useTranscriptGenerator";

export function UploadStep() {
   const dispatch = useDispatch();
   const [uploadFiles, { isLoading }] = useUploadFilesMutation();
   const { generateTranscript } = useTranscriptGenerator();

   const [previews, setPreviews] = useState({
      video: null,
      thumbnail: null,
   });

   const form = useForm({
      resolver: zodResolver(uploadSchema),
      defaultValues: {
         videoFile: undefined,
         thumbnail: undefined,
      },
   });

   const handleFileChange = useCallback((field, file, type) => {
      field.onChange(file);
      if (file) {
         const url = URL.createObjectURL(file);
         setPreviews((prev) => ({ ...prev, [type]: url }));
      }
   }, []);

   const clearFile = useCallback((field, type) => {
      field.onChange(undefined);
      setPreviews((prev) => {
         if (prev[type]) URL.revokeObjectURL(prev[type]);
         return { ...prev, [type]: null };
      });
   }, []);

   const onSubmit = async (data) => {
      try {
         const formData = new FormData();
         formData.append("videoFile", data.videoFile);
         formData.append("thumbnail", data.thumbnail);

         const response = await uploadFiles(formData).unwrap();

         const { videoUrl, thumbnailUrl, duration } = response;

         if (!videoUrl || !thumbnailUrl) {
            throw new Error("Invalid response: missing video or thumbnail URL");
         }

         dispatch(setUploadedFiles({ videoUrl, thumbnailUrl, duration }));

         generateTranscript(videoUrl);

         dispatch(nextStep());
      } catch (error) {
         console.error("Upload error:", error);
         form.setError("root", {
            message: error?.data?.message || error?.message || "Upload failed",
         });
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
               <h2 className="text-xl font-semibold">
                  Upload Video & Thumbnail
               </h2>
               <p className="text-muted-foreground text-sm mt-1">
                  Select your video file and a thumbnail image
               </p>
            </div>

            {/* Video Upload */}
            <FormField
               control={form.control}
               name="videoFile"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Video File *</FormLabel>
                     <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                           <Input
                              type="file"
                              accept="video/*"
                              className="hidden"
                              id="video-upload"
                              onChange={(e) =>
                                 handleFileChange(
                                    field,
                                    e.target.files?.[0],
                                    "video"
                                 )
                              }
                           />
                           {previews.video ? (
                              <div className="relative">
                                 <video
                                    src={previews.video}
                                    className="max-h-40 mx-auto rounded"
                                    controls={false}
                                 />
                                 <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-6 w-6"
                                    onClick={() => clearFile(field, "video")}
                                 >
                                    <X className="h-4 w-4" />
                                 </Button>
                                 <p className="text-sm text-muted-foreground mt-2">
                                    {field.value?.name}
                                 </p>
                              </div>
                           ) : (
                              <label
                                 htmlFor="video-upload"
                                 className="cursor-pointer flex flex-col items-center"
                              >
                                 <Video className="h-10 w-10 text-muted-foreground mb-2" />
                                 <span className="text-muted-foreground">
                                    Click to select video
                                 </span>
                              </label>
                           )}
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Thumbnail Upload */}
            <FormField
               control={form.control}
               name="thumbnail"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Thumbnail *</FormLabel>
                     <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                           <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="thumbnail-upload"
                              onChange={(e) =>
                                 handleFileChange(
                                    field,
                                    e.target.files?.[0],
                                    "thumbnail"
                                 )
                              }
                           />
                           {previews.thumbnail ? (
                              <div className="relative">
                                 <img
                                    src={previews.thumbnail}
                                    alt="Thumbnail preview"
                                    className="max-h-40 mx-auto rounded object-cover"
                                 />
                                 <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-6 w-6"
                                    onClick={() =>
                                       clearFile(field, "thumbnail")
                                    }
                                 >
                                    <X className="h-4 w-4" />
                                 </Button>
                                 <p className="text-sm text-muted-foreground mt-2">
                                    {field.value?.name}
                                 </p>
                              </div>
                           ) : (
                              <label
                                 htmlFor="thumbnail-upload"
                                 className="cursor-pointer flex flex-col items-center"
                              >
                                 <Image className="h-10 w-10 text-muted-foreground mb-2" />
                                 <span className="text-muted-foreground">
                                    Click to select thumbnail
                                 </span>
                              </label>
                           )}
                        </div>
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* Root Error */}
            {form.formState.errors.root && (
               <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
                  {form.formState.errors.root.message}
               </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
               {isLoading ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Uploading...
                  </>
               ) : (
                  <>
                     <Upload className="mr-2 h-4 w-4" />
                     Upload & Continue
                  </>
               )}
            </Button>
         </form>
      </Form>
   );
}

export default UploadStep;
