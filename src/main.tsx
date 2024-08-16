import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./app/components/ui/toaster.tsx";
import AuthProvider from "./app/contexts/AuthContext.tsx";
import QuantityProvider from "./app/contexts/QuantityContext.tsx";
import { Analytics } from "@vercel/analytics/react";
import Tracking from "./app/components/main/Tracking.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <AuthProvider>
      <QuantityProvider>
        <App />
        <Toaster />
        <Tracking />
      </QuantityProvider>
    </AuthProvider>
    <Analytics
      beforeSend={(e) => {
        if (e.url.includes("admin")) return null;
        return e;
      }}
    />
  </div>
);
