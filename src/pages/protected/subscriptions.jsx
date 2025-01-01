import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AlertTriangle, Bell } from "lucide-react";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
   useGetSubscribedChannelsQuery,
   useToggleSubscriptionMutation,
} from "@/store/api/subscriptionApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Subscriptions = () => {
   const user = useSelector((state) => state.auth.user);

   const { data: channels, isLoading } = useGetSubscribedChannelsQuery(
      user?._id,
      {
         skip: !user?._id,
      }
   );

   const [toggle] = useToggleSubscriptionMutation();

   const handleSubscribe = async (channelId) => {
      try {
         const res = await toggle(channelId).unwrap();

         if (res.success) {
            toast.success(res.message);
         }
      } catch (error) {
         toast.error("Something went wrong");
      }
   };

   if (isLoading) {
      return <Loader />;
   }

   if (!channels || !channels.length) {
      return (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
            <AlertTriangle className="size-8" />
            <p className="text-lg mt-4">No subscriptions found</p>
         </div>
      );
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-2xl font-bold mb-6">All Subscriptions</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {channels.map((c) => (
               <Card
                  key={c._id}
                  className="hover:shadow-lg transition-shadow duration-200 border-none mx-10"
               >
                  <CardContent className="p-4">
                     <Link to={`/channel/@${c.channel.username}`}>
                        <div className="flex flex-col items-center">
                           <Avatar className="w-28 h-28 mb-4">
                              <AvatarImage
                                 src={c.channel.avatar}
                                 alt={c.channel.username}
                                 className="rounded-full object-cover"
                              />
                           </Avatar>
                           <h3 className="mt-3 text-lg font-semibold truncate">
                              {c.channel.fullName}
                           </h3>
                           <p className="text-sm text-muted-foreground truncate">
                              @{c.channel.username}
                           </p>
                           <p className="text-sm text-muted-foreground truncate">
                              {c.subscriberCount} subscribers
                           </p>
                        </div>
                     </Link>
                     <Button
                        className="mt-4"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSubscribe(c.channel._id)}
                     >
                        <Bell /> Subscribed
                     </Button>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
};

export default Subscriptions;
