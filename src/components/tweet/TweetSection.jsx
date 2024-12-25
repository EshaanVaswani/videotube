import { useGetUserTweetsQuery } from "@/store/api/tweetApi";
import { TweetCard } from "@/components/tweet/TweetCard";

export const TweetSection = ({ channelId }) => {
   const { data: tweets, isLoading } = useGetUserTweetsQuery(channelId);

   if (!tweets) return null;

   const sorted = [...tweets].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );

   return (
      <div className="space-y-4">
         {sorted.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
         ))}
      </div>
   );
};
