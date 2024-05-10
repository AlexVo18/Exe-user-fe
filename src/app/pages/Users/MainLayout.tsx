import Navbar from "@/app/components/main/Navbar";
import { useAppDispatch } from "@/app/redux/hooks";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Navbar />
    </>
  );
};

export default MainLayout;
