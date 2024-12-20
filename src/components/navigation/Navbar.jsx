import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, Video } from "lucide-react";

import { SearchBar } from "./SearchBar";
import { Button } from "../ui/button";
import { UserButton } from "../UserButton";
import { ModeToggle } from "../ModeToggle";

import { open } from "@/store/reducers/videoModalReducer";
import { toggle } from "@/store/reducers/sidebarReducer";

export const Navbar = () => {
   const navigate = useNavigate();

   const dispatch = useDispatch();

   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

   return (
      <nav className="fixed top-0 left-0 right-0 z-50 border-b">
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

            <div className="flex items-center gap-2">
               <ModeToggle />
               {isLoggedIn ? (
                  <>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="hidden sm:inline-flex"
                        onClick={() => dispatch(open())}
                     >
                        <Video className="size-7" />
                     </Button>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="hidden sm:inline-flex"
                     >
                        <Bell className="size-7" />
                     </Button>
                     <Button variant="ghost" size="icon" asChild>
                        <UserButton />
                     </Button>
                  </>
               ) : (
                  <Button
                     className="hidden sm:block"
                     onClick={() => navigate("/auth/login")}
                  >
                     Login
                  </Button>
               )}
            </div>
         </div>
      </nav>
   );
};
