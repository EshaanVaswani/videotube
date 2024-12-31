import { VideoItem } from "@/components/video/VideoItem";

export const VideoList = ({ videos, variant = "default" }) => {
   return (
      <div className="grid grid-cols-1 gap-3">
         {videos?.map((video) => (
            <VideoItem key={video._id} video={video} variant={variant} />
         ))}
      </div>
   );
};
