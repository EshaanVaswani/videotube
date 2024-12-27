import { useEffect, useState } from "react";

import { ConfirmModal } from "../modals/ConfirmModal";
import { PublishVideoModal } from "../modals/PublishVideoModal";
import { UpdateVideoModal } from "../modals/UpdateVideoModal";

export const ModalProvider = () => {
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
   }, []);

   if (!isMounted) {
      return null;
   }

   return (
      <>
         <PublishVideoModal />
         <ConfirmModal />
         <UpdateVideoModal />
      </>
   );
};
