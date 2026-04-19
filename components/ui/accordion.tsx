"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextType = {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);
const AccordionItemContext = React.createContext<{ value: string } | null>(null);

function useAccordionContext() {
  const value = React.useContext(AccordionContext);
  if (!value) throw new Error("Accordion components must be used inside Accordion");
  return value;
}

function useAccordionItemContext() {
  const value = React.useContext(AccordionItemContext);
  if (!value) throw new Error("Accordion item components must be used inside AccordionItem");
  return value;
}

export function Accordion({
  children,
  defaultValue = null,
}: {
  children: React.ReactNode;
  defaultValue?: string | null;
}) {
  const [value, setValue] = React.useState<string | null>(defaultValue);
  return <AccordionContext.Provider value={{ value, setValue }}>{children}</AccordionContext.Provider>;
}

export function AccordionItem({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("rounded-2xl border border-primary/10 bg-white/80", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { value, setValue } = useAccordionContext();
  const item = useAccordionItemContext();
  const open = value === item.value;

  return (
    <button
      type="button"
      onClick={() => setValue(open ? null : item.value)}
      className={cn(
        "flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        className,
      )}
    >
      <span>{children}</span>
      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { value } = useAccordionContext();
  const item = useAccordionItemContext();
  const open = value === item.value;
  if (!open) return null;
  return <div className={cn("px-5 pb-5 text-sm text-on-surface-variant", className)}>{children}</div>;
}
