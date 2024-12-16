import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import store from "./store/store.js";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <Provider store={store}>
         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
               <Toaster />
               <App />
            </BrowserRouter>
         </ThemeProvider>
      </Provider>
   </StrictMode>
);
