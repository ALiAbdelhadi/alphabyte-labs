import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="focus:outline-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
