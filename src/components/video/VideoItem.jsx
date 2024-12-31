import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { formatDuration } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { VideoActions } from "@/components/video/VideoActions";

export const VideoItem = ({ video: v, variant = "default" }) => {
   const video =
      variant === "playlist"
         ? {
              ...v,
              owner: v.owner[0],
           }
         : v;

   return (
      <div className="flex gap-2 rounded-lg p-2 group relative">
         <Link to={`/watch/${video._id}`} className="flex gap-2 flex-1">
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
            <div className="flex-1">
               <h3 className="font-medium text-sm">{video.title}</h3>
               <Link to={`/channel/@${video.owner.username}`}>
                  {variant !== "history" && (
                     <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                           <AvatarImage
                              src={video.owner.avatar}
                              alt={video.owner.fullName}
                           />
                        </Avatar>
                        <p className="text-sm text-muted-foreground mt-1 hover:text-white">
                           {video.owner.fullName}
                        </p>
                     </div>
                  )}
                  {variant === "history" && (
                     <>
                        <div className="flex text-muted-foreground text-xs">
                           <span>{video.owner.fullName}</span>
                           <span className="mx-1 ">•</span>
                           <span>{video.views} views</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                           {video.description}
                        </span>
                     </>
                  )}
               </Link>
               {variant !== "history" && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                     <span>{video.views} views</span>
                     <span className="mx-1">•</span>
                     <span>
                        {formatDistanceToNow(new Date(video.createdAt))} ago
                     </span>
                  </div>
               )}
            </div>
         </Link>
         <div className="absolute top-2 right-2">
            <VideoActions video={video} variant={variant} />
         </div>
      </div>
   );
};
