import { cn } from "@/app/lib/utils";
import {
  LogOut,
  MenuIcon,
  Settings,
  TreeDeciduous,
  User,
  UserCog,
} from "lucide-react";
import React, { useContext } from "react";
import { Link, LinkProps, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import DonateButton from "../button/DonateButton";
import { Accordion, AccordionContent, AccordionTrigger } from "../ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { AuthContext } from "@/app/contexts/AuthContext";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ListItemProps extends LinkProps {
  className?: string;
  title: string;
  to: LinkProps["to"];
  children?: React.ReactNode;
}

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const currentUrl = useLocation();
  const navigate = useNavigate();
  const newsType: { title: string; href: string }[] = [
    {
      title: "Cập nhật hằng tháng",
      href: "/news/update",
    },
    {
      title: "Truyền thông",
      href: "/news/media",
    },
    {
      title: "Nét sống xanh",
      href: "/news/life-style",
    },
  ];
  const handleLogOut = () => {
    logout();
    if (currentUrl.pathname.includes("donation")) {
      navigate("/");
    }
  };

  const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, to, ...props }, ref) => {
      return (
        <div>
          <NavigationMenuLink asChild>
            <Link
              ref={ref}
              to={to}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm leading-none font-semibold">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </Link>
          </NavigationMenuLink>
        </div>
      );
    }
  );
  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6 pt-2 pb-2 z-10">
      {/* Navbar thường */}
      <nav className="hidden flex-col justify-between gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm w-full">
        <Link to={"/"}>
          <img src="images/Logo_With_Name.svg" alt="Logo.img" />
        </Link>
        <NavigationMenu className="font-semibold">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={"/about"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-mainBrown">
                  VỀ CHÚNG TÔI
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-none ml-4 ">
              <NavigationMenuTrigger className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold">
                TIN TỨC
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4 md:w-[200px] ">
                  {newsType.map((news) => (
                    <ListItem
                      key={news.title}
                      title={news.title}
                      to={news.href}
                      className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold"
                    ></ListItem>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/packs"} className="">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-mainBrown">
                  ĐỒNG HÀNH NUÔI CÂY
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <Link to={"/sponsor"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-mainBrown">
                  TRI ÂN
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
            {userInfo ? (
              <>
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold ml-4 cursor-pointer">
                        TÀI KHOẢN
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-32">
                      <DropdownMenuLabel className="flex items-center">
                        <User className="mr-2" size={16} />
                        <div>{userInfo.username}</div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {userInfo.roleID === 1 ? (
                        <DropdownMenuItem className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold flex items-center cursor-pointer">
                          <UserCog className="mr-2" size={16} />
                          <Link to={"/admin"}>Sang Admin</Link>
                        </DropdownMenuItem>
                      ) : (
                        <></>
                      )}
                      <DropdownMenuItem className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold flex items-center cursor-pointer">
                        <Settings className="mr-2" size={16} />
                        <Link to={""}>Cài đặt</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold flex items-center cursor-pointer">
                        <TreeDeciduous className="mr-2" size={16} />
                        <Link to={""}>Xem Cây</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-muted-foreground transition-colors hover:text-mainBrown font-semibold flex items-center cursor-pointer"
                        onClick={() => handleLogOut()}
                      >
                        <LogOut className="mr-2" size={16} />
                        <div>Thoát</div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <div className="ml-4">
                    <DonateButton
                      title="QUYÊN GÓP"
                      textColor="white"
                      bgColor="bg-mainGreen"
                      link={"/donation"}
                      isDonate={true}
                    />
                  </div>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <Link to={"/login"} className="ml-4 cursor-pointer">
                  <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-mainBrown">
                    ĐĂNG NHẬP
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* Navbar mobile */}
      <nav className="flex justify-between items-center lg:hidden w-full ">
        <Link to={"/"}>
          <img src="images/Logo_With_Name.svg" alt="Logo.img" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 lg:hidden border-none hover:bg-transparent"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5 text-mainBrown" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-2 text-base font-semibold">
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-mainBrown transition-colors mt-2"
                  to={"/"}
                >
                  TRANG CHỦ
                </Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-mainBrown transition-colors"
                  to={"/about"}
                >
                  VỀ CHÚNG TÔI
                </Link>
              </SheetClose>
              <Separator />
              <SheetDescription asChild>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-muted-foreground hover:text-mainBrown transition-colors font-semibold p-0 text-base hover:no-underline">
                      TIN TỨC
                    </AccordionTrigger>
                    <AccordionContent className="py-1 px-4 flex flex-col gap-1 font-normal text-base ">
                      <div>
                        <Link
                          to={"/news"}
                          className="text-muted-foreground hover:text-mainBrown transition-colors "
                        >
                          Cập nhật hằng tháng
                        </Link>
                      </div>
                      <Separator />
                      <div>
                        <Link
                          to={"/news"}
                          className="text-muted-foreground hover:text-mainBrown transition-colors "
                        >
                          Truyền thông
                        </Link>
                      </div>
                      <Separator />
                      <div>
                        <Link
                          to={"/news"}
                          className="text-muted-foreground hover:text-mainBrown transition-colors "
                        >
                          Nét sống xanh
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SheetDescription>
              <Separator />
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-mainBrown transition-colors"
                  to={"/sponsor"}
                >
                  ĐỒNG HÀNH NUÔI CÂY
                </Link>
              </SheetClose>
              <Separator />
              {/* <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-mainBrown transition-colors"
                  to={"/packs"}
                >
                  TRI ÂN
                </Link>
              </SheetClose> */}
              {userInfo ? (
                <SheetDescription asChild>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-muted-foreground hover:text-mainBrown transition-colors font-semibold p-0 text-base hover:no-underline">
                        TIN TỨC
                      </AccordionTrigger>
                      <AccordionContent className="py-1 px-4 flex flex-col gap-1 font-normal text-base ">
                        <SheetClose asChild>
                          <Link
                            to={"/news"}
                            className="text-muted-foreground hover:text-mainBrown transition-colors "
                          >
                            Cập nhật hằng tháng
                          </Link>
                        </SheetClose>
                        <Separator />
                        <SheetClose asChild>
                          <Link
                            to={"/news"}
                            className="text-muted-foreground hover:text-mainBrown transition-colors "
                          >
                            Truyền thông
                          </Link>
                        </SheetClose>
                        <Separator />
                        <SheetClose asChild>
                          <Link
                            to={"/news"}
                            className="text-muted-foreground hover:text-mainBrown transition-colors "
                          >
                            Nét sống xanh
                          </Link>
                        </SheetClose>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SheetDescription>
              ) : (
                <SheetClose asChild>
                  <Link
                    className="text-muted-foreground hover:text-mainBrown transition-colors"
                    to={"/login"}
                  >
                    ĐĂNG NHẬP
                  </Link>
                </SheetClose>
              )}
              <SheetClose asChild className="flex justify-center">
                <SheetClose >
                  <DonateButton
                    title="QUYÊN GÓP"
                    textColor="white"
                    bgColor="bg-mainGreen"
                    link={"/donation"}
                    isDonate={true}
                  />
                </SheetClose>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
