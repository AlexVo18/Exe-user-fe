import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./app/components/ui/toaster.tsx";
import AuthProvider from "./app/contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </div>
);
