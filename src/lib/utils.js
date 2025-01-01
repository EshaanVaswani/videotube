import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

export const formatDuration = (duration) => {
   const seconds = Math.floor(duration);

   const hours = Math.floor(seconds / 3600);
   const minutes = Math.floor((seconds % 3600) / 60);
   const remainingSeconds = seconds % 60;

   if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
         2,
         "0"
      )}:${String(remainingSeconds).padStart(2, "0")}`;
   } else {
      return `${String(minutes).padStart(2, "0")}:${String(
         remainingSeconds
      ).padStart(2, "0")}`;
   }
};

export const formatNumber = (num) => {
   if (num === undefined) return 0;

   if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
   }
   if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
   }
   return num.toString();
};
