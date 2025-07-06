"use client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CollapsibleTrigger } from "./collapsible";
import { SidebarMenuButton, SidebarMenuSubButton } from "./sidebar";

export function MainSidebarMenuButton({
  href,
  title,
  type,
  exactMatch = false,
}: {
  href: string;
  title: string;
  type: "topLevel" | "parent" | "child";
  exactMatch?: boolean;
}) {
  const pathname = usePathname();
  const isActive = () => {
    if (href === "/" || exactMatch) {
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
        <SidebarMenuButton isActive={isActive()} tooltip={title}>
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
