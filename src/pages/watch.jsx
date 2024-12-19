import { useParams } from "react-router-dom";

import { Navbar } from "@/components/navigation/Navbar";

const Watch = () => {
   const { videoId } = useParams();

   return (
      <div>
         <Navbar />
         {videoId}
      </div>
   );
};

export default Watch;
