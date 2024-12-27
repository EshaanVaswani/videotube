import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
   Bell,
   HelpCircle,
   ListPlus,
   Menu,
   SquarePen,
   Upload,
   Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/UserButton";
import { ModeToggle } from "@/components/ModeToggle";
import { SearchBar } from "@/components/navigation/SearchBar";

import { open } from "@/store/reducers/videoModalReducer";
import { toggle } from "@/store/reducers/dashboardSidebarReducer";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";

export const DashboardNavbar = () => {
   const dispatch = useDispatch();

   const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

   const { userId } = useParams();

   return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
         <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
               <Button variant="ghost" onClick={() => dispatch(toggle())}>
                  <Menu className="size-1" />
               </Button>
               <Link to="/">
                  <div className="flex items-center gap-1">
                     <img
                        src="/logo.png"
                        alt="VideoTube"
                        width={50}
                        height={50}
                        className="hidden dark:block"
                     />
                     <img
                        src="/logo-dark.png"
                        alt="VideoTube"
                        width={50}
                        height={50}
                        className="dark:hidden"
                     />
                  </div>
               </Link>
            </div>

            <SearchBar />

            <div className="flex items-center gap-1 sm:gap-2">
               <ModeToggle />
               <Button variant="ghost" size="icon">
                  <HelpCircle className="size-7" />
               </Button>
               <DropdownMenu
                  open={dropdownMenuOpen}
                  onOpenChange={setDropdownMenuOpen}
               >
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost">
                        <Video className="size-7" />
                        Create
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem
                        onClick={() => {
                           setDropdownMenuOpen(false);
                           dispatch(open(""));
                        }}
                     >
                        <Upload className="size-5" />
                        Upload Video
                     </DropdownMenuItem>
                     <Link to={`/dashboard/${userId}/content/?tab=posts`}>
                        <DropdownMenuItem>
                           <SquarePen className="size-5" />
                           Create Post
                        </DropdownMenuItem>
                     </Link>
                     <DropdownMenuItem>
                        <ListPlus className="size-5" />
                        New Playlist
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
               <Button variant="ghost" size="icon" asChild>
                  <UserButton />
               </Button>
            </div>
         </div>
      </nav>
   );
};
