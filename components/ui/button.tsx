import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-md border px-5 text-sm font-medium transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F5D4A] disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default:
          "border-[#3F5D4A] bg-[#3F5D4A] text-[#F5F1EA] hover:bg-[#4d7059]",
        secondary:
          "border-[#2A2520] bg-[#1A1614] text-[#F5F1EA] hover:border-[#3F5D4A]",
        ghost:
          "border-transparent bg-transparent text-[#F5F1EA] hover:bg-[#1A1614]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
