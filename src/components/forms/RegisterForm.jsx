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
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/FileUpload";

import { userExist } from "@/store/reducers/authReducer";
import { useRegisterUserMutation } from "@/store/api/authApi";

const RegisterSchema = z.object({
   fullName: z.string().min(1, "Full Name is required"),
   username: z.string().min(1, "Username is required"),
   email: z.string().email("Email is required"),
   password: z.string().min(8, "Password should be at least 8 characters long"),
   avatar: z.array(z.instanceof(File, "Avatar is required")),
   coverImage: z.array(z.instanceof(File).optional()),
});

const RegisterForm = () => {
   const [isLoading, setIsLoading] = useState(false);

   const dispatch = useDispatch();

   const [register] = useRegisterUserMutation();

   const form = useForm({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         fullName: "",
         username: "",
         email: "",
         password: "",
         avatar: null,
         coverImage: null,
      },
   });

   const onSubmit = async (values) => {
      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (values.avatar) {
         formData.append("avatar", values.avatar[0]);
      }

      if (values.coverImage) {
         formData.append("coverImage", values.coverImage[0]);
      }

      setIsLoading(true);
      try {
         const res = await register(formData).unwrap();

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
      <Card className="">
         <CardHeader className="text-center">
            <img
               src="/logo.png"
               alt="logo"
               className="w-12 h-12 mx-auto mb-2"
            />
            <CardTitle className="text-lg md:text-xl">Register</CardTitle>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3 px-3"
               >
                  <div className="w-full flex flex-row items-center gap-8">
                     <FormField
                        control={form.control}
                        name="avatar"
                        render={() => (
                           <FormItem>
                              <FormControl>
                                 <FileUpload
                                    name="avatar"
                                    placeholder="Upload Avatar"
                                    acceptedTypes="image/*"
                                    fieldChange={(files) =>
                                       form.setValue(
                                          "avatar",
                                          Array.from(files)
                                       )
                                    }
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="coverImage"
                        render={() => (
                           <FormItem>
                              <FormControl>
                                 <FileUpload
                                    name="coverImage"
                                    placeholder="Upload CoverImage"
                                    acceptedTypes="image/*"
                                    fieldChange={(files) => {
                                       console.log(files);
                                       form.setValue(
                                          "coverImage",
                                          Array.from(files)
                                       );
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="grid gap-4">
                     <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter your full name"
                                    type="text"
                                    {...field}
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
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Choose a username"
                                    type="text"
                                    {...field}
                                 />
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
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                     {isLoading ? "Registering..." : "Register"}
                  </Button>
               </form>
            </Form>
         </CardContent>
         <CardFooter className="flex items-center justify-center flex-wrap text-center">
            <p className="text-sm">Already have an account?</p>
            <Button
               variant="link"
               asChild
               className="ml-1 font-medium text-sm"
               size="sm"
            >
               <Link to="/auth/login">Login</Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export default RegisterForm;
