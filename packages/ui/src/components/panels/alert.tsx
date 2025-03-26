import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@northware/ui/lib/utils";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        danger:
          "bg-danger text-danger-foreground [&>svg]:text-danger-foreground",
        info: "bg-info text-info-foreground [&>svg]:text-info-foreground",
        success:
          "bg-success text-success-foreground [&>svg]:text-success-foreground",
        warning:
          "bg-warning text-warning-foreground [&>svg]:text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

const AlertIcon = ({
  variant,
}: { variant: "default" | "danger" | "info" | "success" | "warning" }) => {
  const classes = "h-4 w-4";
  switch (variant) {
    case "danger":
      return <CircleAlertIcon className={classes} />;
    case "info":
      return <InfoIcon className={classes} />;
    case "success":
      return <CircleCheckIcon className={classes} />;
    case "warning":
      return <TriangleAlertIcon className={classes} />;
    default:
      return <InfoIcon className={classes} />;
  }
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
