import { cn } from "@/lib/utils";

export function Stepper({ step }) {
   const steps = [
      "Upload",
      "Details",
      "Transcript",
      "Tags & Category",
      "Review",
   ];

   return (
      <div className="flex items-center justify-between mb-4">
         {steps.map((label, i) => (
            <div
               key={i}
               className={cn(
                  "flex-1 text-center px-2 py-1 rounded",
                  i === step
                     ? "bg-primary text-primary-foreground font-semibold"
                     : "bg-muted text-muted-foreground"
               )}
            >
               {label}
            </div>
         ))}
      </div>
   );
}
