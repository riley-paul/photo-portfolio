import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";

import { Menu, X } from "lucide-react";
// import { NavMenu } from "./NavMenu";
import { cn } from "@/lib/utils";

interface Props {
  pathname: string;
}

export default function Navbar({ pathname = "" }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const collapse = (event: KeyboardEvent) => {
    if (event.key === "Escape") setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", collapse);
    return () => window.removeEventListener("keydown", collapse);
  }, []);

  return (
    <header
      className={cn(
        "bg-base-100 sticky top-0 z-50 w-full shadow-lg",
        isOpen && "pb-4 md:pb-0",
      )}
    >
      <div className="container2 flex flex-col justify-between md:flex-row md:items-center">
        <div className="z-40 flex items-center justify-between">
          <a id="logo" href="/" className="flex items-center gap-2">
            <div className="flex h-16 w-10 items-center">
              <img className="h-auto w-auto" src="/favicon.png" alt="logo" />
            </div>
            Riley Paul
          </a>
          <Button
            variant="ghost"
            className="md:hidden"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <div className={cn("hidden md:block", isOpen && "block")}>
          {/*<NavMenu pathname={pathname} />*/}
        </div>
      </div>
    </header>
  );
}
