"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TabsContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

function useTabsContext() {
  const value = React.useContext(TabsContext);
  if (!value) throw new Error("Tabs components must be used inside Tabs");
  return value;
}

export function Tabs({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue: string;
}) {
  const [value, setValue] = React.useState(defaultValue);
  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>;
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex flex-wrap gap-2 rounded-full border border-white/10 bg-black/10 p-1", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useTabsContext();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        active ? "bg-white text-primary shadow-sm" : "text-white/76 hover:text-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useTabsContext();
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
