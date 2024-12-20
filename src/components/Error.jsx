import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const Error = ({ error, description, buttonLabel, buttonLink }) => {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
         <div className="max-w-md w-full space-y-8">
            <Alert className="p-8">
               <AlertCircle className="h-6 w-6" />
               <AlertTitle className="text-xl font-semibold">
                  {error}
               </AlertTitle>
               <AlertDescription className="mt-2">
                  {description}
               </AlertDescription>
            </Alert>

            <div className="flex justify-center">
               <Link to={buttonLink}>
                  <Button>{buttonLabel}</Button>
               </Link>
            </div>
         </div>
      </div>
   );
};
