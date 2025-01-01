import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Eye, Heart, SquarePen, Upload, Users, Video } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";

import { formatNumber } from "@/lib/utils";
import { useGetChannelStatsQuery } from "@/store/api/dashboardApi";
import { open } from "@/store/reducers/videoModalReducer";

const Dashboard = () => {
   const { data, isLoading } = useGetChannelStatsQuery();

   const dispatch = useDispatch();

   const { userId } = useParams();

   if (isLoading) {
      return <Loader />;
   }

   return (
      <div>
         <div className="flex justify-between items-center p-6">
            <div>
               <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back,{" "}
                  <span className="text-blue-500">
                     {data?.owner?.fullName || "User"}
                  </span>
               </h1>
               <p>Here is an overview of your channel's performance</p>
            </div>

            <div>
               <Button
                  variant="ghost"
                  className="size-12 rounded-full"
                  size="icon"
                  onClick={() => dispatch(open(""))}
               >
                  <Upload />
               </Button>
               <Link to={`/dashboard/${userId}/content/?tab=posts`}>
                  <Button variant="ghost" className="size-12 rounded-full">
                     <SquarePen />
                  </Button>
               </Link>
            </div>
         </div>

         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mx-8">
            <StatCard
               title="Total Views"
               value={formatNumber(data?.totalViews)}
               icon={Eye}
               description="All time channel views"
            />
            <StatCard
               title="Total Subscribers"
               value={formatNumber(data?.totalSubscribers)}
               icon={Users}
               description="Channel subscribers"
            />
            <StatCard
               title="Total Videos"
               value={formatNumber(data?.totalVideos)}
               icon={Video}
               description="Published videos"
            />
            <StatCard
               title="Total Likes"
               value={formatNumber(data?.totalLikes)}
               icon={Heart}
               description="Across all videos"
            />
         </div>
      </div>
   );
};

export default Dashboard;
