import { useSelector } from "react-redux";
import {
   AlertTriangle,
   Bookmark,
   Download,
   Lock,
   Play,
   PlaySquare,
   Shuffle,
} from "lucide-react";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoList } from "@/components/video/VideoList";

import { useGetWatchLaterVideosQuery } from "@/store/api/playlistApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WatchLater = () => {
   const user = useSelector((state) => state.auth.user);

   const { data, isLoading } = useGetWatchLaterVideosQuery();

   if (isLoading) {
      return <Loader />;
   }

   return (
      <div className="px-4 md:px-6 py-4 max-w-screen-2xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SECTION */}
            <div className="lg:col-span-1 space-y-4">
               <div className="relative aspect-video w-full">
                  <img
                     src={data?.videos?.[0]?.thumbnail}
                     alt={data?.videos?.[0]?.title}
                     className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                     <PlaySquare className="size-16 text-white" />
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <h1 className="text-xl md:text-2xl font-semibold">
                        Watch Later
                     </h1>
                     <Lock className="size-5 text-muted-foreground" />
                  </div>

                  <div className="flex items-center gap-3">
                     <Avatar className="rounded-full size-8 hover:opacity-75 transition">
                        <AvatarImage
                           className="rounded-md"
                           alt={user?.username}
                           src={user?.avatar}
                        />
                        <AvatarFallback className="rounded-full bg-sky-500 text-white">
                           {user?.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                     </Avatar>
                     <div>{user?.fullName}</div>
                  </div>

                  <span className="text-xs sm:text-sm text-muted-foreground">
                     {data?.videosCount || 0} videos
                  </span>

                  <div className="flex flex-col gap-3">
                     <Button size="icon" variant="ghost">
                        <Download />
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
               {!data || data.videosCount === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
                     <AlertTriangle />
                     <p className="text-lg mt-4">No videos in watch later</p>
                  </div>
               ) : (
                  <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                     <VideoList videos={data?.videos} variant="watch-later" />
                  </ScrollArea>
               )}
            </div>
         </div>
      </div>
   );
};

export default WatchLater;
