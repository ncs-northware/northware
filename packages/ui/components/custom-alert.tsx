import { cn } from "@northware/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";

const customAlertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 has-data-[slot=alert-action]:pr-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-destructive text-destructive-foreground *:data-[slot=alert-description]:text-destructive-foreground/90",
        info: "bg-info text-info-foreground *:data-[slot=alert-description]:text-info-foreground/90",
        success:
          "bg-success text-success-foreground *:data-[slot=alert-description]:text-success-foreground/90",
        warning:
          "bg-warning text-warning-foreground *:data-[slot=alert-description]:text-warning-foreground/90",
      },
    },
  }
);

function AlertWrapper({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof customAlertVariants>) {
  /* 
    AlertWrapper is a customized Version of shadcns Alert component since AlertWrapper uses a different color-scheme.
    When using Alerts in this project you may use the AlertWrapper Component instead of shadcns Alert.
    You can (and have to) use AlertTitle and AlertDescription from the predifined shadcn code as children of the AlertWrapper.  
  */
  return (
    <div
      className={cn(customAlertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

const AlertIcon = ({
  variant,
}: {
  variant: "default" | "destructive" | "info" | "success" | "warning";
}) => {
  /*
    AlertIcon is a custom component which you can use alongside AlertWrapper and the Alerts from shadcn.
    While shadcn uses lucide icons as alert icons by default the AlertIcon component does the same but based on the given variant prop it renders a predifined icon.
  */
  const icons = {
    default: <InfoIcon className="size-4" />,
    destructive: <CircleAlertIcon className="size-4" />,
    info: <InfoIcon className="size-4" />,
    success: <CircleCheckIcon className="size-4" />,
    warning: <TriangleAlertIcon className="size-4" />,
  };

  return icons[variant] ?? icons.default;
};

export { AlertIcon, AlertWrapper, customAlertVariants };
