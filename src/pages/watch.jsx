import { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Link, useParams } from "react-router-dom";

import { formatDuration } from "@/lib/utils";

import { Error } from "@/components/Error";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/navigation/Navbar";
import { VideoInfo } from "@/components/video/VideoInfo";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { VideoSkeleton } from "@/components/skeleton/VideoSkeleton";
import CommentSection from "@/components/comment/CommentSection";

import {
   useGetVideoData,
   useGetVideosQuery,
   useViewVideoMutation,
} from "@/store/api/videoApi";

const Watch = () => {
   const { videoId } = useParams();

   const { video, isLoading, error } = useGetVideoData(videoId);

   const isTheaterMode = useSelector(
      (state) => state.videoPlayer.isTheaterMode
   );

   const [viewVideo] = useViewVideoMutation();

   useEffect(() => {
      const view = async () => {
         if (videoId) {
            await viewVideo(videoId).unwrap();
         }
      };

      view();
   }, [videoId, viewVideo]);

   if (isLoading) return <VideoSkeleton />;

   if (error) {
      let errorMessage = "Something went wrong";
      if (error?.data) {
         const match = error.data.match(/Error: (.+?)<\/pre>/);

         if (match && match[1]) {
            errorMessage = match[1];
         }
      }

      return (
         <Error
            error={errorMessage}
            description="Something went wrong. Please try again."
            buttonLabel={"Go to Home"}
            buttonLink={"/"}
         />
      );
   }

   return (
      <div className="min-h-screen bg-background">
         <Navbar />
         <main
            className={`w-full my-16 pb-8 ${
               isTheaterMode ? "" : "max-w-screen-2xl mx-auto"
            }`}
         >
            <div className="flex flex-col lg:flex-row">
               <div
                  className={`flex-1 ${
                     isTheaterMode ? "w-full" : "px-4 sm:px-6"
                  }`}
               >
                  <div
                     className={`top-16 z-20 bg-background ${
                        isTheaterMode ? "w-full" : ""
                     }`}
                  >
                     <div className={`${isTheaterMode ? "" : "aspect-video"}`}>
                        <VideoPlayer
                           video={video.videoFile}
                           thumbnail={video.thumbnail}
                        />
                     </div>
                  </div>

                  <VideoInfo video={video} />
                  <CommentSection videoId={videoId} />
               </div>

               {!isTheaterMode && (
                  <div className="w-full lg:w-[400px] xl:w-[450px] p-2 sm:p-4">
                     <h1 className="hidden sm:block mb-4">Suggested Videos</h1>
                     <div className="space-y-4">
                        <SuggestedVideos currentVideoId={videoId} />
                     </div>
                  </div>
               )}
            </div>
         </main>
      </div>
   );
};

const SuggestedVideos = ({ currentVideoId }) => {
   const { data: videos } = useGetVideosQuery({
      page: 1,
      limit: 10,
   });

   const filteredVideos = videos?.filter(
      (video) => video._id !== currentVideoId
   );

   if (!filteredVideos?.length) {
      return (
         <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
               <Skeleton key={i} className="h-24 w-full" />
            ))}
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 gap-3">
         {filteredVideos.map((video) => (
            <Link
               key={video._id}
               to={`/watch/${video._id}`}
               className="flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
            >
               <div className="relative w-40 h-24 flex-shrink-0">
                  <img
                     src={video.thumbnail}
                     alt={video.title}
                     className="w-full h-full object-cover rounded-lg"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                     {formatDuration(video.duration)}
                  </span>
               </div>
               <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2">
                     {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                     {video.owner.username}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                     <span>{video.views} views</span>
                     <span className="mx-1">•</span>
                     <span>
                        {formatDistanceToNow(new Date(video.createdAt))} ago
                     </span>
                  </div>
               </div>
            </Link>
         ))}
      </div>
   );
};

export default Watch;
