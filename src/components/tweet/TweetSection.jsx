import { useGetUserTweetsQuery } from "@/store/api/tweetApi";
import { TweetCard } from "@/components/tweet/TweetCard";
import { Loader } from "../Loader";
import { AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { TweetForm } from "../forms/TweetForm";

export const TweetSection = ({ channelId }) => {
   const { data: tweets, isLoading } = useGetUserTweetsQuery(channelId);

   const user = useSelector((state) => state.auth.user);

   if (!tweets || tweets.length === 0) {
      return (
         <div>
            {isLoading ? (
               <div>
                  <Loader />
               </div>
            ) : channelId === user?._id ? (
               <div>
                  <TweetForm />
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center">
                  <AlertTriangle />
                  <p>This channel doesn't have any tweets.</p>
               </div>
            )}
         </div>
      );
   }

   const sorted = [...tweets].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );

   return (
      <>
         {channelId === user?._id && (
            <div>
               <TweetForm />
            </div>
         )}
         <div className="space-y-4">
            {sorted.map((tweet) => (
               <TweetCard key={tweet._id} tweet={tweet} />
            ))}
         </div>
      </>
   );
};
