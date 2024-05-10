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
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <img src="src\assets\Logo_With_Name.svg" alt="Logo.img" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={"/"}>
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  Trang chủ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* <Link
              className="text-foreground transition-colors hover:text-foreground"
              to={""}
            >
              Trang chủ
            </Link> */}
            <NavigationMenuItem className="list-none">
              <NavigationMenuTrigger className="text-muted-foreground transition-colors hover:text-foreground">
                Tin tức
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4 md:w-[500px] ">
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
              <Link to={"/docs"}>
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  Đồng hành Nuôi Cây
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/docs"}>
                <NavigationMenuLink className="text-muted-foreground transition-colors hover:text-foreground">
                  Về chúng tôi
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <Button variant="outline">Quyên góp</Button>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
};

export default Navbar;
