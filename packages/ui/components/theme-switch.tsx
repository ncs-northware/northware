"use client";

import { Button } from "@northware/ui/components/shadcn/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function ThemeSwitch({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      className={className}
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
    >
      <SunIcon className="hidden group-[.storybook-darkTheme]:block [html.dark_&]:block" />
      <MoonIcon className="hidden group-[.storybook-lightTheme]:block [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
