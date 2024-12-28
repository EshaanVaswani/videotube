import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PlaySquare } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const PlaylistCard = ({ playlist }) => {
   return (
      <Link to={`/playlist/${playlist._id}`}>
         <Card className="w-72 hover:bg-accent/50 transition-colors group">
            <CardContent className="p-0">
               <div className="relative">
                  {playlist?.playlistVideos?.[0] ? (
                     <div className="relative">
                        <img
                           src={playlist.playlistVideos[0].thumbnail}
                           alt={playlist.name}
                           className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <PlaySquare className="size-12 text-white" />
                        </div>
                     </div>
                  ) : (
                     <div className="w-full h-40 bg-muted rounded-t-lg flex items-center justify-center">
                        <PlaySquare className="size-12 text-muted-foreground" />
                     </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                     <PlaySquare className="size-3" />
                     {playlist.totalVideos}{" "}
                     {playlist.totalVideos === 1 ? "video" : "videos"}
                  </div>
               </div>
               <div className="p-4">
                  <h3 className="font-medium line-clamp-2 flex-1">
                     {playlist.name}
                  </h3>
                  <span className="text-muted-foreground text-xs hover:text-white font-semibold">
                     View full playlist
                  </span>
               </div>
            </CardContent>
         </Card>
      </Link>
   );
};
