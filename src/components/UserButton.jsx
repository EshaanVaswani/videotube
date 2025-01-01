import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/Loader";

import {
   useCurrentUserQuery,
   useLogoutUserMutation,
} from "@/store/api/authApi";
import { userNotExist } from "@/store/reducers/authReducer";

export const UserButton = () => {
   const { data: user, isLoading } = useCurrentUserQuery();

   const [logout] = useLogoutUserMutation();

   const dispatch = useDispatch();

   const navigate = useNavigate();

   if (isLoading) {
      return <Loader />;
   }

   if (!user) {
      return null;
   }

   const { username, avatar } = user;

   const handleLogout = async () => {
      try {
         const res = await logout().unwrap();

         if (res.success) {
            toast.success(res.message);
            dispatch(userNotExist());
            navigate("/");
         }
      } catch (error) {
         toast.error("Failed to logout");
      }
   };

   return (
      <DropdownMenu modal={false}>
         <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="rounded-full size-8 hover:opacity-75 transition">
               <AvatarImage
                  className="rounded-md"
                  alt={username}
                  src={avatar}
               />
               <AvatarFallback className="rounded-full bg-sky-500 text-white">
                  {username.charAt(0).toUpperCase()}
               </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="center" side="bottom" className="w-60">
            <DropdownMenuItem onClick={handleLogout} className="h-10">
               <LogOut className="size-4 mr-2" />
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
