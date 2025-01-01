import { useParams } from "react-router-dom";

import { Loader } from "@/components/Loader";
import { TweetForm } from "@/components/forms/TweetForm";
import { TweetSection } from "@/components/tweet/TweetSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardVideosTable } from "@/components/dashboard/DashboardVideosTable";
import { DashboardPlaylistsTable } from "@/components/dashboard/DashboardPlaylistsTable";

import { useGetPlaylistsQuery } from "@/store/api/playlistApi";
import { useGetChannelVideosQuery } from "@/store/api/dashboardApi";

const Content = () => {
   const { userId } = useParams();

   const { data: videos, isLoading: videosLoading } =
      useGetChannelVideosQuery();
   const { data: playlists, isLoading: playlistsLoading } =
      useGetPlaylistsQuery(userId);

   if (videosLoading || playlistsLoading) return <Loader />;

   if (!videos || !playlists) return null;

   return (
      <div>
         <h1 className="text-3xl font-bold p-6">Channel content</h1>

         <Tabs defaultValue={"videos"} className="px-6">
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
               <DashboardVideosTable videos={videos} />
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
               <TweetForm />
               <TweetSection channelId={userId} />
            </TabsContent>

            <TabsContent value="playlists" className="mt-6">
               <DashboardPlaylistsTable playlists={playlists} />
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default Content;
