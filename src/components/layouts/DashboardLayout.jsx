import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
   const isOpen = useSelector((state) => state.dashboardSidebar.isOpen);

   return (
      <div>
         <DashboardNavbar />
         <DashboardSidebar />
         <main
            className={cn(
               "pt-16 pb-16 transition-[padding] duration-300",
               isOpen ? "md:pl-64" : "md:pl-[72px]",
               "min-h-[calc(100vh-64px)]"
            )}
         >
            <Outlet />
         </main>
      </div>
   );
};

export default DashboardLayout;
