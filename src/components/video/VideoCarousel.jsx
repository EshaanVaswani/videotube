import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatDuration } from "@/lib/utils";
import { VideoCard } from "./VideoCard";

export const VideoCarousel = ({ videos, title = "Videos" }) => {
   const [startIndex, setStartIndex] = useState(0);
   const [isDragging, setIsDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const [scrollLeft, setScrollLeft] = useState(0);
   const containerRef = useRef(null);

   const visibleVideos = 4;

   const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
   };

   const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
   };

   const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
   };

   const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
   };

   const stopDragging = () => {
      setIsDragging(false);
      if (containerRef.current) {
         const videoWidth = containerRef.current.offsetWidth / visibleVideos;
         const currentScroll = containerRef.current.scrollLeft;
         const targetIndex = Math.round(currentScroll / videoWidth);
         containerRef.current.scrollTo({
            left: targetIndex * videoWidth,
            behavior: "smooth",
         });
         setStartIndex(targetIndex);
      }
   };

   const nextSlide = () => {
      if (startIndex + visibleVideos < videos.length) {
         const newIndex = startIndex + 1;
         setStartIndex(newIndex);
         const videoWidth = containerRef.current.offsetWidth / visibleVideos;
         containerRef.current.scrollTo({
            left: newIndex * videoWidth,
            behavior: "smooth",
         });
      }
   };

   const prevSlide = () => {
      if (startIndex > 0) {
         const newIndex = startIndex - 1;
         setStartIndex(newIndex);
         const videoWidth = containerRef.current.offsetWidth / visibleVideos;
         containerRef.current.scrollTo({
            left: newIndex * videoWidth,
            behavior: "smooth",
         });
      }
   };

   if (!videos.length) return null;

   return (
      <div className="relative w-full px-4">
         <h2 className="text-xl font-bold mb-4">{title}</h2>
         <div className="relative group">
            <div
               ref={containerRef}
               className="overflow-x-hidden cursor-grab active:cursor-grabbing"
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={stopDragging}
               onMouseLeave={stopDragging}
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={stopDragging}
            >
               <div
                  className={`flex transition-transform duration-300 ${
                     !isDragging ? "ease-out" : ""
                  }`}
                  style={{
                     width: `${(100 * videos.length) / visibleVideos}%`,
                  }}
               >
                  {videos.map((video) => (
                     <div key={video._id} className="flex-shrink-0 px-2">
                        <VideoCard video={video} variant="channel" />
                     </div>
                  ))}
               </div>
            </div>

            {startIndex > 0 && (
               <button
                  onClick={prevSlide}
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -ml-4"
               >
                  <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
               </button>
            )}
            {startIndex + visibleVideos < videos.length && (
               <button
                  onClick={nextSlide}
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity -mr-4"
               >
                  <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
               </button>
            )}
         </div>
      </div>
   );
};

export default VideoCarousel;
