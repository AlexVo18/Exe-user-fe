import Footer from "@/app/components/main/Footer";
import Navbar from "@/app/components/main/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-muted/40">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
