import { useGetChannelVideosQuery } from "@/store/api/dashboardApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoGrid } from "@/components/video/VideoGrid";
import { TweetSection } from "@/components/tweet/TweetSection";
import { useParams, useSearchParams } from "react-router-dom";
import { TweetForm } from "@/components/forms/TweetForm";

const Content = () => {
   const { data: videos, isLoading: videosLoading } =
      useGetChannelVideosQuery();

   const { userId } = useParams();

   const params = useSearchParams();

   const tab = params[0].get("tab");

   if (!videos) return null;

   return (
      <div>
         <h1 className="text-3xl font-bold p-6">Channel content</h1>

         <Tabs defaultValue={tab || "videos"} className="px-6">
            <TabsList className="w-full sm:w-auto">
               <TabsTrigger value="videos" className="flex-1 sm:flex-none">
                  Videos
               </TabsTrigger>
               <TabsTrigger value="posts" className="flex-1 sm:flex-none">
                  Posts
               </TabsTrigger>
               <TabsTrigger value="playlists" className="flex-1 sm:flex-none">
                  Playlists
               </TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-6">
               <VideoGrid videos={videos} variant="channel" />
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
               <TweetForm />
               <TweetSection channelId={userId} />
            </TabsContent>

            <TabsContent value="playlists" className="mt-6"></TabsContent>
         </Tabs>
      </div>
   );
};

export default Content;
