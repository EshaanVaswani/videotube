import { toast } from "sonner";
import { formatDate } from "date-fns";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
   useDeleteSubscriberMutation,
   useGetChannelSubscribersQuery,
} from "@/store/api/subscriptionApi";

const Subscribers = () => {
   const { userId } = useParams();

   const { data: subscribers, isLoading } =
      useGetChannelSubscribersQuery(userId);

   const [deleteSubscriber] = useDeleteSubscriberMutation();

   const handleDelete = async (subscriberId) => {
      try {
         const res = await deleteSubscriber(subscriberId).unwrap();

         if (res.success) {
            toast.success(res.message);
         }
      } catch (error) {
         let errorMessage = "Something went wrong";
         if (error?.data) {
            const match = error.data.match(/Error: (.+?)<\/pre>/);
            if (match && match[1]) {
               errorMessage = match[1];
            }
         }
         toast.error(errorMessage);
      }
   };

   if (isLoading) {
      return <Loader />;
   }

   if (!subscribers || subscribers.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)]">
            <AlertTriangle className="size-8" />
            <p className="text-lg mt-4">No subscribers found</p>
         </div>
      );
   }

   return (
      <div>
         <h1 className="text-3xl font-bold p-6">Channel subscribers</h1>

         <div className="space-y-4">
            {subscribers.map((s) => (
               <div
                  key={s._id}
                  className="flex items-center justify-between gap-4 p-4 rounded-lg border mx-10"
               >
                  <Link
                     to={`/channel/@${s.subscriber.username}`}
                     className="flex items-center gap-4"
                  >
                     <Avatar className="h-12 w-12">
                        <AvatarImage
                           src={s.subscriber.avatar}
                           alt={s.subscriber.username}
                        />
                        <AvatarFallback>
                           {s.subscriber.username[0].toUpperCase()}
                        </AvatarFallback>
                     </Avatar>

                     <div className="flex-grow">
                        <h3 className="font-medium">{s.subscriber.fullName}</h3>
                        <p className="text-sm text-gray-500">
                           @{s.subscriber.username}
                        </p>
                     </div>
                  </Link>

                  <div className="text-right flex items-center gap-2">
                     <p className="text-sm text-gray-500">
                        Subscribed on {formatDate(s.createdAt, "MMM dd, yyyy")}
                     </p>
                     <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(s.subscriber._id)}
                     >
                        <Trash2 />
                     </Button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Subscribers;
