import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ColumnsToggle = ({ table }) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline">
               Columns <ChevronDown />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            {table
               .getAllColumns()
               .filter((c) => c.getCanHide())
               .map((c) => (
                  <DropdownMenuCheckboxItem
                     key={c.id}
                     checked={c.getIsVisible()}
                     onCheckedChange={(v) => c.toggleVisibility(!!v)}
                  >
                     {c.id}
                  </DropdownMenuCheckboxItem>
               ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
