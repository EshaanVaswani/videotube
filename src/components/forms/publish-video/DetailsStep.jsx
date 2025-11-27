import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { detailsSchema } from "@/schemas/video.schema";
import {
   setDetails,
   nextStep,
   prevStep,
} from "@/store/reducers/videoFormReducer";

export function DetailsStep() {
   const dispatch = useDispatch();
   const { formData } = useSelector((state) => state.videoForm);

   const form = useForm({
      resolver: zodResolver(detailsSchema),
      defaultValues: {
         title: formData.title,
         description: formData.description,
      },
   });

   const onSubmit = (data) => {
      dispatch(setDetails(data));
      dispatch(nextStep());
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col h-full"
         >
            <div>
               <h2 className="text-2xl font-bold">Video Details</h2>
               <p className="text-muted-foreground mt-1">
                  Add a title and description for your video
               </p>
            </div>

            <div className="space-y-4 flex-grow">
               <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                           <Input placeholder="Enter video title" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Enter video description"
                              className="min-h-[150px] resize-none"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <div className="flex justify-between">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() => dispatch(prevStep())}
               >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
               </Button>
               <Button type="submit">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
            </div>
         </form>
      </Form>
   );
}

export default DetailsStep;
