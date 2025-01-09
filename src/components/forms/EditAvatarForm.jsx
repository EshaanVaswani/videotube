import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

import { userExist } from "@/store/reducers/authReducer";
import { useUpdateAvatarMutation } from "@/store/api/authApi";

const EditAvatarSchema = z.object({
   avatar: z.array(z.instanceof(File)).optional(),
});

export const EditAvatar = () => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);

   const [isLoading, setIsLoading] = useState(false);
   const [image, setImage] = useState(user?.avatar);

   const form = useForm({
      resolver: zodResolver(EditAvatarSchema),
      defaultValues: {
         avatar: undefined,
      },
   });

   useEffect(() => {
      if (user?.avatar) {
         setImage(user.avatar);
      }
   }, [user]);

   const [update] = useUpdateAvatarMutation();

   const onSubmit = async (values) => {
      const formData = new FormData();

      if (values.avatar) {
         formData.append("avatar", values.avatar[0]);
      }

      setIsLoading(true);

      try {
         const res = await update(formData).unwrap();

         if (res.success) {
            dispatch(userExist(res.data));
            setImage(res.data.avatar);
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
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="mx-6">
         <Form {...form}>
            <form
               className="space-y-4 flex items-center gap-6"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-lg">Avatar</FormLabel>
                        <FormControl>
                           <FileUpload
                              name="avatar"
                              placeholder="Upload Avatar"
                              acceptedTypes="image/*"
                              mediaUrl={image}
                              fieldChange={(files) => {
                                 form.setValue("avatar", Array.from(files));
                              }}
                              containerClassName="w-48 h-48 rounded-full"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload"}
               </Button>
            </form>
         </Form>
      </div>
   );
};
