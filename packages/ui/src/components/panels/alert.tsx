import { cn } from '@northware/ui/lib';
import { type VariantProps, cva } from 'class-variance-authority';
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import * as React from 'react';

const alertVariants = cva(
  'relative w-full rounded-lg p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        danger:
          'bg-danger text-danger-foreground [&>svg]:text-danger-foreground',
        info: 'bg-info text-info-foreground [&>svg]:text-info-foreground',
        success:
          'bg-success text-success-foreground [&>svg]:text-success-foreground',
        warning:
          'bg-warning text-warning-foreground [&>svg]:text-warning-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

const AlertIcon = ({
  variant,
}: { variant: 'default' | 'danger' | 'info' | 'success' | 'warning' }) => {
  const classes = 'h-4 w-4';
  switch (variant) {
    case 'danger':
      return <CircleAlertIcon className={classes} />;
    case 'info':
      return <InfoIcon className={classes} />;
    case 'success':
      return <CircleCheckIcon className={classes} />;
    case 'warning':
      return <TriangleAlertIcon className={classes} />;
    default:
      return <InfoIcon className={classes} />;
  }
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
