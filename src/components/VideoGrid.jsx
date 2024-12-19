import { VideoCard } from "./VideoCard";

export const VideoGrid = ({ videos }) => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
         {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
         ))}
      </div>
   );
};
