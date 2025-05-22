"use client";

import { NavigationMenuLink } from "@northware/ui/components/navigation-menu";
import { cn } from "@northware/ui/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollapsibleTrigger } from "./collapsible";
import { SidebarMenuButton, SidebarMenuSubButton } from "./sidebar";

// FIXME: Remove MainNavLink and MobileNavLink when switched to Sidebar completely

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
            ? "flex select-none items-center gap-2 space-y-1 rounded-md p-2 font-medium text-sm leading-none no-underline outline-none transition-colors"
            : "flex flex-1 items-center justify-between rounded-md p-2 font-medium text-sm transition-all hover:underline",
          {
            "text-primary hover:bg-primary/60 hover:text-primary-foreground":
              isActive(),
          }
        )}
        href={href}
      >
        {title}
      </Link>
    </li>
  );
}

export function MainSidebarMenuButton({
  href,
  title,
  type,
}: { href: string; title: string; type: "topLevel" | "parent" | "child" }) {
  const pathname = usePathname();
  const isActive = () => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (type === "topLevel") {
    return (
      <SidebarMenuButton asChild isActive={isActive()}>
        <Link href={href}>
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    );
  }
  if (type === "parent") {
    return (
      <CollapsibleTrigger asChild>
        <SidebarMenuButton tooltip={title} isActive={isActive()}>
          <span>{title}</span>
          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
    );
  }
  if (type === "child") {
    return (
      <SidebarMenuSubButton asChild isActive={isActive()}>
        <Link href={href}>
          <span>{title}</span>
        </Link>
      </SidebarMenuSubButton>
    );
  }
}
