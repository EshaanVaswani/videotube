import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const WorkInProgress = () => {
   return (
      <div className="flex items-center justify-center flex-col gap-3">
         <img src="/work-in-progress.png" alt="" />
         <h1 className="text-2xl font-bold -mt-16 ">Work in Progress</h1>
         <p className="text-sm text-center">
            This page is still under development. Please check back later.
         </p>
         <Link to="/">
            <Button>Go to Home</Button>
         </Link>
      </div>
   );
};
