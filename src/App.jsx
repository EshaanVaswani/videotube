import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Error } from "./components/Error";
import { Loader } from "./components/Loader";

const AuthLayout = lazy(() => import("./components/layouts/AuthLayout"));
const HomeLayout = lazy(() => import("./components/layouts/HomeLayout"));
const DashboardLayout = lazy(() =>
   import("./components/layouts/DashboardLayout")
);

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

const Home = lazy(() => import("./pages/public/home"));
const Explore = lazy(() => import("./pages/public/explore"));
const Channel = lazy(() => import("./pages/public/channel"));
const Watch = lazy(() => import("./pages/public/watch"));
const Playlist = lazy(() => import("./pages/public/playlist"));

const Subscriptions = lazy(() => import("./pages/protected/subscriptions"));
const LikedVideos = lazy(() => import("./pages/protected/liked-videos"));
const WatchLater = lazy(() => import("./pages/protected/watch-later"));
const History = lazy(() => import("./pages/protected/history"));

const Dashboard = lazy(() => import("./pages/protected/dashboard/dashboard"));
const Content = lazy(() => import("./pages/protected/dashboard/content"));
const Customisation = lazy(() =>
   import("./pages/protected/dashboard/customisation")
);
const Security = lazy(() => import("./pages/protected/dashboard/security"));
const Subscribers = lazy(() =>
   import("./pages/protected/dashboard/subscribers")
);
const Analytics = lazy(() => import("./pages/protected/dashboard/analytics"));

import { useCurrentUserQuery } from "./store/api/authApi";
import { userExist, userNotExist } from "./store/reducers/authReducer";

const ProtectedRoute = ({ children }) => {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.auth.user);

   const { data, isLoading, isError } = useCurrentUserQuery();

   useEffect(() => {
      if (data) {
         dispatch(userExist(data));
      } else if (isError && user === undefined) {
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
      <Suspense fallback={<Loader />}>
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
      </Suspense>
   );
}

export default App;
