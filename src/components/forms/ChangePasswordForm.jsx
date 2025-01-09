import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/store/api/authApi";
import { toast } from "sonner";

const ChangePasswordSchema = z
   .object({
      oldPassword: z.string().min(8, "Old Password is required"),
      newPassword: z
         .string()
         .min(8, "Password should be at least 8 characters long"),
      confirmPassword: z
         .string()
         .min(8, "Password should be at least 8 characters long"),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });

export const ChangePasswordForm = () => {
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm({
      resolver: zodResolver(ChangePasswordSchema),
      defaultValues: {
         oldPassword: "",
         newPassword: "",
         confirmPassword: "",
      },
   });

   const [update] = useChangePasswordMutation();

   const onSubmit = async (values) => {
      setIsLoading(true);
      try {
         const res = await update(values).unwrap();

         if (res.success) {
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
      <Card className="w-full max-w-md ml-10">
         <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <FormField
                     control={form.control}
                     name="oldPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Current Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="********"
                                 type="password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="newPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>New Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="********"
                                 type="password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="confirmPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Confirm Password</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="********"
                                 type="password"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" disabled={isLoading}>
                     Confirm
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
