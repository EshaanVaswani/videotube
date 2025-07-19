"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import { Card } from "@/components/ui/card";

import { UploadStep } from "./UploadStep";
import { DetailsStep } from "./DetailsStep";
import { TranscriptStep } from "./TranscriptStep";
import { TagsCategoriesStep } from "./Tags&CategoriesStep";
import { ReviewStep } from "./ReviewStep";

const TOTAL_STEPS = 5;

export default function MultiStepPublishForm() {
   const [step, setStep] = useState(0);

   const renderStep = () => {
      switch (step) {
         case 0:
            return <UploadStep onNext={() => setStep(1)} />;
         case 1:
            return (
               <DetailsStep
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
               />
            );
         case 2:
            return (
               <TranscriptStep
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
               />
            );
         case 3:
            return (
               <TagsCategoriesStep
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
               />
            );
         case 4:
            return <ReviewStep onBack={() => setStep(3)} />;
         default:
            return null;
      }
   };

   return (
      <Card className="w-full h-[600px] mx-auto p-6 space-y-6 flex flex-col">
         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
               className="h-full bg-blue-950 transition-all duration-300"
               style={{ width: `${(step / (TOTAL_STEPS - 1)) * 100}%` }}
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
