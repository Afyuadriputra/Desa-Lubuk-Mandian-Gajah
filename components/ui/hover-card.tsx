"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type HoverCardContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HoverCardContext = React.createContext<HoverCardContextType | null>(null);

function useHoverCardContext() {
  const value = React.useContext(HoverCardContext);
  if (!value) {
    throw new Error("HoverCard components must be used inside HoverCard");
  }
  return value;
}

export function HoverCard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <HoverCardContext.Provider value={{ open, setOpen }}>{children}</HoverCardContext.Provider>;
}

export function HoverCardTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactElement<any>;
  asChild?: boolean;
}) {
  const { setOpen } = useHoverCardContext();
  const child = React.Children.only(children as React.ReactElement<any>);

  if (asChild) {
    return React.cloneElement(child, {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
    });
  }

  return <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>{children}</div>;
}

export function HoverCardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useHoverCardContext();

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute left-0 top-[calc(100%+1rem)] z-20 w-80 rounded-[1.5rem] border border-primary/12 bg-[#fffaf0] p-5 text-sm text-on-surface shadow-[0_30px_60px_-40px_rgba(31,94,59,0.9)]",
        className,
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </div>
  );
}
