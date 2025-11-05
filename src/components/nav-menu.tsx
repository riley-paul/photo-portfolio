import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { Link } from "@/lib/types";

interface Props {
  pathname: string;
  links: Link[];
}

export const NavMenu: React.FC<Props> = ({ pathname, links }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap justify-normal">
        {links.map((link) => (
          <NavigationMenuItem>
            {link.children ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    link.active(pathname) && "text-primary font-bold",
                    "hover:text-primary",
                  )}
                >
                  {link.icon && (
                    <link.icon className="text-secondary-foreground mr-3 h-4 w-4" />
                  )}
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <ul className="grid w-[300px] gap-1 p-2">
                    {link.children.map((child) => (
                      <li>
                        <a href={child.link}>
                          <NavigationMenuLink
                            className={cn(
                              navigationMenuTriggerStyle(),
                              "h-auto w-full justify-start",
                              child.active(pathname) &&
                                "text-primary font-bold",
                            )}
                          >
                            {child.icon && (
                              <child.icon className="text-secondary-foreground mr-3 h-4 w-4" />
                            )}
                            {child.name}
                          </NavigationMenuLink>
                        </a>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <a href={link.link}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    link.active(pathname) && "text-primary font-bold",
                    "hover:text-primary",
                  )}
                >
                  {link.icon && (
                    <link.icon className="text-secondary-foreground mr-3 h-4 w-4" />
                  )}
                  {link.name}
                </NavigationMenuLink>
              </a>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
