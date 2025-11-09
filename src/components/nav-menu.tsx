import type { Link } from "@/lib/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React from "react";

type Props = { links: Link[] };

const NavMenu: React.FC<Props> = ({ links }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => {
          if (link.children)
            return (
              <NavigationMenuItem key={link.link}>
                <NavigationMenuTrigger>{link.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {link.children.map((child) => (
                    <NavigationMenuLink className="min-w-52" asChild>
                      <a href={child.link}>{child.name}</a>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );

          return (
            <NavigationMenuItem key={link.link}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a href={link.link}>{link.name}</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
        <NavigationMenuIndicator />
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

export default NavMenu;
