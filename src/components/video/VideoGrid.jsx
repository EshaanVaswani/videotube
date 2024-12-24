import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { Button } from "../ui/button";

export const VideoGrid = ({ videos, variant = "default" }) => {
   const [sortType, setSortType] = useState("latest");

   const getSortedVideos = () => {
      if (!videos) return [];

      const v = [...videos];
      switch (sortType) {
         case "popular":
            return v.sort((a, b) => b.views - a.views);
         case "oldest":
            return v.sort(
               (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
         case "latest":
         default:
            return v.sort(
               (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
      }
   };

   return (
      <>
         {variant === "channel" && (
            <div className="flex gap-3 items-center pt-6 border-t">
               <SortButton
                  active={sortType === "latest"}
                  onClick={() => setSortType("latest")}
               >
                  Latest
               </SortButton>
               <SortButton
                  active={sortType === "popular"}
                  onClick={() => setSortType("popular")}
               >
                  Popular
               </SortButton>
               <SortButton
                  active={sortType === "oldest"}
                  onClick={() => setSortType("oldest")}
               >
                  Oldest
               </SortButton>
            </div>
         )}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
            {getSortedVideos().map((video) => (
               <VideoCard key={video._id} video={video} variant={variant} />
            ))}
         </div>
      </>
   );
};

const SortButton = ({ active, onClick, children }) => (
   <Button
      variant={active ? "default" : "outline"}
      className={`rounded-full ${
         active ? "" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={onClick}
   >
      {children}
   </Button>
);
