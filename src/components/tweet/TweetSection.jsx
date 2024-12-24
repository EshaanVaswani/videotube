import { useGetUserTweetsQuery } from "@/store/api/tweetApi";
import { TweetCard } from "@/components/tweet/TweetCard";

export const TweetSection = ({ channelId }) => {
   const { data: tweets, isLoading } = useGetUserTweetsQuery(channelId);

   if (!tweets) return null;

   return (
      <div>
         {tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
         ))}
      </div>
   );
};
