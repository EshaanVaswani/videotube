import { useSelector } from "react-redux";
import {
   AlertTriangle,
   Bookmark,
   Lock,
   Play,
   PlaySquare,
   Shuffle,
} from "lucide-react";

import { Loader } from "@/components/Loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoList } from "@/components/video/VideoList";

import { useGetLikedVideosQuery } from "@/store/api/likeApi";
import { Button } from "@/components/ui/button";

const LikedVideos = () => {
   const user = useSelector((state) => state.auth.user);

   const { data, isLoading } = useGetLikedVideosQuery();

   if (isLoading) {
      return <Loader />;
   }

   if (!data) {
      return (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
            <AlertTriangle />
            <p className="text-lg mt-4">No liked videos</p>
         </div>
      );
   }

   return (
      <div className="px-4 md:px-6 py-4 max-w-screen-2xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SECTION */}
            <div className="lg:col-span-1 space-y-4">
               <div className="relative aspect-video w-full">
                  <img
                     src={data.likedVideos[0].thumbnail}
                     alt={data.likedVideos[0].title}
                     className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <PlaySquare className="size-16 text-white" />
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <h1 className="text-xl md:text-2xl font-semibold">
                        Liked Videos
                     </h1>
                     <Lock className="size-5 text-muted-foreground" />
                  </div>

                  <div>{user?.fullName}</div>

                  <span className="text-xs sm:text-sm text-muted-foreground">
                     {data.videosCount} videos
                  </span>

                  <div className="flex flex-col gap-3">
                     <Button size="icon" variant="ghost">
                        <Bookmark />
                     </Button>
                     <div className="flex items-center gap-5">
                        <Button className="gap-2 w-1/2 rounded-full">
                           <Play className="size-4" />
                           Play All
                        </Button>
                        <Button
                           className="gap-2 w-1/2 rounded-full"
                           variant="secondary"
                        >
                           <Shuffle className="size-4" />
                           Shuffle
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="lg:col-span-2">
               <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                  <VideoList videos={data.likedVideos} variant="liked" />
               </ScrollArea>
            </div>
         </div>
      </div>
   );
};

export default LikedVideos;
