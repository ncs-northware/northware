import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@northware/ui/components/ui-registry/breadcrumb";

export interface BreadcrumbType {
  label: string;
  href: string;
  active?: boolean;
}

export function AutoBreadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbType[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-0 sm:gap-0">
        {breadcrumbs.map((breadcrumb, index) => (
          <div className="flex items-center" key={breadcrumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {breadcrumb.active ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden px-2 md:block" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
