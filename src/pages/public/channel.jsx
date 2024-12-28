import { toast } from "sonner";
import { Bell, Flag, MoreVertical, Share2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";

import { Loader } from "@/components/Loader";
import { VideoGrid } from "@/components/video/VideoGrid";
import { TweetSection } from "@/components/tweet/TweetSection";
import { VideoCarousel } from "@/components/video/VideoCarousel";
import { ChannelSkeleton } from "@/components/skeleton/ChannelSkeleton";

import { useGetVideosQuery } from "@/store/api/videoApi";
import { useGetChannelProfileQuery } from "@/store/api/channelApi";
import { useToggleSubscriptionMutation } from "@/store/api/subscriptionApi";
import { PlaylistGrid } from "@/components/playlist/playlistGrid";
import { useGetPlaylistsQuery } from "@/store/api/playlistApi";

const Channel = () => {
   const { username: u } = useParams();
   const username = u.replace("@", "");
   const { data, isLoading } = useGetChannelProfileQuery(username);

   const [channel, setChannel] = useState(null);

   const { isLoggedIn, user } = useSelector((state) => state.auth);

   const { data: videos, isLoading: videosLoading } = useGetVideosQuery({
      page: 1,
      limit: 10,
      userId: channel?._id,
   });

   const { data: playlists, isLoading: playlistsLoading } =
      useGetPlaylistsQuery(channel?._id);

   const filteredPlaylists = playlists?.filter((playlist) => {
      if (!user) return playlist.visibility;

      if (user._id === playlist.owner._id) return true;

      return playlist.visibility;
   });

   const [toggleSubscribe] = useToggleSubscriptionMutation();

   useEffect(() => {
      if (data) {
         setChannel(data);
      }
   }, [data]);

   const handleSubscribe = async () => {
      if (!isLoggedIn) {
         toast.error("You need to login to subscribe to a channel");
         return;
      }

      try {
         const res = await toggleSubscribe(channel._id).unwrap();

         if (res.success) {
            setChannel((prev) => ({
               ...prev,
               isSubscribed: !prev.isSubscribed,
               subscribersCount: prev.isSubscribed
                  ? prev.subscribersCount - 1
                  : prev.subscribersCount + 1,
            }));

            toast.success(res.message);
         }
      } catch (error) {
         let errorMessage = "Something went wrong";
         if (error?.data) {
            const match = error.data.match(/Error: (.+?)<\/pre>/);

            if (match && match[1]) {
               errorMessage = match[1];
            }
         }

         toast.error(errorMessage);
      }
   };

   if (isLoading || !channel) return <ChannelSkeleton />;

   if (videosLoading || playlistsLoading) {
      return <Loader />;
   }

   return (
      <div className="w-full">
         <div className="w-full h-48 relative">
            <img
               src={channel.coverImage}
               alt="Channel Cover Image"
               className="w-full h-full object-cover rounded-2xl"
            />
         </div>

         <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start gap-4">
               <Avatar className="size-32">
                  <AvatarImage src={channel.avatar} alt={channel.username} />
               </Avatar>

               <div className="flex-grow">
                  <h1 className="text-4xl font-bold">{channel.fullName}</h1>
                  <div className="text-gray-600 mt-1">
                     <span className="text-black dark:text-white">
                        @{channel.username}
                     </span>{" "}
                     • {channel.subscribersCount} subscribers •{" "}
                     {channel.videosCount} videos
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                     <Button
                        onClick={handleSubscribe}
                        className={
                           channel.isSubscribed
                              ? "bg-gray-200 text-gray-800"
                              : ""
                        }
                     >
                        {channel.isSubscribed ? (
                           <>
                              <Bell className="h-5 w-5" />
                              Subscribed
                           </>
                        ) : (
                           "Subscribe"
                        )}
                     </Button>
                  </div>
               </div>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <MoreVertical />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>
                        <Share2 /> Share channel
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Flag /> Report user
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <Tabs defaultValue="home" className="mt-6">
               <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="home" className="flex-1 sm:flex-none">
                     Home
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex-1 sm:flex-none">
                     Videos
                  </TabsTrigger>
                  <TabsTrigger
                     value="playlists"
                     className="flex-1 sm:flex-none"
                  >
                     Playlists
                  </TabsTrigger>
                  <TabsTrigger
                     value="community"
                     className="flex-1 sm:flex-none"
                  >
                     Community
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="home" className="mt-6">
                  <VideoCarousel videos={videos} />
               </TabsContent>

               <TabsContent value="videos" className="mt-6">
                  <VideoGrid videos={videos} variant="channel" />
               </TabsContent>

               <TabsContent value="playlists" className="mt-6">
                  <PlaylistGrid
                     playlists={filteredPlaylists}
                     channelId={channel._id}
                  />
               </TabsContent>

               <TabsContent value="community" className="mt-6">
                  <TweetSection channelId={channel._id} />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   );
};

export default Channel;
