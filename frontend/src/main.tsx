import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "./styles/animation.css";
import "./styles/app.css";
import "./styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Provider from "./components/provider/Provider";
import { TranslationProvider } from "./i18n/client";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <TranslationProvider>
            <Provider>
               <App />
            </Provider>
         </TranslationProvider>
      </BrowserRouter>
   </StrictMode>
);
