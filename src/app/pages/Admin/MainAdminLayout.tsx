import AdminNavBar from "@/app/components/main/AdminNavBar";
import Sidebar from "@/app/components/main/Sidebar";
import { Button } from "@/app/components/ui/button";
import React from "react";

const MainAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <AdminNavBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAdminLayout;
