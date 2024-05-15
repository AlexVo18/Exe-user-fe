import { cn } from "@/app/lib/utils";
import { MenuIcon, Package2Icon } from "lucide-react";
import React, { useState } from "react";
import { Link, LinkProps, To } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";

interface ListItemProps extends LinkProps {
  className?: string;
  title: string;
  to: LinkProps["to"];
  children?: React.ReactNode;
}

const Navbar = () => {

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
              <div className="text-sm font-medium leading-none">{title}</div>
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
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mt-2 pb-2">
      <nav className="hidden flex-col justify-between gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <Link to={"/"}>
          <img src="src\assets\Logo_With_Name.svg" alt="Logo.img" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={"/about"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-mainBrown">
                  VỀ CHÚNG TÔI
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-none ml-4 ">
              <NavigationMenuTrigger className="text-muted-foreground transition-colors hover:text-mainBrown ">
                TIN TỨC
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4 md:w-[200px] ">
                  {newsType.map((news) => (
                    <ListItem
                      key={news.title}
                      title={news.title}
                      to={news.href}
                      className="text-muted-foreground transition-colors hover:text-mainBrown "
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

            <NavigationMenuItem>
              <Link to={"/sponsor"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-mainBrown">
                  TRI ÂN
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="outline" className="ml-4">
                <Link to={"/donation"}>QUYÊN GÓP</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <nav className="flex justify-between items-center md:hidden w-full ">
        <Link to={"/"}>
          <img src="src\assets\Logo_With_Name.svg" alt="Logo.img" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden border-none hover:bg-transparent"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5 text-mainBrown" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-2 text-lg font-medium">
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
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-mainBrown transition-colors"
                  to={"/news"}
                >
                  TIN TỨC
                </Link>
              </SheetClose>
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
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-mainBrown transition-colors"
                  to={"/packs"}
                >
                  TRI ÂN
                </Link>
              </SheetClose>
              <SheetClose asChild className="flex justify-center">
                <Link to={"/donation"}>
                  <Button
                    variant="outline"
                    className="text-muted-foreground hover:text-mainBrown text-center transition-colors"
                  >
                    QUYÊN GÓP
                  </Button>
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
