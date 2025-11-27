import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   setTranscriptText,
   setTranscriptStatus,
   setTranscriptError,
} from "@/store/reducers/videoFormReducer";
import { useGenerateTranscriptMutation } from "@/store/api/transcriptApi";

export function useTranscriptGenerator() {
   const dispatch = useDispatch();
   const { uploadedFiles, transcript } = useSelector(
      (state) => state.videoForm
   );

   const [generateTranscriptMutation] = useGenerateTranscriptMutation();

   const generateTranscript = useCallback(
      async (url = uploadedFiles.videoUrl) => {
         if (!url) {
            dispatch(setTranscriptError("No video URL available"));
            dispatch(setTranscriptStatus("error"));
            return;
         }

         dispatch(setTranscriptStatus("loading"));
         dispatch(setTranscriptError(null));

         try {
            const response = await generateTranscriptMutation({
               videoUrl: url,
            }).unwrap();
            const transcript =
               response?.data?.transcript || response?.transcript || "";
            dispatch(setTranscriptText(transcript));
            dispatch(setTranscriptStatus("success"));
         } catch (error) {
            console.error("Transcript generation error:", error);
            dispatch(
               setTranscriptError(
                  error?.data?.message || "Failed to generate transcript"
               )
            );
            dispatch(setTranscriptStatus("error"));
         }
      },
      [dispatch, uploadedFiles.videoUrl, generateTranscriptMutation]
   );

   return {
      generateTranscript,
      transcript: transcript.text,
      isLoading: transcript.status === "loading",
      isSuccess: transcript.status === "success",
      isError: transcript.status === "error",
      error: transcript.error,
   };
}
