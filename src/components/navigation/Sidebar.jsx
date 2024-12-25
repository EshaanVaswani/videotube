import React from "react";
import { cn } from "@/lib/utils";
import {
   Clock,
   Compass,
   History,
   Home,
   PlaySquare,
   ThumbsUp,
   User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "@/store/reducers/sidebarReducer";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const Sidebar = () => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);
   const isOpen = useSelector((state) => state.sidebar.isOpen);

   const items = [
      { icon: Home, label: "Home", href: "/" },
      { icon: Compass, label: "Explore", href: "/explore" },
      { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions" },
      { icon: Clock, label: "Watch Later", href: "/watch-later" },
      { icon: ThumbsUp, label: "Liked Videos", href: "/liked-videos" },
      { icon: History, label: "History", href: "/history" },
      { icon: User, label: "You", href: `/dashboard/${user?._id}` },
   ];

   return (
      <>
         {isOpen && (
            <div
               className="fixed inset-0 bg-background/50 z-40 sm:hidden"
               onClick={() => dispatch(close())}
            />
         )}

         {/* FULL SIDEBAR */}
         <aside
            className={cn(
               "fixed left-0 top-14 w-64 h-[calc(100vh-3.5rem)] z-50",
               "transition-transform duration-300 sm:transition-none",
               isOpen ? "translate-x-0" : "-translate-x-full sm:hidden"
            )}
         >
            <div className="p-2 overflow-y-auto h-full">
               <div className="mb-8">
                  {items.map(({ icon: Icon, label, href }) => (
                     <Link to={href} key={label}>
                        <Button
                           variant="ghost"
                           className="w-full justify-start gap-4"
                        >
                           <Icon style={{ width: "20px", height: "20px" }} />
                           <span className="text-base">{label}</span>
                        </Button>
                     </Link>
                  ))}
               </div>
            </div>
         </aside>

         {/* MINI SIDEBAR */}
         <aside
            className={cn(
               "fixed left-0 top-14 w-[72px] h-[calc(100vh-3.5rem)] z-50",
               "hidden sm:block",
               isOpen && "sm:hidden"
            )}
         >
            <div className="py-2 flex flex-col items-center">
               {items.map(({ icon: Icon, label, href }) => (
                  <Link to={href} key={label}>
                     <Button
                        variant="ghost"
                        className="w-full h-[72px] flex flex-col gap-1 rounded-none"
                     >
                        <Icon style={{ width: "22px", height: "22px" }} />
                        <span className="text-[10px] line-clamp-2 px-1 text-center">
                           {label}
                        </span>
                     </Button>
                  </Link>
               ))}
            </div>
         </aside>
      </>
   );
};
