import type { ServiceType } from "@northware/service-config";
import {
  CockpitIcon,
  DocsIcon,
  FinanceIcon,
  TraderIcon,
} from "@northware/ui/icons";

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
    docs: "text-cockpit",
  };

  const subBrand = {
    cockpit: "Cockpit",
    finance: "Finance",
    trader: "Trader",
    docs: "Docs",
  };

  return (
    <div
      className={cn("flex items-center gap-1 font-semibold text-xl", className)}
    >
      {textOnly ? "" : <BrandIcon className={iconWidth} service={service} />}
      <span>
        Northware{" "}
        <span className={`${brandColors[service]}`}>{subBrand[service]}</span>
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
    case "docs":
      return <DocsIcon {...props} />;

    default:
      return "";
  }
}
