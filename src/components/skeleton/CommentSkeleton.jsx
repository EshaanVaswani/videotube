import { Skeleton } from "@/components/ui/skeleton";

export const CommentSkeleton = () => (
   <div className="flex gap-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1">
         <Skeleton className="h-4 w-32 mb-2" />
         <Skeleton className="h-4 w-full" />
      </div>
   </div>
);
