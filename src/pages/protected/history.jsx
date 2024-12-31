import { toast } from "sonner";
import { Eraser, Pause, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoList } from "@/components/video/VideoList";

import {
   useClearWatchHistoryMutation,
   useGetWatchHistoryQuery,
} from "@/store/api/historyApi";
import { Loader } from "@/components/Loader";

const History = () => {
   const { data, isLoading } = useGetWatchHistoryQuery();

   const groupVideosByDate = (videos) => {
      if (!videos) return {};
      return videos.reduce((groups, video) => {
         const date = new Date(video.watchedAt);
         const key = date.toLocaleDateString();
         if (!groups[key]) groups[key] = [];
         groups[key].push(video);
         return groups;
      }, {});
   };

   const groupedVideos = groupVideosByDate(data);

   const [clear] = useClearWatchHistoryMutation();

   const handleClearHistory = async () => {
      try {
         const res = await clear().unwrap();

         if (res.success) toast.success("Watch history cleared");
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   return (
      <>
         <h1 className="p-8 text-3xl font-bold">Watch History</h1>
         <div className="flex gap-6 p-4 max-w-7xl mx-auto">
            <div className="flex-1 max-w-4xl">
               {data?.length ? (
                  Object.entries(groupedVideos).map(([date, videos]) => (
                     <div key={date} className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">{date}</h3>
                        <VideoList videos={videos} variant="history" />
                     </div>
                  ))
               ) : (
                  <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
                     {isLoading ? (
                        <Loader />
                     ) : (
                        <p className="text-lg text-muted-foreground">
                           No history found
                        </p>
                     )}
                  </div>
               )}
            </div>

            <div className="w-60 sticky top-4 h-fit space-y-4 flex-shrink-0 hidden lg:block">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  <Input
                     type="text"
                     placeholder="Search watch history"
                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  />
               </div>

               <div className="space-y-2">
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2"
                  >
                     <Pause className="w-4 h-4" />
                     Pause watch history
                  </Button>
                  <Button
                     variant="ghost"
                     className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                     onClick={handleClearHistory}
                     disabled={data?.length === 0}
                  >
                     <Eraser className="w-4 h-4" />
                     Clear all history
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

export default History;
