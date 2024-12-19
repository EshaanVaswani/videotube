import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./components/layouts/HomeLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/home";
import Watch from "./pages/watch";

import { userExist, userNotExist } from "./store/reducers/authReducer";

const ProtectedRoute = ({ children }) => {
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

   if (!isLoggedIn) {
      return <Navigate to="/auth/login" replace />;
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
            <Route path="/auth" element={<AuthLayout />}>
               <Route path="login" element={<Login />} />
               <Route path="register" element={<Register />} />
            </Route>

            <Route path="/" element={<HomeLayout />}>
               <Route path="" element={<Home />} />
            </Route>

            <Route path="watch/:videoId" element={<Watch />} />
         </Routes>
      </>
   );
}

export default App;
