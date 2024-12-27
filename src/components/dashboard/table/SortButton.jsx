import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export const SortButton = ({ column, title }) => {
   return (
      <Button
         variant="ghost"
         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
         {title}
         <ArrowUpDown />
      </Button>
   );
};
