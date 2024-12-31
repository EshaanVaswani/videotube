import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Error } from "./components/Error";
import { Loader } from "./components/Loader";

import AuthLayout from "./components/layouts/AuthLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/public/home";
import Channel from "./pages/public/channel";
import Watch from "./pages/public/watch";
import Playlist from "./pages/public/playlist";

import Dashboard from "./pages/protected/dashboard";
import Content from "./pages/protected/content";
import Subscriptions from "./pages/protected/subscriptions";
import LikedVideos from "./pages/protected/liked-videos";
import History from "./pages/protected/history";

import { useCurrentUserQuery } from "./store/api/authApi";
import { userExist, userNotExist } from "./store/reducers/authReducer";

const ProtectedRoute = ({ children }) => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);

   const { data, isLoading, isError } = useCurrentUserQuery();

   useEffect(() => {
      if (data) {
         dispatch(userExist(data));
      } else if (isError) {
         dispatch(userNotExist());
      }
   }, [data, isError, dispatch]);

   if (isLoading) {
      return <Loader />;
   }

   if (!user && !data) {
      return (
         <Error
            error="Unauthorized request"
            description="Sorry, this page is not accessible. Please login to access this page."
            buttonLabel="Go to Login"
            buttonLink="/auth/login"
         />
      );
   }

   return children;
};

function App() {
   const dispatch = useDispatch();

   const { data: user } = useCurrentUserQuery(undefined, {
      skip: !!useSelector((state) => state.auth.user),
   });

   useEffect(() => {
      if (user) {
         dispatch(userExist(user));
      }
   }, [user, dispatch]);

   return (
      <>
         <Routes>
            <Route path="/auth" element={<AuthLayout />}>
               <Route path="login" element={<Login />} />
               <Route path="register" element={<Register />} />
            </Route>

            <Route path="/" element={<HomeLayout />}>
               <Route path="" element={<Home />} />
               <Route path="channel/:username" element={<Channel />} />
               <Route path="playlist/:playlistId" element={<Playlist />} />
               <Route
                  path="subscriptions"
                  element={
                     <ProtectedRoute>
                        <Subscriptions />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="liked-videos"
                  element={
                     <ProtectedRoute>
                        <LikedVideos />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="history"
                  element={
                     <ProtectedRoute>
                        <History />
                     </ProtectedRoute>
                  }
               />
            </Route>

            <Route path="watch/:videoId" element={<Watch />} />
            <Route
               path="dashboard/:userId"
               element={
                  <ProtectedRoute>
                     <DashboardLayout />
                  </ProtectedRoute>
               }
            >
               <Route path="" element={<Dashboard />} />
               <Route path="content" element={<Content />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
