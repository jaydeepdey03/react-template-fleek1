import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Toaster} from "@/components/ui/sonner";
import {ContractContextProvider} from "./Context/ContractContract.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ContractContextProvider>
    <React.StrictMode>
      <App />

      <Toaster />
    </React.StrictMode>
  </ContractContextProvider>
);
