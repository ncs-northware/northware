"use client";

import { NavigationMenuLink } from "@northware/ui/components/menu/NavigationMenuPremitive";
import { cn } from "@northware/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNavLink({
  href,
  title,
  className,
  controlActiveState = true,
}: {
  href: string;
  title: string;
  className?: string;
  controlActiveState?: boolean;
}) {
  const pathname = usePathname();
  const isActive = () => {
    if (!controlActiveState) {
      return false;
    }
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  return (
    <NavigationMenuLink
      href={href}
      className={cn(className, {
        "text-primary hover:bg-primary/60 hover:text-primary-foreground":
          isActive(),
      })}
    >
      {title}
    </NavigationMenuLink>
  );
}

export function MobileNavLink({
  href,
  title,
  linkClasses,
  isChild = false,
  controlActiveState = true,
}: {
  href: string;
  title: string;
  linkClasses?: string;
  isChild?: boolean;
  controlActiveState?: boolean;
}) {
  const pathname = usePathname();
  const isActive = () => {
    if (!controlActiveState) {
      return false;
    }
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <li className="group w-full">
      <Link
        className={cn(
          linkClasses,
          isChild
            ? "flex select-none items-center gap-2 space-y-1 rounded-md p-2 text-sm font-medium leading-none no-underline outline-none transition-colors"
            : "flex flex-1 items-center justify-between rounded-md p-2 text-sm font-medium transition-all hover:underline",
          {
            "text-primary hover:bg-primary/60 hover:text-primary-foreground":
              isActive(),
          },
        )}
        href={href}
      >
        {title}
      </Link>
    </li>
  );
}
