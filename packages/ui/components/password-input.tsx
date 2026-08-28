import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@northware/ui/components/shadcn/input-group";
import { cn } from "@northware/ui/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

export function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup className={cn(props.className)} {...props}>
      <InputGroupInput type={showPassword ? "text" : "password"} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Passwort anzeigen/verbergen"
          onClick={() => setShowPassword(!showPassword)}
          size="icon-xs"
          title="Passwort anzeigen/verbergen"
        >
          {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
