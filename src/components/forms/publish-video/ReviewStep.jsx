import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import {
   ArrowLeft,
   Loader2,
   CheckCircle,
   FileText,
   Tag,
   Folder,
   Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { close } from "@/store/reducers/videoModalReducer";
import { resetVideoUpload, prevStep } from "@/store/reducers/videoFormReducer";
import { usePublishVideoMutation } from "@/store/api/videoApi";

export const ReviewStep = () => {
   const dispatch = useDispatch();
   const [publish, { isLoading }] = usePublishVideoMutation();

   const { uploadedFiles, formData, transcript } = useSelector(
      (state) => state.videoForm
   );

   const { videoUrl, thumbnailUrl, duration } = uploadedFiles;
   const { title, description, tags, category } = formData;

   const formatDuration = (seconds) => {
      if (!seconds) return "Unknown";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
   };

   const handlePublish = async () => {
      if (!videoUrl || !thumbnailUrl) {
         toast.error(
            "Video and thumbnail are required. Please go back to upload."
         );
         return;
      }

      if (!title || !description) {
         toast.error("Title and description are required.");
         return;
      }

      try {
         const res = await publish({
            title,
            description,
            transcript: transcript.text || "",
            tags: tags || [],
            category: category || "",
            thumbnailUrl,
            videoUrl,
            duration: duration || 0,
         }).unwrap();

         if (res.success) {
            toast.success(res.message || "Video published successfully!");
            dispatch(resetVideoUpload());
            dispatch(close());
         }
      } catch (err) {
         console.error("Publish error:", err);
         toast.error(err?.data?.message || "Failed to publish video");
      }
   };

   return (
      <div className="space-y-6 h-full flex flex-col">
         <div>
            <h2 className="text-xl font-semibold">Review & Publish</h2>
            <p className="text-muted-foreground text-sm mt-1">
               Review your video details before publishing
            </p>
         </div>

         <div className="space-y-4 flex-grow overflow-auto">
            {thumbnailUrl && (
               <div className="rounded-lg overflow-hidden border">
                  <img
                     src={thumbnailUrl}
                     alt="Thumbnail"
                     className="w-full h-40 object-cover"
                  />
               </div>
            )}

            {/* Title & Description */}
            <div className="space-y-2">
               <h3 className="font-semibold text-lg">{title || "No title"}</h3>
               <p className="text-muted-foreground text-sm line-clamp-3">
                  {description || "No description"}
               </p>
            </div>

            {/* Duration */}
            {duration && (
               <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Duration:</span>
                  <span className="text-muted-foreground">
                     {formatDuration(duration)}
                  </span>
               </div>
            )}

            {/* Transcript */}
            <div className="flex items-start gap-2 text-sm">
               <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
               <div>
                  <span className="font-medium">Transcript:</span>
                  <span className="text-muted-foreground ml-2">
                     {transcript.text
                        ? `${transcript.text.slice(0, 100)}${
                             transcript.text.length > 100 ? "..." : ""
                          }`
                        : "No transcript"}
                  </span>
               </div>
            </div>

            {/* Category */}
            {category && (
               <div className="flex items-center gap-2 text-sm">
                  <Folder className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Category:</span>
                  <span className="text-muted-foreground">{category}</span>
               </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
               <div className="flex items-start gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground mt-1" />
                  <div className="flex flex-wrap gap-1">
                     {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                           {tag}
                        </Badge>
                     ))}
                  </div>
               </div>
            )}

            {(!videoUrl || !thumbnailUrl) && (
               <div className="text-red-500 text-sm bg-red-50 dark:bg-red-950 p-3 rounded-lg">
                  ⚠️ Video or thumbnail not uploaded. Please go back to upload.
               </div>
            )}
         </div>

         <div className="flex justify-between">
            <Button
               variant="outline"
               onClick={() => dispatch(prevStep())}
               disabled={isLoading}
            >
               <ArrowLeft className="mr-2 h-4 w-4" />
               Back
            </Button>
            <Button
               onClick={handlePublish}
               disabled={isLoading || !videoUrl || !thumbnailUrl}
            >
               {isLoading ? (
                  <>
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     Publishing...
                  </>
               ) : (
                  <>
                     <CheckCircle className="mr-2 h-4 w-4" />
                     Publish Video
                  </>
               )}
            </Button>
         </div>
      </div>
   );
};

export default ReviewStep;
