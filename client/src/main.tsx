import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Loader from "./components/Loader.tsx";

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loader/>}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Suspense>
);
