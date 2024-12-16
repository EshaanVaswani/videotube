import { Loader as Loading } from "lucide-react";

export const Loader = () => {
   return (
      <div className="flex items-center justify-center h-full">
         <Loading className="size-6 animate-spin text-muted-foreground" />
      </div>
   );
};
