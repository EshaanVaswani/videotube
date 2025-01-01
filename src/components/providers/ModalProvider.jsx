import { useEffect, useState } from "react";

import { ConfirmModal } from "../modals/ConfirmModal";
import { PublishVideoModal } from "../modals/PublishVideoModal";
import { UpdateVideoModal } from "../modals/UpdateVideoModal";
import { NewPlaylistModal } from "../modals/NewPlaylistModal";
import { SaveToPlaylistModal } from "../modals/SaveToPlaylistModal";
import { UpdatePlaylistModal } from "../modals/UpdatePlaylistModal";
import { ShareModal } from "../modals/ShareModal";

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
         <NewPlaylistModal />
         <SaveToPlaylistModal />
         <UpdatePlaylistModal />
         <ShareModal />
      </>
   );
};
