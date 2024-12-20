import { useDispatch, useSelector } from "react-redux";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

import { formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { setMuted, setPlaying, setVolume } from "@/store/reducers/videoReducer";

export const VideoControls = ({ videoRef }) => {
   const dispatch = useDispatch();

   const { isPlaying, volume, isMuted, currentTime } = useSelector(
      (state) => state.videoPlayer
   );

   const togglePlay = () => {
      dispatch(setPlaying(!isPlaying));
   };

   const handleVolumeChange = (value) => {
      dispatch(setVolume(value[0]));
   };

   const toggleMute = () => {
      dispatch(setMuted(!isMuted));
   };

   return (
      <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
         {/* Play/Pause Button */}
         <Button
            variant="ghost"
            size="icon"
            className="text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={togglePlay}
         >
            {isPlaying ? (
               <Pause className="h-6 w-6" />
            ) : (
               <Play className="h-6 w-6" />
            )}
         </Button>

         {/* Volume Control */}
         <div className="flex items-center space-x-2">
            <Button
               variant="ghost"
               size="icon"
               className="text-white"
               aria-label={isMuted ? "Unmute" : "Mute"}
               onClick={toggleMute}
            >
               {isMuted || volume === 0 ? (
                  <VolumeX className="h-6 w-6" />
               ) : (
                  <Volume2 className="h-6 w-6" />
               )}
            </Button>
            <Slider
               value={[isMuted ? 0 : volume]}
               max={1}
               step={0.01}
               className="w-24 sm:w-32"
               onValueChange={handleVolumeChange}
            />
         </div>

         <span className="text-white text-sm sm:text-base">
            {formatDuration(currentTime)} /{" "}
            {formatDuration(videoRef.current?.duration || 0)}
         </span>
      </div>
   );
};
