import { cn } from "../utils/cn";

export function HelloWorld({ className }) {
  return (
    <div className={cn(className, "ui-text-white size-16")}>
      <h1 className="ui-text-4xl ui-font-medium">Hello World</h1>
    </div>
  );
}
