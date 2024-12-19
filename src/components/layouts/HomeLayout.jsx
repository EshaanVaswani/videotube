import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navigation/Navbar";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Bottombar } from "@/components/navigation/Bottombar";

const HomeLayout = () => {
   const isOpen = useSelector((state) => state.sidebar.isOpen);

   return (
      <div>
         <Navbar />
         <Sidebar />
         <main
            className={cn(
               "pt-16 pb-16 transition-[padding] duration-300",
               isOpen ? "md:pl-64" : "md:pl-[72px]",
               "min-h-[calc(100vh-64px-64px)]"
            )}
         >
            <Outlet />
         </main>
         <Bottombar />
      </div>
   );
};

export default HomeLayout;
