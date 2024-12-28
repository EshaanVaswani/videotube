import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, Clock, Download, MoreVertical, Share2 } from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn, formatDuration } from "@/lib/utils";
import { open } from "@/store/reducers/saveModalReducer";

export const VideoCard = ({ video, variant = "default" }) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const dispatch = useDispatch();

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
                     <Link to={`/channel/@${video.owner.username}`}>
                        <img
                           src={video.owner.avatar}
                           alt={video.owner.username}
                           className="w-10 h-10 rounded-full"
                        />
                     </Link>
                  </div>
               )}
               <div className="flex-1">
                  <h3 className="font-medium line-clamp-2">{video.title}</h3>
                  {variant !== "channel" && (
                     <Link to={`/channel/@${video.owner.username}`}>
                        <p className="text-sm text-gray-600 mt-0.5 hover:text-white">
                           {video.owner.username}
                        </p>
                     </Link>
                  )}
                  <div className="text-sm text-gray-600">
                     {video.views} views •{" "}
                     {formatDistanceToNow(new Date(video.createdAt), {
                        addSuffix: true,
                     })}
                  </div>
               </div>
               <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="icon" className="self-start">
                        <MoreVertical className="w-5 h-5" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem
                        onClick={(e) => {
                           e.stopPropagation();
                           setDropdownOpen(false);
                           dispatch(open(video._id));
                        }}
                     >
                        <Bookmark /> Save to playlist
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Clock /> Save to Watch Later
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Download /> Download
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Share2 /> Share
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </Link>
   );
};
