import { formatDistanceToNow } from "date-fns";
import {
   Bell,
   Bookmark,
   Download,
   Share2,
   ThumbsDown,
   ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const VideoInfo = ({ video }) => {
   return (
      <div className="mt-4 max-w-[1280px] mx-auto px-2 sm:px-4">
         <h1 className="text-lg sm:text-xl font-bold break-words">
            {video.title}
         </h1>

         <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
            {/* Channel Info */}
            <div className="flex items-center gap-4">
               <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src={video.owner.avatar} />
                  <AvatarFallback className="rounded-full text-white bg-sky-500">
                     {video.owner.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base">
                     {video.owner.fullName}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                     {video.owner.subscriberCount} subscribers
                  </p>
               </div>
               <Button
                  variant="secondary"
                  className="text-xs sm:text-sm whitespace-nowrap"
               >
                  {video.owner.isSubscribed ? (
                     <div className="flex items-center gap-2">
                        <Bell fill="currentColor" />
                        <span className="hidden sm:inline">Subscribed</span>
                     </div>
                  ) : (
                     "Subscribe"
                  )}
               </Button>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2">
               <div className="flex rounded-full bg-gray-100 dark:bg-gray-800">
                  <Button variant="ghost" size="sm" className="rounded-l-full">
                     {video.isLiked ? (
                        <ThumbsUp
                           fill="currentColor"
                           className="mr-1 h-4 w-4"
                        />
                     ) : (
                        <ThumbsUp className="mr-1 h-4 w-4" />
                     )}
                     {video.likeCount}
                  </Button>
                  <Button
                     variant="ghost"
                     size="sm"
                     className="rounded-r-full border-l border-gray-200 dark:border-gray-700"
                  >
                     <ThumbsDown className="h-4 w-4" />
                  </Button>
               </div>

               <Button variant="ghost" size="sm" className="rounded-full">
                  <Share2 className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Share</span>
               </Button>

               <Button variant="ghost" size="sm" className="rounded-full">
                  <Download className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Download</span>
               </Button>

               <Button variant="ghost" size="sm" className="rounded-full">
                  <Bookmark className="mr-1 h-4 w-4" />
                  <span className="hidden md:inline">Save</span>
               </Button>
            </div>
         </div>

         {/* Description Card */}
         <Card className="mt-4">
            <CardContent className="p-2 sm:p-4">
               <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>
                     {formatDistanceToNow(new Date(video.createdAt))} ago
                  </span>
               </div>
               <p className="mt-2 whitespace-pre-wrap text-xs sm:text-sm">
                  {video.description}
               </p>
            </CardContent>
         </Card>
      </div>
   );
};
