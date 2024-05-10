import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon, Package2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const components: { title: string; href: string }[] = [
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
          <a
            ref={ref}
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
          </a>
        </NavigationMenuLink>
      </div>
    );
  });
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 mt-2 pb-2">
      <nav className="hidden flex-col justify-between gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <div>
          <img src="src\assets\Logo_With_Name.svg" alt="Logo.img" />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={"/"}>
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  Trang chủ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="list-none ">
              <NavigationMenuTrigger className="text-muted-foreground transition-colors hover:text-foreground ml-4 ">
                Tin tức
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4 md:w-[200px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    ></ListItem>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/docs"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  Đồng hành Nuôi Cây
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/docs"} className="ml-4">
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  Về chúng tôi
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="outline" className="ml-4">
                Quyên góp
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <nav className="flex justify-between items-center md:hidden w-full ">
        <div className="">
          <img src="src\assets\Logo_With_Name.svg" alt="Logo.img" />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              {/* <Link
                className="flex items-center gap-2 text-lg font-semibold"
                to={""}
              >
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link> */}
              <Link className="hover:text-foreground mt-2" to={""}>
                Trang chủ
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                to={""}
              >
                Tin tức
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                to={""}
              >
                Đồng hành Nuôi Cây
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                to={""}
              >
                Về chúng tôi
              </Link>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="text-muted-foreground hover:text-foreground text-center"
                  // to={""}
                >
                  Quyên góp
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
