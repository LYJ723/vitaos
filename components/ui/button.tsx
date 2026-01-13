import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold text-white hover:bg-gold/90 shadow-luxury",
        sky: "bg-transparent text-sky-500 hover:text-sky-400 transition-colors font-semibold tracking-wide",
        luxury: "bg-black text-gold border border-gold/30 hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group",
        outline: "border border-gold bg-transparent text-gold hover:bg-gold/5",
        ghost: "text-text-secondary hover:text-gold hover:bg-gold/5",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 rounded-xl px-5 text-xs font-semibold tracking-wide",
        lg: "h-14 rounded-2xl px-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
