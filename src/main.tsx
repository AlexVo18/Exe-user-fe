import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./app/components/ui/toaster.tsx";
import AuthProvider from "./app/contexts/AuthContext.tsx";
import QuantityProvider from "./app/contexts/QuantityContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <AuthProvider>
      <QuantityProvider>
        <App />
        <Toaster />
      </QuantityProvider>
    </AuthProvider>
  </div>
);
