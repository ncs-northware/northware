import { Button } from "@northware/ui/components/shadcn/button";
import { GithubIcon, ShadcnuiIcon } from "@northware/ui/icons";
import Link from "next/link";
export const ViewSource = ({ path }: { path: string }) => {
  const baseurl =
    "https://github.com/ncs-northware/northware/tree/main/packages/ui";
  return (
    <Button asChild size="sm" variant="secondary">
      <Link href={`${baseurl}/${path}`} target="_blank">
        <GithubIcon className="text-primary" />
        Quellcode anzeigen
      </Link>
    </Button>
  );
};

export const ShadcnDocs = ({ path }: { path: string }) => {
  const baseurl = "https://ui.shadcn.com/docs";

  return (
    <Button asChild size="sm" variant="secondary">
      <Link href={`${baseurl}/${path}`} target="_blank">
        <ShadcnuiIcon className="text-primary" />
        shadcn/ui Docs
      </Link>
    </Button>
  );
};
