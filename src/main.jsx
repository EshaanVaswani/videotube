import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import store from "./store/store.js";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";

createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <BrowserRouter>
            <Toaster />
            <ModalProvider />
            <App />
         </BrowserRouter>
      </ThemeProvider>
   </Provider>
);
