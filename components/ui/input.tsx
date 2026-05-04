import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-[#2A2520] bg-[#0E0C0A] px-3 py-2 text-sm text-[#F5F1EA] transition-colors duration-500 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A39B8E] focus-visible:border-[#3F5D4A] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
