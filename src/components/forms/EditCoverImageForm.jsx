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
import { useUpdateCoverImageMutation } from "@/store/api/authApi";

const EditCoverImageSchema = z.object({
   coverImage: z.array(z.instanceof(File)).optional(),
});

export const EditCoverImage = () => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);

   const [isLoading, setIsLoading] = useState(false);
   const [image, setImage] = useState(user?.coverImage);

   const form = useForm({
      resolver: zodResolver(EditCoverImageSchema),
      defaultValues: {
         coverImage: undefined,
      },
   });

   useEffect(() => {
      if (user?.coverImage) {
         setImage(user.coverImage);
      }
   }, [user]);

   const [update] = useUpdateCoverImageMutation();

   const onSubmit = async (values) => {
      const formData = new FormData();

      if (values.coverImage) {
         formData.append("coverImage", values.coverImage[0]);
      }

      setIsLoading(true);

      try {
         const res = await update(formData).unwrap();

         if (res.success) {
            dispatch(userExist(res.data));
            setImage(res.data.coverImage);
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
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
               <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-lg">Cover Image</FormLabel>
                        <FormControl>
                           <FileUpload
                              name="coverImage"
                              placeholder="Upload Cover Image"
                              acceptedTypes="image/*"
                              mediaUrl={image}
                              fieldChange={(files) => {
                                 form.setValue("coverImage", Array.from(files));
                              }}
                              containerClassName="w-full h-48"
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
