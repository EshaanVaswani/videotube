import React from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginSchema = z.object({
   email: z.string().email("Email is required"),
   password: z.string().min(8, "Password should be atleast 8 characters long"),
});

const LoginForm = () => {
   const form = useForm({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   function onSubmit(values) {
      console.log(values);
   }

   return (
      <Card className="w-[400px]">
         <CardHeader className="text-center">
            <img src="/logo.png" alt="logo" className="size-16 m-auto" />
            <CardTitle>Login</CardTitle>
            <CardDescription>
               Welcome back! Login to your account
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 px-3"
               >
                  <div className="space-y-4">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="m@example.com"
                                    type="email"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="********"
                                    type="password"
                                    {...field}
                                 />
                              </FormControl>
                              <Button
                                 size="sm"
                                 variant="link"
                                 asChild
                                 className="px-0 font-normal"
                              >
                                 <Link>Forgot Password?</Link>
                              </Button>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <Button type="submit" className="w-full">
                     Login
                  </Button>
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex items-center justify-center">
            Don't have an account?
            <Button
               variant="link"
               asChild
               className="ml-2 font-normal"
               size="md"
            >
               <Link to="/auth/register">Register</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default LoginForm;
