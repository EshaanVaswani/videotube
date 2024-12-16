import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

   if (isLoggedIn) {
      return <Navigate to="/" replace />;
   }

   return (
      <div className="flex items-center justify-center h-full">
         <Outlet />
      </div>
   );
};

export default AuthLayout;
