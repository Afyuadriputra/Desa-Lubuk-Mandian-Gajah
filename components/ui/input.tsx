import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "flex h-10 w-full rounded-2xl border border-slate-200/80 bg-white/85 px-3.5 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
