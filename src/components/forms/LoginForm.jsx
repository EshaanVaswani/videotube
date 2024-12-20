import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { useLoginUserMutation } from "@/store/api/authApi";
import { userExist } from "@/store/reducers/authReducer";

const LoginSchema = z.object({
   email: z.string().email("Email is required"),
   password: z.string().min(8, "Password should be atleast 8 characters long"),
});

const LoginForm = () => {
   const [isLoading, setIsLoading] = useState(false);

   const dispatch = useDispatch();

   const [login] = useLoginUserMutation();

   const form = useForm({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (values) => {
      setIsLoading(true);
      try {
         const res = await login(values).unwrap();

         if (res.success) {
            dispatch(userExist(res.data.user));
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
      <Card className="w-[400px]">
         <CardHeader className="text-center">
            <img
               src="/logo.png"
               alt="logo"
               className="size-16 m-auto hidden dark:block"
            />
            <img
               src="/logo-dark.png"
               alt="logo"
               className="size-16 m-auto dark:hidden"
            />
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? "Logging in..." : "Login"}
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
