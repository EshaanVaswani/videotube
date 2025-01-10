import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
import { VideoList } from "@/components/video/VideoList";

const Watch = () => {
   const { videoId } = useParams();

   const { video, isLoading, error } = useGetVideoData(videoId);

   const user = useSelector((state) => state.auth.user);
   const isTheaterMode = useSelector(
      (state) => state.videoPlayer.isTheaterMode
   );

   const [viewVideo] = useViewVideoMutation();

   useEffect(() => {
      const view = async () => {
         if (videoId && video?.isPublished && video?.owner._id === user?._id) {
            await viewVideo(videoId).unwrap();
         }
      };

      view();
   }, [video, videoId, viewVideo]);

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

   if (video.owner._id !== user._id && !video.isPublished) {
      return (
         <Error
            error="Video is private"
            description="This video is private. Try contacting the channel owner."
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

   return <VideoList videos={filteredVideos} />;
};

export default Watch;
