'use client';

import { Button } from '@northware/ui/components/base/Button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

export function ThemeSwitch({
  className,
  variant = 'blank',
}: {
  className?: string;
  variant?: 'blank' | 'outline';
}) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      className={className}
      onClick={toggleTheme}
      variant={variant}
      size="icon"
    >
      <SunIcon className="hidden [html.dark_&]:block" />
      <MoonIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
