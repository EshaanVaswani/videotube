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
import Explore from "./pages/public/explore";
import Channel from "./pages/public/channel";
import Watch from "./pages/public/watch";
import Playlist from "./pages/public/playlist";

import Subscriptions from "./pages/protected/subscriptions";
import LikedVideos from "./pages/protected/liked-videos";
import WatchLater from "./pages/protected/watch-later";
import History from "./pages/protected/history";

import Dashboard from "./pages/protected/dashboard/dashboard";
import Content from "./pages/protected/dashboard/content";
import Customisation from "./pages/protected/dashboard/customisation";
import Security from "./pages/protected/dashboard/security";
import Subscribers from "./pages/protected/dashboard/subscribers";
import Analytics from "./pages/protected/dashboard/analytics";

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
               <Route path="explore" element={<Explore />} />
               <Route path="channel/:username" element={<Channel />} />
               <Route path="playlist/:playlistId" element={<Playlist />} />
            </Route>

            <Route
               path="/"
               element={
                  <ProtectedRoute>
                     <HomeLayout />
                  </ProtectedRoute>
               }
            >
               <Route path="subscriptions" element={<Subscriptions />} />
               <Route path="liked-videos" element={<LikedVideos />} />
               <Route path="history" element={<History />} />
               <Route path="watch-later" element={<WatchLater />} />
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
               <Route path="analytics" element={<Analytics />} />
               <Route path="customisation" element={<Customisation />} />
               <Route path="security" element={<Security />} />
               <Route path="subscribers" element={<Subscribers />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
