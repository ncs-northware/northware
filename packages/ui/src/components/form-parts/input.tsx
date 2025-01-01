import { cn } from '@northware/ui/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      dimension: {
        default: 'px-4 py-3',
        lg: 'text-lg sm:p-5',
        sm: 'px-3 py-2 text-sm',
      },
    },
    defaultVariants: { dimension: 'default' },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, dimension, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ dimension, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
