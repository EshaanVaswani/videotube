import { CommentList } from "./CommentList";

export const CommentSection = ({ videoId }) => {
   return (
      <div className="mt-6 px-4">
         <CommentList videoId={videoId} />
      </div>
   );
};
