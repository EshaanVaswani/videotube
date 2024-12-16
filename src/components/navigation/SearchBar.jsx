import { useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
   const [isSearchVisible, setIsSearchVisible] = useState(false);

   return (
      <>
         <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsSearchVisible(true)}
         >
            <Search className="w-6 h-6" />
         </Button>

         {isSearchVisible && (
            <div className="fixed inset-0 bg-background z-50 md:hidden">
               <div className="flex items-center h-14 px-4 gap-2">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setIsSearchVisible(false)}
                  >
                     <X className="w-6 h-6" />
                  </Button>
                  <div className="flex-1">
                     <Input
                        type="text"
                        placeholder="Search"
                        className="w-full"
                        autoFocus
                     />
                  </div>
               </div>
            </div>
         )}

         <div className="hidden sm:block flex-1 max-w-2xl px-4">
            <div className="flex">
               <Input
                  type="text"
                  placeholder="Search"
                  className="rounded-r-none"
               />
               <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-l-none"
               >
                  <Search className="w-5 h-5" />
               </Button>
            </div>
         </div>
      </>
   );
}
