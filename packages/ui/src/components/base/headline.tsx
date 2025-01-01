import { cn } from '@northware/ui/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title';
}
// TODO: über cva steuern?
const basicClasses = 'scroll-m-20 tracking-tight';

export function Headline({
  children,
  level,
  className,
  ...props
}: HeadlineProps) {
  switch (level) {
    case 'h1':
      return (
        <h1
          className={cn('mb-3 font-bold text-4xl', basicClasses, className)}
          {...props}
        >
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={cn(
            'font-semibold text-3xl first:mt-0',
            basicClasses,
            className
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={cn('font-semibold text-2xl', basicClasses, className)}
          {...props}
        >
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={cn('font-semibold text-xl', basicClasses, className)}
          {...props}
        >
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5
          className={cn('font-medium text-lg', basicClasses, className)}
          {...props}
        >
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h5
          className={cn('font-medium text-base', basicClasses, className)}
          {...props}
        >
          {children}
        </h5>
      );
    default:
      return (
        <p className="font-bold text-4xl text-warning">
          Achtung das Headline-Level {level} wird noch nicht unterstützt.
        </p>
      );
  }
}
