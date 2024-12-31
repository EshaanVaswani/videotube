import { Link } from "react-router-dom";
import { Globe, Lock, Play, PlaySquare, Share2, Trash2 } from "lucide-react";
import { PlaylistActions } from "./PlaylistActions";

export const PlaylistInfo = ({ playlist }) => {
   return (
      <div className="lg:col-span-1 space-y-4">
         <div className="relative aspect-video w-full">
            <img
               src={playlist.playlistVideos[0]?.thumbnail}
               alt={playlist.name}
               className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <PlaySquare className="size-16 text-white" />
            </div>
         </div>

         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <h1 className="text-xl md:text-2xl font-semibold">
                  {playlist.name}
               </h1>
               {playlist.visibility ? (
                  <Globe className="size-5 text-muted-foreground" />
               ) : (
                  <Lock className="size-5 text-muted-foreground" />
               )}
            </div>

            <div className="flex items-center gap-2">
               <Link
                  to={`/channel/${playlist.owner._id}`}
                  className="flex items-center gap-2 hover:text-primary"
               >
                  <img
                     src={playlist.owner.avatar}
                     alt={playlist.owner.fullName}
                     className="size-8 rounded-full"
                  />
                  <span className="font-medium">{playlist.owner.fullName}</span>
               </Link>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
               <span>Playlist</span>
               <span>•</span>
               <span>{playlist.totalVideos} videos</span>
            </div>

            {playlist.description && (
               <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                  {playlist.description}
               </p>
            )}

            <PlaylistActions playlist={playlist} />
         </div>
      </div>
   );
};
