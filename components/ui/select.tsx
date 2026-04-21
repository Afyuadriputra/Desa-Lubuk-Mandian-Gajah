import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = React.ComponentProps<"select"> & {
  wrapperClassName?: string;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, wrapperClassName, children, ...props }, ref) => {
    return (
      <div className={cn("relative", wrapperClassName)}>
        <select
          ref={ref}
          data-slot="select"
          className={cn(
            "h-10 w-full appearance-none rounded-2xl border border-slate-200/80 bg-white/85 px-3.5 pr-10 text-sm text-slate-900 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.2)] outline-none transition-all focus:border-slate-300 focus:ring-4 focus:ring-slate-200/70 disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
