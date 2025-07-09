"use client";

import { Button } from "@northware/ui/components/ui-registry/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function ThemeSwitch({
	as,
	className,
}: {
	className?: string;
	as: "icon" | "button";
}) {
	const { setTheme, resolvedTheme } = useTheme();

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}, [resolvedTheme, setTheme]);

	if (as === "button") {
		return (
			<Button
				className={className}
				onClick={toggleTheme}
				size="sm"
				variant="secondary"
			>
				<SunIcon className="hidden group-[.storybook-darkTheme]:block [html.dark_&]:block" />
				<MoonIcon className="hidden group-[.storybook-lightTheme]:block [html.light_&]:block" />
				<span className="sr-only">Toggle theme</span>
				<span className="ml-2" suppressHydrationWarning>
					{resolvedTheme === "dark"
						? "Helles Design aktivieren"
						: "Dunkles Design aktivieren"}
				</span>
			</Button>
		);
	}

	// as icon or other variants

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
