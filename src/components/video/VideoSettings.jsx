import { useDispatch, useSelector } from "react-redux";
import {
   CirclePlay,
   Maximize,
   Minimize,
   RectangleHorizontal,
   Settings,
   SlidersHorizontal,
} from "lucide-react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
   setPlaybackRate,
   setQuality,
   toggleTheaterMode,
} from "@/store/reducers/videoReducer";

export const VideoSettings = ({ containerRef }) => {
   const dispatch = useDispatch();

   const { isFullscreen } = useSelector((state) => state.videoPlayer);

   const handleFullscreen = async () => {
      if (!document.fullscreenElement) {
         await containerRef.current?.requestFullscreen();
      } else {
         await document.exitFullscreen();
      }
   };

   return (
      <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
         {/* Settings Dropdown */}
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  aria-label="Settings"
               >
                  <Settings className="h-6 w-6" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
               {/* Playback Speed Submenu */}
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center space-x-2">
                     <CirclePlay className="h-5 w-5" />
                     <span>Playback Speed</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent align="end">
                     <DropdownMenuItem
                        onClick={() => dispatch(setPlaybackRate(0.5))}
                     >
                        0.5x
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => dispatch(setPlaybackRate(1))}
                     >
                        1x
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => dispatch(setPlaybackRate(1.5))}
                     >
                        1.5x
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => dispatch(setPlaybackRate(2))}
                     >
                        2x
                     </DropdownMenuItem>
                  </DropdownMenuSubContent>
               </DropdownMenuSub>

               {/* Quality Submenu */}
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center space-x-2">
                     <SlidersHorizontal className="h-5 w-5" />
                     <span>Quality</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent align="end">
                     <DropdownMenuItem
                        onClick={() => dispatch(setQuality("auto"))}
                     >
                        Auto
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => dispatch(setQuality("1080p"))}
                     >
                        1080p
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => dispatch(setQuality("720p"))}
                     >
                        720p
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => dispatch(setQuality("480p"))}
                     >
                        480p
                     </DropdownMenuItem>
                  </DropdownMenuSubContent>
               </DropdownMenuSub>
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Theater Mode */}
         <Button
            variant="ghost"
            size="icon"
            className="text-white"
            aria-label="Theater Mode"
            onClick={() => dispatch(toggleTheaterMode())}
         >
            <RectangleHorizontal className="h-6 w-6" />
         </Button>

         {/* Fullscreen */}
         <Button
            variant="ghost"
            size="icon"
            className="text-white"
            aria-label="Fullscreen"
            onClick={handleFullscreen}
         >
            {isFullscreen ? (
               <Minimize className="h-6 w-6" />
            ) : (
               <Maximize className="h-6 w-6" />
            )}
         </Button>
      </div>
   );
};
