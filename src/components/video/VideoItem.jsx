import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { formatDuration } from "@/lib/utils";

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
            <div className="flex items-center justify-between">
               <h3 className="font-medium text-sm line-clamp-2">
                  {video.title}
               </h3>
               <VideoActions video={video} variant={variant} />
            </div>
            <Link to={`/channel/@${video.owner.username}`}>
               <p className="text-sm text-muted-foreground mt-1 hover:text-white">
                  {video.owner.fullName}
               </p>
            </Link>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
               <span>{video.views} views</span>
               <span className="mx-1">•</span>
               <span>{formatDistanceToNow(new Date(video.createdAt))} ago</span>
            </div>
         </div>
      </Link>
   );
};
