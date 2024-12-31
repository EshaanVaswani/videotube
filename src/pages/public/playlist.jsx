import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { Loader } from "@/components/Loader";
import { VideoList } from "@/components/video/VideoList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaylistInfo } from "@/components/playlist/PlaylistInfo";

import { useGetPlaylistByIdQuery } from "@/store/api/playlistApi";

const Playlist = () => {
   const { playlistId } = useParams();

   const { data: playlist, isLoading } = useGetPlaylistByIdQuery(playlistId);

   if (!playlist) {
      if (isLoading) {
         return <Loader />;
      }

      return (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
            <AlertTriangle className="size-8" />
            <p className="text-lg mt-4">Playlist not found</p>
         </div>
      );
   }

   return (
      <div className="px-4 md:px-6 py-4 max-w-screen-2xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PlaylistInfo playlist={playlist} />

            <div className="lg:col-span-2">
               <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                  {playlist.playlistVideos.length === 0 && (
                     <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
                        <AlertTriangle className="size-8" />
                        <p className="text-lg mt-4">No videos found</p>
                     </div>
                  )}
                  <VideoList
                     videos={playlist.playlistVideos}
                     variant="playlist"
                  />
               </ScrollArea>
            </div>
         </div>
      </div>
   );
};

export default Playlist;
