import { cn } from "@/app/lib/utils";
import { MenuIcon, Package2Icon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const newsType: { title: string; href: string }[] = [
    {
      title: "Cập nhật hằng tháng",
      href: "/docs/primitives/alert-dialog",
    },
    {
      title: "Truyền thông",
      href: "/docs/primitives/hover-card",
    },
    {
      title: "Nét sống xanh",
      href: "/docs/primitives/progress",
    },
  ];

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <div>
        <NavigationMenuLink asChild>
          <Link
            to={""}
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
  });
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
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  VỀ CHÚNG TÔI
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-none ml-4 ">
              <NavigationMenuTrigger className="text-muted-foreground transition-colors hover:text-foreground ">
                TIN TỨC
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4 md:w-[200px] ">
                  {newsType.map((news) => (
                    <ListItem
                      key={news.title}
                      title={news.title}
                      href={news.href}
                    ></ListItem>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/packs"} className="">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  ĐỒNG HÀNH NUÔI CÂY
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to={"/sponsor"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
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
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-2 text-lg font-medium">
              <SheetClose asChild>
                <Link className="hover:text-foreground mt-2" to={"/"}>
                  TRANG CHỦ
                </Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  to={"/about"}
                >
                  VỀ CHÚNG TÔI
                </Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  to={"/news"}
                >
                  TIN TỨC
                </Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  to={"/sponsor"}
                >
                  ĐỒNG HÀNH NUÔI CÂY
                </Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link
                  className="text-muted-foreground hover:text-foreground"
                  to={"/packs"}
                >
                  TRI ÂN
                </Link>
              </SheetClose>
              <SheetClose asChild className="flex justify-center">
                <Link to={"/donation"}>
                  <Button
                    variant="outline"
                    className="text-muted-foreground hover:text-foreground text-center"
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
