import { LoaderCircleIcon } from "@northware/ui/icons/lucide";

export default function Loading() {
  return (
    <div className="flex h-svh animate-spin items-center justify-center">
      <LoaderCircleIcon className="size-10 text-primary" />
    </div>
  );
}
