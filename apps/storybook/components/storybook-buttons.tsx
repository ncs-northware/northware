import { Button } from "@northware/ui/components/base/button";
import SvgGithub from "@northware/ui/icons/generated/github";
import SvgShadcnui from "@northware/ui/icons/generated/shadcnui";
import Link from "next/link";
export const ViewSource = ({ path }: { path: string }) => {
  const baseurl =
    "https://github.com/ncs-northware/northware/tree/main/packages/ui/src";
  return (
    <Button asChild variant="secondary" size="sm">
      <Link href={`${baseurl}/${path}`} target="_blank">
        <SvgGithub className="text-primary" />
        Quellcode anzeigen
      </Link>
    </Button>
  );
};

export const ShadcnDocs = ({ path }: { path: string }) => {
  const baseurl = "https://ui.shadcn.com/docs";

  return (
    <Button asChild variant="secondary" size="sm">
      <Link href={`${baseurl}/${path}`} target="_blank">
        <SvgShadcnui className="text-primary" />
        shadcn/ui Docs
      </Link>
    </Button>
  );
};
