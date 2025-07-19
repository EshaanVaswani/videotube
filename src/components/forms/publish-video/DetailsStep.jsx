import * as z from "zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { setMultipleFields } from "@/store/reducers/videoFormReducer";

const schema = z.object({
   title: z.string().min(1, "Title is required"),
   description: z.string().min(1, "Description is required"),
});

export const DetailsStep = ({ onNext, onBack }) => {
   const dispatch = useDispatch();
   const { title, description } = useSelector((state) => state.videoForm);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(schema),
      defaultValues: { title, description },
   });

   const onSubmit = (data) => {
      dispatch(setMultipleFields(data));
      onNext();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
            <Input {...register("title")} placeholder="Title" />
            {errors.title && (
               <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
         </div>
         <div>
            <Textarea {...register("description")} placeholder="Description" />
            {errors.description && (
               <p className="text-red-500 text-sm">
                  {errors.description.message}
               </p>
            )}
         </div>
         <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onBack}>
               Back
            </Button>
            <Button type="submit">Next</Button>
         </div>
      </form>
   );
};
