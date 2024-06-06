import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Badge,
  CircleUser,
  Eye,
  Home,
  LogOut,
  Menu,
  Newspaper,
  Package,
  ShoppingCart,
  TreeDeciduous,
  Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

const AdminNavBar = () => {
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
          ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground cursor-pointer"
          : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
      }`;
    } else {
      return `${
        currentUrl.pathname.includes(url)
          ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground cursor-pointer"
          : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
      }`;
    }
  };

  return (
    <header className=" flex h-14 items-center justify-between md:hidden md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to={"/admin"}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="">Nuôi Cây Admin</span>
            </Link>
            <Link to={"/admin"} className={getAcitveLink("")}>
              <Home className="h-5 w-5" />
              Bảng điều khiển
            </Link>
            <Link to={"user"} className={getAcitveLink("user")}>
              <Users className="h-5 w-5" />
              Người dùng
            </Link>
            <Link to={""} className={getAcitveLink("trees")}>
              <TreeDeciduous className="h-5 w-5" />
              Cây trồng
            </Link>
            <Link to={""} className={getAcitveLink("order")}>
              <ShoppingCart className="h-5 w-5" />
              Giao dịch
            </Link>
            <Link to={"news"} className={getAcitveLink("news")}>
              <Newspaper className="h-5 w-5" />
              Tin tức
            </Link>
            <Link to={"/"} className={getAcitveLink("home")}>
              <Eye className="h-5 w-5" />
              Qua trang chính
            </Link>
            <div
              className={getAcitveLink("logout")}
              onClick={() => handleLogOut()}
            >
              <LogOut className="h-5 w-5" />
              Thoát
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default AdminNavBar;
