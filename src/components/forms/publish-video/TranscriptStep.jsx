import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { setField } from "@/store/reducers/videoFormReducer";

const transcriptSchema = z.object({
   transcript: z.string().min(10, "Transcript must be at least 10 characters"),
});

export const TranscriptStep = ({ onNext, onBack }) => {
   const dispatch = useDispatch();
   const transcript = useSelector((state) => state.videoForm.transcript);

   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(transcriptSchema),
      defaultValues: {
         transcript: transcript || "",
      },
   });

   useEffect(() => {
      setValue("transcript", transcript || "");
   }, [transcript, setValue]);

   const onSubmit = (data) => {
      dispatch(setField({ key: "transcript", value: data.transcript }));
      onNext();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <h2 className="text-lg font-semibold">Transcript</h2>

         {loading ? (
            <Skeleton className="h-40 w-full" />
         ) : (
            <>
               <Textarea
                  {...register("transcript")}
                  className="min-h-[200px]"
                  placeholder="Paste or write your transcript here..."
               />
               {errors.transcript && (
                  <p className="text-sm text-red-500">
                     {errors.transcript.message}
                  </p>
               )}
            </>
         )}

         <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
               Back
            </Button>
            <Button type="submit" disabled={loading}>
               Next
            </Button>
         </div>
      </form>
   );
};
