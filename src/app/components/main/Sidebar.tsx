import { AuthContext } from "@/app/contexts/AuthContext";
import {
  Eye,
  Home,
  LogOut,
  Newspaper,
  ShoppingCart,
  TreeDeciduous,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const currentUrl = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    if (
      currentUrl.pathname.includes("donation") ||
      currentUrl.pathname.includes("admin")
    ) {
      navigate("/");
    }
  };

  // CSS active tab dựa trên url của trang web
  const getAcitveLink = (url: string) => {
    const urlEnd = currentUrl.pathname.slice(-6).replace("/", "");
    if (url === "") {
      return `${
        urlEnd === "admin"
          ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer"
          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
      }`;
    } else {
      return `${
        currentUrl.pathname.includes(url)
          ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer"
          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
      }`;
    }
  };

  return (
    <div className="sticky flex h-full max-h-screen flex-col gap-2 top-0">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to={"/admin"} className="flex items-center gap-2 font-semibold">
          <span className="">Nuôi Cây Admin</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link to={"/admin"} className={getAcitveLink("")}>
            <Home className="h-4 w-4" />
            Bảng điều khiển
          </Link>
          <Link to={"user"} className={getAcitveLink("user")}>
            <Users className="h-4 w-4" />
            Người dùng
          </Link>
          <Link to={"tree"} className={getAcitveLink("tree")}>
            <TreeDeciduous className="h-4 w-4" />
            Cây trồng
          </Link>
          <Link to={"transaction"} className={getAcitveLink("transaction")}>
            <ShoppingCart className="h-4 w-4" />
            Giao dịch{" "}
          </Link>
          <Link to={"news"} className={getAcitveLink("news")}>
            <Newspaper className="h-4 w-4" />
            Tin tức
          </Link>
          <Link to={"/"} className={getAcitveLink("home")}>
            <Eye className="h-4 w-4" />
            Qua trang chính
          </Link>
          <div
            className={getAcitveLink("logout")}
            onClick={() => handleLogOut()}
          >
            <LogOut className="h-4 w-4" />
            Thoát
          </div>
          {/* <Link to={""} className={getAcitveLink("sponsor")}>
            <Package className="h-4 w-4" />
            Gói Liên Kết
          </Link> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
