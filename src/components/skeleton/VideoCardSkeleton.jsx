import { Skeleton } from "@/components/ui/skeleton";

export const VideoCardSkeleton = () => (
   <div className="flex flex-col gap-2">
      <Skeleton className="aspect-video rounded-xl" />
      <div className="flex gap-3 items-center">
         <Skeleton className="w-10 h-10 rounded-full" />
         <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
         </div>
      </div>
   </div>
);
