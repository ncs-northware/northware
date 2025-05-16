import { Button } from "@northware/ui/components/base/button";
import { Input } from "@northware/ui/components/form-parts/input";
import { cn } from "@northware/ui/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("rounded-r-none border-r-0", props.className)}
        {...props}
      />
      <Button
        onClick={() => setShowPassword(!showPassword)}
        variant="ghost"
        size="icon"
        className="rounded-l-none border border-input bg-background dark:bg-input/30"
        type="button"
      >
        {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
}

export { PasswordInput };
