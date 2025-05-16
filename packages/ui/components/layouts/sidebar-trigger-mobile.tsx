"use client";

import { Button } from "@northware/ui/components/base/button";
import { useSidebar } from "@northware/ui/components/layouts/sidebar";
import { PanelLeftIcon } from "lucide-react";

export default function SidebarTriggerMobile() {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="block w-full border-b p-1 md:hidden">
      <Button variant="ghost" size="sm" onClick={toggleSidebar}>
        <PanelLeftIcon />
        Menü
      </Button>
    </div>
  );
}
