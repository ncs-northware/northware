import type { ServiceType } from "@northware/service-config";
import { CockpitIcon, FinanceIcon, TraderIcon } from "@northware/ui/icons";

import { cn } from "@northware/ui/lib/utils";

export function Brand({
  className,
  textOnly = false,
  iconWidth = "w-10",
  service,
}: {
  className?: string;
  textOnly?: boolean;
  iconWidth?: string;
  service: ServiceType;
}) {
  const subBrand = () => {
    switch (service) {
      case "cockpit":
        return "Cockpit";
      case "admin":
        return "Admin";
      case "finance":
        return "Finance";
      case "trader":
        return "Trader";
      default:
        ("");
    }
  };

  return (
    <div
      className={cn("flex items-center gap-1 font-semibold text-xl", className)}
    >
      {textOnly ? "" : <BrandIcon service={service} className={iconWidth} />}
      <span>
        Northware <span className={`text-${service}`}>{subBrand()}</span>
      </span>
    </div>
  );
}

export function BrandIcon({
  service,
  ...props
}: React.HTMLAttributes<SVGElement> & { service: ServiceType }) {
  if (service === "cockpit") {
    return <CockpitIcon {...props} />;
  }

  if (service === "finance") {
    return <FinanceIcon {...props} />;
  }

  if (service === "trader") {
    return <TraderIcon {...props} />;
  }
}
