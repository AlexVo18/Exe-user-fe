import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./app/components/ui/toaster.tsx";
import AuthProvider from "./app/contexts/AuthContext.tsx";
import QuantityProvider from "./app/contexts/QuantityContext.tsx";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_MEASUREMENT_ID);

ReactGA.send({ hitType: "pageview", page: window.location.pathname });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <AuthProvider>
      <QuantityProvider>
        <App />
        <Toaster />
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
