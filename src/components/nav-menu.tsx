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
                <NavigationMenuTrigger active={link.active}>
                  {link.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {link.children.map((child) => (
                    <NavigationMenuLink
                      key={child.link}
                      active={child.active}
                      className="min-w-52"
                      asChild
                    >
                      <div>
                        {}
                        <a href={child.link}>{child.name}</a>
                      </div>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );

          return (
            <NavigationMenuItem key={link.link}>
              <NavigationMenuLink
                active={link.active}
                className={navigationMenuTriggerStyle({ active: link.active })}
                asChild
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
