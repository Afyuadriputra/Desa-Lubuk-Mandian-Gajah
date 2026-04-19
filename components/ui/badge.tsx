import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-secondary/12 bg-secondary-container/95 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2d1600]",
        className,
      )}
      {...props}
    />
  );
}
