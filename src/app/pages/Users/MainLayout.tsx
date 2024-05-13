import Footer from "@/app/components/main/Footer";
import Navbar from "@/app/components/main/Navbar";
import { useAppDispatch } from "@/app/redux/hooks";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
