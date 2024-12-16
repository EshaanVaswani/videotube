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
               "pt-16 pb-16 md:pb-0 transition-[padding] duration-300",
               isOpen ? "md:pl-64" : "md:pl-[72px]"
            )}
         >
            <Outlet />
         </main>
         <Bottombar />
      </div>
   );
};

export default HomeLayout;
