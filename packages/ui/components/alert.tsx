import { cn } from "@northware/ui/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

const alertVariants = cva(
  "relative w-full items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
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
  switch (variant) {
    case "danger":
      return <CircleAlertIcon className="size-4" />;
    case "info":
      return <InfoIcon className="size-4" />;
    case "success":
      return <CircleCheckIcon className="size-4" />;
    case "warning":
      return <TriangleAlertIcon className="size-4" />;
    default:
      return <InfoIcon className="size-4" />;
  }
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
