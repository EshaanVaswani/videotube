import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import { ModeToggle } from "./components/mode-toggle";

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
         <div className="absolute right-5 top-5">
            <ModeToggle />
         </div>
         <Routes>
            {/* {AUTH} */}
            <Route path="/auth" element={<AuthLayout />}>
               <Route path="login" element={<Login />} />
               <Route path="register" element={<Register />} />
            </Route>

            {/* PROTECTED */}
            <Route
               path="/"
               element={
                  <ProtectedRoute>
                     <Home />
                  </ProtectedRoute>
               }
            />
         </Routes>
      </>
   );
}

export default App;
