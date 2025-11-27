"use client";

import { useSelector } from "react-redux";

import { Card } from "@/components/ui/card";

import { UploadStep } from "./UploadStep";
import { DetailsStep } from "./DetailsStep";
import { TranscriptStep } from "./TranscriptStep";
import { TagsCategoriesStep } from "./Tags&CategoriesStep";
import { ReviewStep } from "./ReviewStep";

const TOTAL_STEPS = 5;

export default function MultiStepPublishForm() {
   const { currentStep } = useSelector((state) => state.videoForm);

   const renderStep = () => {
      switch (currentStep) {
         case 0:
            return <UploadStep />;
         case 1:
            return <DetailsStep />;
         case 2:
            return <TranscriptStep />;
         case 3:
            return <TagsCategoriesStep />;
         case 4:
            return <ReviewStep />;
         default:
            return null;
      }
   };

   return (
      <Card className="w-full h-[600px] mx-auto p-6 space-y-6 flex flex-col">
         <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
               className="h-full bg-primary transition-all duration-300"
               style={{ width: `${(currentStep / (TOTAL_STEPS - 1)) * 100}%` }}
            />
         </div>
         <div className="flex-grow overflow-auto">
            <div className="w-full max-w-2xl mx-auto h-full">
               {renderStep()}
            </div>
         </div>
      </Card>
   );
}
