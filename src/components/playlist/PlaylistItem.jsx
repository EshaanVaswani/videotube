import { memo } from "react";
import { Globe, Lock } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

export const PlaylistItem = memo(({ playlist, videoId, onChange }) => {
   return (
      <div className="flex items-center justify-center space-x-6 space-y-2">
         <Checkbox
            id={playlist._id}
            checked={playlist.videos.includes(videoId)}
            onCheckedChange={(checked) => onChange(checked, playlist._id)}
         />
         <div className="flex items-center justify-between w-2/3">
            <label
               htmlFor={playlist._id}
               className="cursor-pointer font-medium"
            >
               {playlist.name}
            </label>
            {playlist.visibility ? (
               <Globe className="size-4" />
            ) : (
               <Lock className="size-4" />
            )}
         </div>
      </div>
   );
});
