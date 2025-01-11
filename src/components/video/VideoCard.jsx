import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import { cn, formatDuration } from "@/lib/utils";

import { VideoActions } from "@/components/video/VideoActions";

export const VideoCard = ({ video, variant = "default" }) => {
   const navigate = useNavigate();

   return (
      <Link to={`/watch/${video._id}`}>
         <div className="flex flex-col gap-2">
            <div className="relative aspect-video rounded-xl overflow-hidden group">
               <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={cn(
                     "w-80 aspect-video object-cover",
                     variant !== "channel" &&
                        "w-full h-full group-hover:scale-105 transform transition-transform duration-300"
                  )}
               />
               <div className="absolute bottom-1 right-2 text-white z-40 text-sm bg-black/50 px-2 py-1 rounded">
                  {formatDuration(video.duration)}
               </div>
            </div>
            <div className="flex gap-3">
               {variant !== "channel" && (
                  <div className="flex-shrink-0">
                     <div
                        onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           navigate(`/channel/@${video.owner.username}`);
                        }}
                     >
                        <img
                           src={video.owner.avatar}
                           alt={video.owner.username}
                           className="w-10 h-10 rounded-full"
                        />
                     </div>
                  </div>
               )}
               <div className="flex-1">
                  <h3 className="font-medium line-clamp-2">{video.title}</h3>
                  {variant !== "channel" && (
                     <div
                        onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           navigate(`/channel/@${video.owner.username}`);
                        }}
                     >
                        <p className="text-sm text-gray-600 mt-0.5 hover:text-white">
                           {video.owner.username}
                        </p>
                     </div>
                  )}
                  <div className="text-sm text-gray-600">
                     {video.views} views •{" "}
                     {formatDistanceToNow(new Date(video.createdAt), {
                        addSuffix: true,
                     })}
                  </div>
               </div>
               <VideoActions video={video} />
            </div>
         </div>
      </Link>
   );
};
