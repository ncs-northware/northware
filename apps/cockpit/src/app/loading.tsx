import { LoaderCircleIcon } from "@northware/ui/icons/lucide";

export default function Loading() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-4">
      <LoaderCircleIcon className="size-12 animate-spin" />
      <p className="text-muted-foreground text-xl">Die Seite wird geladen...</p>
    </div>
  );
}
