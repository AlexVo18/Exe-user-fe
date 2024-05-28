import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] w-full ">
      <img
        src="src\assets\images\olena-bohovyk-3BlVILvh9hM-unsplash.jpg"
        alt=""
        className="object-cover absolute -z-10 h-[100vh] w-full"
      />
      <div className="flex justify-center items-center h-full ">{children}</div>
    </div>
  );
};

export default LoginLayout;
