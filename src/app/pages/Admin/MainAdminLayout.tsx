import AdminNavBar from "@/app/components/main/AdminNavBar";
import Sidebar from "@/app/components/main/Sidebar";
import { Outlet } from "react-router-dom";

const MainAdminLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <AdminNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainAdminLayout;
