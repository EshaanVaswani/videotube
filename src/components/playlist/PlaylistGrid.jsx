import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { PlaylistCard } from "@/components/playlist/PlaylistCard";

import { open } from "@/store/reducers/playlistModalReducer";

export const PlaylistGrid = ({ playlists, channelId }) => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);

   return (
      <>
         {!playlists.length ? (
            <div className="flex flex-col items-center justify-center text-center gap-4 p-8">
               {user?._id !== channelId ? (
                  <p>This channel has no playlists.</p>
               ) : (
                  <>
                     <p>You haven't created any playlist.</p>
                     <Button onClick={() => dispatch(open(""))}>
                        <Plus />
                        Create Playlist
                     </Button>
                  </>
               )}
            </div>
         ) : (
            <div>
               <h1>Created playlists</h1>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                  {playlists?.map((playlist) => (
                     <PlaylistCard key={playlist?._id} playlist={playlist} />
                  ))}
               </div>
            </div>
         )}
      </>
   );
};
