import { CommentList } from "./CommentList";

const CommentSection = ({ videoId }) => {
   return (
      <div className="mt-6 px-4">
         <CommentList videoId={videoId} />
      </div>
   );
};

export default CommentSection;
