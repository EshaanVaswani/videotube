import { Skeleton } from "@/components/ui/skeleton";

export const VideoSkeleton = () => {
   return (
      <div className="min-h-screen bg-background">
         <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
               <div className="flex-1">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <Skeleton className="h-8 w-3/4 mt-4" />
                  <div className="flex items-center justify-between mt-4">
                     <div className="flex items-center space-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                           <Skeleton className="h-4 w-32" />
                           <Skeleton className="h-4 w-24 mt-2" />
                        </div>
                     </div>
                  </div>
                  <Skeleton className="h-32 w-full mt-4" />
               </div>
               <div className="w-full lg:w-[400px]">
                  <div className="space-y-4">
                     {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
