import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   ChartColumn,
   LayoutDashboard,
   LockKeyhole,
   SquarePlay,
   Users,
   WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { close } from "@/store/reducers/dashboardSidebarReducer";
import { useCurrentUserQuery } from "@/store/api/authApi";
import { Loader } from "../Loader";

export const DashboardSidebar = () => {
   const dispatch = useDispatch();

   const { data: user, isLoading } = useCurrentUserQuery();

   const isOpen = useSelector((state) => state.dashboardSidebar.isOpen);

   const items = [
      { icon: LayoutDashboard, label: "Dashboard", href: "" },
      { icon: SquarePlay, label: "Content", href: "content" },
      { icon: ChartColumn, label: "Analytics", href: "analytics" },
      { icon: WandSparkles, label: "Customisation", href: "customisation" },
      { icon: LockKeyhole, label: "Security", href: "security" },
      { icon: Users, label: "Subscribers", href: "subscribers" },
   ];

   if (isLoading) {
      return <Loader />;
   }

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
               "fixed left-0 top-14 w-64 h-[calc(100vh-3.5rem)] border-r z-40",
               "transition-transform duration-300 sm:transition-none",
               isOpen ? "translate-x-0" : "-translate-x-full sm:hidden"
            )}
         >
            <div className="p-2 overflow-y-auto h-full">
               <div className="flex flex-col items-center justify-center py-6">
                  <Link to={`/channel/@${user?.username}`}>
                     <Avatar className="w-28 h-auto aspect-square hover:opacity-50">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                     </Avatar>
                  </Link>
                  <h3 className="text-lg font-semibold mt-2">Your channel</h3>
                  <p className="text-sm text-muted-foreground">
                     {user?.fullName}
                  </p>
               </div>
               <div className="mb-8">
                  {items.map(({ icon: Icon, label, href }) => (
                     <Link to={`/dashboard/${user?._id}/${href}`} key={label}>
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
               "fixed left-0 top-14 w-[72px] h-[calc(100vh-3.5rem)] z-40 border-r",
               "hidden sm:block",
               isOpen && "sm:hidden"
            )}
         >
            <div className="py-2 flex flex-col items-center">
               <div className="py-4">
                  <Link to={`/channel/@${user?.username}`}>
                     <Avatar className="w-8 h-auto aspect-square hover:opacity-50">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                     </Avatar>
                  </Link>
               </div>
               {items.map(({ icon: Icon, label, href }) => (
                  <Link to={`/dashboard/${user?._id}/${href}`} key={label}>
                     <Button
                        variant="ghost"
                        className="w-full h-[72px] flex flex-col gap-1 rounded-none"
                     >
                        <Icon style={{ width: "22px", height: "22px" }} />
                     </Button>
                  </Link>
               ))}
            </div>
         </aside>
      </>
   );
};
