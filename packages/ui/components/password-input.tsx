import { Button } from "@northware/ui/components/button";
import { Input } from "@northware/ui/components/input";
import { cn } from "@northware/ui/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex">
      <Input
        className={cn("rounded-r-none border-r-0", props.className)}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        className="rounded-l-none border border-input bg-background dark:bg-input/30"
        onClick={() => setShowPassword(!showPassword)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}

export { PasswordInput };
