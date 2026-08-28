import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@northware/ui/components/shadcn/input-group";
import { cn } from "@northware/ui/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

// FIXME: Rethink Component with Radix's PasswordToggleField or InputGroups from shadcn

// function OldPasswordInput({ ...props }) {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="flex">
//       <Input
//         className={cn("rounded-r-none border-r-0", props.className)}
//         type={showPassword ? "text" : "password"}
//         {...props}
//       />
//       <Button
//         className="rounded-l-none border border-input bg-background dark:bg-input/30"
//         onClick={() => setShowPassword(!showPassword)}
//         size="icon"
//         type="button"
//         variant="ghost"
//       >
//         {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
//       </Button>
//     </div>
//   );
// }

export function PasswordInput({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup className={cn(props.className)} {...props}>
      <InputGroupInput type={showPassword ? "text" : "password"}>
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
      </InputGroupInput>
    </InputGroup>
  );
}
