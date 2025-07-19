import * as z from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { setMultipleFields } from "@/store/reducers/videoFormReducer";

const schema = z.object({
   tags: z
      .array(z.string().min(1, "Tag cannot be empty"))
      .min(1, "At least one tag is required"),
   category: z.string().min(1, "Category is required"),
});

export const TagsCategoriesStep = ({ onNext, onBack }) => {
   const dispatch = useDispatch();
   const { tags, category } = useSelector((state) => state.videoForm);

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
   } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
         tags,
         category,
      },
   });

   const currentTags = watch("tags");

   useEffect(() => {
      setValue("tags", tags);
      setValue("category", category);
   }, [tags, category]);

   const addTag = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         const newTag = e.target.value.trim();
         if (!newTag || currentTags.includes(newTag)) return;

         const updatedTags = [...currentTags, newTag];
         setValue("tags", updatedTags);
         e.target.value = "";
      }
   };

   const onSubmit = (data) => {
      dispatch(setMultipleFields(data));
      onNext();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <h2 className="text-lg font-semibold">Tags & Category</h2>

         <div className="flex flex-wrap gap-2">
            {currentTags.map((tag, i) => (
               <Badge key={i}>{tag}</Badge>
            ))}
            <Input placeholder="Add tag..." onKeyDown={addTag} />
         </div>
         {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
         )}

         <div>
            <Input {...register("category")} placeholder="Category" />
            {errors.category && (
               <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
         </div>

         <div className="flex justify-between mt-4">
            <Button variant="outline" type="button" onClick={onBack}>
               Back
            </Button>
            <Button type="submit">Next</Button>
         </div>
      </form>
   );
};
