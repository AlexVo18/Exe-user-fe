import { Link, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
  const currentUrl = useLocation();
  const getAcitveLink = (url: string) => {
    const urlEnd = currentUrl.pathname.slice(-7).replace("/", "");
    if (url === "") {
      return `${
        urlEnd === "profile" ? "font-semibold text-mainBrown" : ""
      } hover:text-mainBrown transition-colors`;
    } else {
      return `${
        currentUrl.pathname.includes(url) ? "font-semibold text-mainBrown" : ""
      } hover:text-mainBrown transition-colors`;
    }
  };
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground "
      x-chunk="dashboard-04-chunk-0"
    >
      <Link to={""} className={getAcitveLink("")}>
        Thông tin người dùng
      </Link>
      <Link to={"history"} className={getAcitveLink("history")}>
        Lịch sử giao dịch
      </Link>
    </nav>
  );
};

export default ProfileSidebar;
