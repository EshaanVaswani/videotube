import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Error } from "./components/Error";
import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./components/layouts/HomeLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/public/home";
import Channel from "./pages/public/channel";

import Watch from "./pages/protected/watch";

import { userExist, userNotExist } from "./store/reducers/authReducer";

const ProtectedRoute = ({ children }) => {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

   if (!isLoggedIn) {
      return (
         <Error
            error="Unauthorized request"
            description="Sorry, this page is not accessible. Please login to access
                  this page."
            buttonLabel="Go to Login"
            buttonLink="/auth/login"
         />
      );
   }

   return children;
};

function App() {
   const user = useSelector((state) => state.auth.user);

   const dispatch = useDispatch();

   useEffect(() => {
      if (user) {
         dispatch(userExist(user));
      } else {
         dispatch(userNotExist());
      }
   }, []);

   return (
      <>
         <Routes>
            {/* AUTH */}
            <Route path="/auth" element={<AuthLayout />}>
               <Route path="login" element={<Login />} />
               <Route path="register" element={<Register />} />
            </Route>

            {/* PUBLIC */}
            <Route path="/" element={<HomeLayout />}>
               <Route path="" element={<Home />} />
               <Route path="channel/:username" element={<Channel />} />
            </Route>

            {/* PROTECTED */}
            <Route
               path="watch/:videoId"
               element={
                  <ProtectedRoute>
                     <Watch />
                  </ProtectedRoute>
               }
            />
         </Routes>
      </>
   );
}

export default App;
