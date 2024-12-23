import { VideoGrid } from "@/components/video/VideoGrid";
import { VideoCardSkeleton } from "@/components/skeleton/VideoCardSkeleton";

import { useGetVideosQuery } from "@/store/api/videoApi";

const Home = () => {
   const { data: videos, isLoading } = useGetVideosQuery({
      page: 1,
      limit: 10,
   });

   if (isLoading) {
      return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
         </div>
      );
   }

   return <div>{videos && <VideoGrid videos={videos} />}</div>;
};

export default Home;
