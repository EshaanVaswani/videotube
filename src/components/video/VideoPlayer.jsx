import { useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Slider } from "@/components/ui/slider";
import { VideoSettings } from "@/components/video/VideoSettings";
import { VideoControls } from "@/components/video/VideoControls";

import {
   setPlaying,
   setCurrentTime,
   toggleFullscreen,
} from "@/store/reducers/videoReducer";
import { useViewVideoMutation } from "@/store/api/videoApi";

export const VideoPlayer = ({ videoId, video, thumbnail }) => {
   const dispatch = useDispatch();
   const location = useLocation();

   const videoRef = useRef(null);
   const containerRef = useRef(null);

   const segmentStartRef = useRef(null);
   const totalWatchTimeRef = useRef(0);
   const unsentWatchTimeRef = useRef(0);

   const heartbeatIntervalRef = useRef(null);
   const prevPathRef = useRef(location.pathname);

   const [viewVideo] = useViewVideoMutation();

   const {
      isPlaying,
      volume,
      isMuted,
      playbackRate,
      currentTime,
      isTheaterMode,
   } = useSelector((state) => state.videoPlayer);

   const handlePlay = () => {
      if (videoRef.current) {
         segmentStartRef.current = videoRef.current.currentTime;
      }
   };

   const accumulateActiveSegment = () => {
      if (segmentStartRef.current == null || !videoRef.current) return;

      const start = segmentStartRef.current;
      const end = videoRef.current.currentTime ?? start;
      const delta = Math.abs(end - start);

      if (!isNaN(delta) && delta >= 0.5) {
         totalWatchTimeRef.current += delta;
         unsentWatchTimeRef.current += delta;
      }

      segmentStartRef.current = null;
   };

   const sendWatchData = async (force = false) => {
      const toSend = Math.floor(unsentWatchTimeRef.current);

      if (toSend < 1 && !force) {
         return;
      }

      try {
         await viewVideo({
            videoId,
            watchTime: toSend,
         }).unwrap();
      } catch (err) {
         // Fail silently
      }

      unsentWatchTimeRef.current = 0;
   };

   const handlePause = () => {
      accumulateActiveSegment();
   };

   const handleSeeked = () => {
      accumulateActiveSegment();
      if (videoRef.current) {
         segmentStartRef.current = videoRef.current.currentTime;
      }
   };

   const handleEnded = () => {
      if (videoRef.current) {
         if (segmentStartRef.current != null) {
            const start = segmentStartRef.current;
            const end = videoRef.current.duration;
            const delta = Math.abs(end - start);

            if (!isNaN(delta) && delta >= 0.5) {
               totalWatchTimeRef.current += delta;
               unsentWatchTimeRef.current += delta;
            }
            segmentStartRef.current = null;
         }
      }
      sendWatchData(true);
   };

   useEffect(() => {
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.play().catch(() => {});
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
      const handleFullscreenChange = () => dispatch(toggleFullscreen());
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
         document.removeEventListener(
            "fullscreenchange",
            handleFullscreenChange
         );
   }, [dispatch]);

   useEffect(() => {
      const handleVisibility = () => {
         if (document.visibilityState === "hidden") {
            accumulateActiveSegment();
            sendWatchData();
         }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      return () =>
         document.removeEventListener("visibilitychange", handleVisibility);
   }, []);

   useEffect(() => {
      const handleBeforeUnload = () => {
         accumulateActiveSegment();
         sendWatchData(true);
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
         window.removeEventListener("beforeunload", handleBeforeUnload);
   }, []);

   useEffect(() => {
      if (prevPathRef.current !== location.pathname) {
         accumulateActiveSegment();
         sendWatchData();
         prevPathRef.current = location.pathname;
      }
   }, [location]);

   useEffect(() => {
      heartbeatIntervalRef.current = setInterval(() => {
         accumulateActiveSegment();
         sendWatchData();
      }, 30000);
      return () => clearInterval(heartbeatIntervalRef.current);
   }, []);

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
            onEnded={handleEnded}
            onPlay={handlePlay}
            onPause={handlePause}
            onSeeked={handleSeeked}
         />

         <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
            {!isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="rounded-full bg-white/30 p-4 sm:p-6">
                     <Play className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
               </div>
            )}
         </div>

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
