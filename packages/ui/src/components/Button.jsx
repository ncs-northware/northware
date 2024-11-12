import { cn } from "../cn";

export const Button = ({ className }) => {
  return (
    <button className={cn("ui-bg-yellow-500", className)}>Boop Button</button>
  );
};
