import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
   return (
      <div className="flex items-center justify-center h-full">
         <Outlet />
      </div>
   );
};

export default AuthLayout;
