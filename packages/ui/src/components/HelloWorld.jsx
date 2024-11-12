import { cn } from "../cn";
import { Button } from "./Button";

export function HelloWorld({ className }) {
  return (
    <div className={cn(className, "ui-text-cockpit-300")}>
      <h1 className="ui-text-4xl ui-font-medium">Hello World</h1>
      <Button className="ui-text-4xl ui-bg-slate-500" />
    </div>
  );
}
