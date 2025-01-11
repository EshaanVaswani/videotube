import { EditAvatar } from "@/components/forms/EditAvatarForm";
import { EditCoverImage } from "@/components/forms/EditCoverImageForm";
import { EditAccountDetails } from "@/components/forms/EditAccountDetailsForm";

const Customisation = () => {
   return (
      <div>
         <h1 className="text-3xl font-bold p-6">Channel customisation</h1>

         <div className="flex flex-col gap-8">
            <EditCoverImage />
            <EditAvatar />
            <EditAccountDetails />
         </div>
      </div>
   );
};

export default Customisation;
