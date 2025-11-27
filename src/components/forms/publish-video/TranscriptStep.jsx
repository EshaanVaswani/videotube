import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
   ArrowLeft,
   ArrowRight,
   Loader2,
   Sparkles,
   RefreshCw,
   AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { transcriptSchema } from "@/schemas/video.schema";
import {
   setTranscriptText,
   nextStep,
   prevStep,
} from "@/store/reducers/videoFormReducer";
import { useTranscriptGenerator } from "@/hooks/useTranscriptGenerator";

export function TranscriptStep() {
   const dispatch = useDispatch();
   const { transcript: transcriptState } = useSelector(
      (state) => state.videoForm
   );
   const { generateTranscript, isLoading, isError, error } =
      useTranscriptGenerator();

   const form = useForm({
      resolver: zodResolver(transcriptSchema),
      defaultValues: {
         transcript: transcriptState.text,
      },
      values: {
         transcript: transcriptState.text,
      },
   });

   const onSubmit = (data) => {
      dispatch(setTranscriptText(data.transcript || ""));
      dispatch(nextStep());
   };

   const handleGenerate = () => {
      generateTranscript();
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col h-full"
         >
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-bold">Video Transcript</h2>
                  <p className="text-muted-foreground mt-1">
                     AI-generated or add your own transcript
                  </p>
               </div>
               <div className="flex gap-2">
                  <Button
                     type="button"
                     variant="outline"
                     size="sm"
                     onClick={handleGenerate}
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Generating...
                        </>
                     ) : (
                        <>
                           <Sparkles className="mr-2 h-4 w-4" />
                           Generate with AI
                        </>
                     )}
                  </Button>
                  {transcriptState.text && !isLoading && (
                     <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerate}
                        title="Regenerate transcript"
                     >
                        <RefreshCw className="h-4 w-4" />
                     </Button>
                  )}
               </div>
            </div>

            <div className="flex-grow flex flex-col space-y-4">
               {/* Status Indicators */}
               {isLoading && (
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                     <Loader2 className="h-4 w-4 animate-spin" />
                     <span>AI is generating transcript...</span>
                  </div>
               )}

               {isError && (
                  <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
                     <AlertCircle className="h-4 w-4" />
                     <span>{error || "Failed to generate transcript"}</span>
                     <Button
                        type="button"
                        variant="link"
                        className="text-destructive underline p-0 h-auto"
                        onClick={handleGenerate}
                     >
                        Try again
                     </Button>
                  </div>
               )}

               <FormField
                  control={form.control}
                  name="transcript"
                  render={({ field }) => (
                     <FormItem className="flex-grow flex flex-col">
                        <FormLabel>Transcript (Optional)</FormLabel>
                        <FormControl>
                           <Textarea
                              placeholder="Enter video transcript or let AI generate it..."
                              className="flex-grow min-h-[200px] resize-none"
                              disabled={isLoading}
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
                  {form.getValues("transcript") ? "Next" : "Skip"}
                  <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
            </div>
         </form>
      </Form>
   );
}

export default TranscriptStep;
