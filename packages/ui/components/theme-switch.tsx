"use client";

import { Button } from "@northware/ui/components/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeSwitch({
  className,
  variant = "ghost",
  withDescriptionText = false,
}: {
  className?: string;
  variant?: "ghost" | "outline";
  withDescriptionText?: boolean;
}) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      className={className}
      onClick={toggleTheme}
      size={withDescriptionText ? "sm" : "icon"}
      variant={variant}
    >
      <SunIcon className="hidden group-[.storybook-darkTheme]:block [html.dark_&]:block" />
      <MoonIcon className="hidden group-[.storybook-lightTheme]:block [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
      {withDescriptionText && (
        <span className="ml-2" suppressHydrationWarning>
          {resolvedTheme === "dark"
            ? "Helles Design aktivieren"
            : "Dunkles Design aktivieren"}
        </span>
      )}
    </Button>
  );
}
