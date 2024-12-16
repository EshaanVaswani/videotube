import { Home, Compass, PlaySquare, Library } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const items = [
   { icon: Home, label: "Home", href: "/" },
   { icon: Compass, label: "Explore", href: "/explore" },
   { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions" },
   { icon: Library, label: "Library", href: "/library" },
];

export const Bottombar = () => {
   return (
      <nav
         className={cn(
            "fixed bottom-0 left-0 right-0 border-t sm:hidden",
            "h-16 px-2 flex items-center justify-around"
         )}
      >
         {items.map(({ icon: Icon, label, href }) => (
            <Link key={label} to={href}>
               <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col hover:bg-transparent"
               >
                  <Icon style={{ width: "20px", height: "20px" }} />
                  <span className="text-xs">{label}</span>
               </Button>
            </Link>
         ))}
      </nav>
   );
};
