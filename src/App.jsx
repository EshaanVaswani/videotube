import { Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ModeToggle } from "./components/mode-toggle";

function App() {
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
         </Routes>
      </>
   );
}

export default App;
