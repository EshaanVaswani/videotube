import { Skeleton } from "@/components/ui/skeleton";

export const PlaylistSkeleton = () => {
   return (
      <div className="space-y-3">
         {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-6 p-2">
               <Skeleton className="h-4 w-4 rounded" />
               <div className="flex items-center justify-between w-2/3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded-full" />
               </div>
            </div>
         ))}
      </div>
   );
};
