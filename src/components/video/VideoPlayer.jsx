import { useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Slider } from "@/components/ui/slider";
import { VideoSettings } from "@/components/video/VideoSettings";

import {
   setPlaying,
   setCurrentTime,
   toggleFullscreen,
} from "@/store/reducers/videoReducer";
import { VideoControls } from "./VideoControls";

export const VideoPlayer = ({ video, thumbnail }) => {
   const dispatch = useDispatch();

   const videoRef = useRef(null);
   const containerRef = useRef(null);

   const {
      isPlaying,
      volume,
      isMuted,
      playbackRate,
      currentTime,
      isTheaterMode,
   } = useSelector((state) => state.videoPlayer);

   useEffect(() => {
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.play();
         } else {
            videoRef.current.pause();
         }
      }
   }, [isPlaying]);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.volume = volume;
         videoRef.current.muted = isMuted;
      }
   }, [volume, isMuted]);

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current.playbackRate = playbackRate;
      }
   }, [playbackRate]);

   useEffect(() => {
      const handleFullscreenChange = () => {
         dispatch(toggleFullscreen());
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => {
         document.removeEventListener(
            "fullscreenchange",
            handleFullscreenChange
         );
      };
   }, [dispatch]);

   const handleTimeUpdate = () => {
      if (videoRef.current) {
         dispatch(setCurrentTime(videoRef.current.currentTime));
      }
   };

   const togglePlay = () => {
      dispatch(setPlaying(!isPlaying));
   };

   return (
      <div
         ref={containerRef}
         className={`relative group ${
            isTheaterMode
               ? "w-full h-[calc(100vh-64px)]"
               : "aspect-video w-full"
         }`}
      >
         <video
            ref={videoRef}
            src={video}
            poster={thumbnail}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
         />

         {/* Play Overlay */}
         <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
            {!isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="rounded-full bg-white/30 p-4 sm:p-6">
                     <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
               </div>
            )}
         </div>

         {/* Controls */}
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Slider
               value={[currentTime]}
               max={videoRef.current?.duration || 0}
               step={0.1}
               className="mb-2 sm:mb-4"
               onValueChange={(value) => {
                  if (videoRef.current) {
                     videoRef.current.currentTime = value[0];
                  }
               }}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between">
               <VideoControls videoRef={videoRef} />
               <VideoSettings containerRef={containerRef} />
            </div>
         </div>
      </div>
   );
};
