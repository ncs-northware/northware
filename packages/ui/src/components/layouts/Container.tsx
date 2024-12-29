import { SiteHeader } from '@northware/ui/components/menu/SiteHeader';
import { cn } from '@northware/ui/lib/utils';
import type { ReactNode } from 'react';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <SiteHeader />
      <main className={cn('container pt-8', className)}>{children}</main>
    </>
  );
}
