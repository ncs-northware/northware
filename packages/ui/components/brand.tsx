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
  const brandColors = {
    cockpit: "text-cockpit",
    finance: "text-finance",
    trader: "text-trader",
  };

  const subBrand = () => {
    switch (service) {
      case "cockpit":
        return "Cockpit";
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
        Northware{" "}
        <span className={`${brandColors[service]}`}>{subBrand()}</span>
      </span>
    </div>
  );
}

export function BrandIcon({
  service,
  ...props
}: React.HTMLAttributes<SVGElement> & { service: ServiceType }) {
  switch (service) {
    case "cockpit":
      return <CockpitIcon {...props} />;
    case "finance":
      return <FinanceIcon {...props} />;
    case "trader":
      return <TraderIcon {...props} />;

    default:
      return "";
  }
}
