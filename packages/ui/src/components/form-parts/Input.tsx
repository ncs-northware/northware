import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@northware/ui/lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      dimension: {
        default: "px-4 py-3",
        lg: "sm:p-5 text-lg",
        sm: "py-2 px-3 text-sm",
      },
    },
    defaultVariants: { dimension: "default" },
  },
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
  },
);
Input.displayName = "Input";

export { Input };
