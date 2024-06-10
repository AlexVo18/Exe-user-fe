import ProfileSidebar from "@/app/components/main/ProfileSidebar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 text-mainBrown">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Cài đặt</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <ProfileSidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileLayout;
