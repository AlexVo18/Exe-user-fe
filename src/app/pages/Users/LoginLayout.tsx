import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:h-screen w-full flex justify-center items-center bg-login-background">
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
};

export default LoginLayout;
