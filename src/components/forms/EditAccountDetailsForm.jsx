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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { userExist } from "@/store/reducers/authReducer";
import { useUpdateAccountDetailsMutation } from "@/store/api/authApi";

const EditAccountDetailsSchema = z.object({
   fullName: z.string().min(1),
   username: z.string().min(1),
   email: z.string().email(),
});

export const EditAccountDetails = () => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);

   const [isLoading, setIsLoading] = useState(false);

   const form = useForm({
      resolver: zodResolver(EditAccountDetailsSchema),
      defaultValues: {
         fullName: "",
         username: "",
         email: "",
      },
   });

   useEffect(() => {
      if (user) {
         form.reset({
            fullName: user.fullName,
            username: user.username,
            email: user.email,
         });
      }
   }, [user, form]);

   const [update] = useUpdateAccountDetailsMutation();

   const onSubmit = async (values) => {
      setIsLoading(true);

      try {
         const res = await update(values).unwrap();

         if (res.success) {
            dispatch(userExist(res.data));
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
                  name="fullName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-lg">Full Name</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              placeholder="Full Name"
                              type="text"
                              className="max-w-2xl"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-lg">Username</FormLabel>
                        <FormControl>
                           <div className="flex items-center gap-3">
                              <span>@</span>
                              <Input
                                 {...field}
                                 placeholder="Username"
                                 type="text"
                                 className="max-w-2xl"
                              />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel className="text-lg">Email</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              type="email"
                              placeholder="Email"
                              className="max-w-2xl"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
               </Button>
            </form>
         </Form>
      </div>
   );
};
