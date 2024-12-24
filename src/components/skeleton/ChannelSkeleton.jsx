import { Skeleton } from "@/components/ui/skeleton";

export const ChannelSkeleton = () => {
   return (
      <div className="w-full animate-pulse">
         <div className="w-full h-48 bg-gray-200" />
         <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-start gap-4">
               <Skeleton className="w-24 h-24 rounded-full" />
               <div className="flex-grow">
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-16 w-full" />
               </div>
               <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-10" />
               </div>
            </div>
            <div className="mt-6">
               <Skeleton className="h-10 w-64 mb-6" />
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                     <div key={i}>
                        <Skeleton className="w-full aspect-video rounded-lg" />
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-3 w-2/3 mt-2" />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
