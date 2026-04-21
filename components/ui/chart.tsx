"use client";

import * as React from "react";
import {
  Tooltip as RechartsTooltip,
} from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    color?: string;
  }
>;

const ChartContext = React.createContext<ChartConfig | null>(null);

function useChartConfig() {
  return React.useContext(ChartContext);
}

function ChartContainer({
  config,
  className,
  children,
}: {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}) {
  const style = Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value.color) {
      acc[`--color-${key}`] = value.color;
    }
    return acc;
  }, {});

  return (
    <ChartContext.Provider value={config}>
      <div className={cn("w-full min-w-0", className)} style={style as React.CSSProperties}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}

function ChartTooltip(props: React.ComponentProps<typeof RechartsTooltip>) {
  return <RechartsTooltip {...props} />;
}

type ChartTooltipPayloadItem = {
  dataKey?: string | number;
  name?: string | number;
  value?: string | number | null;
  color?: string;
};

function ChartTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string | number;
}) {
  const config = useChartConfig();

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="min-w-44 rounded-[20px] border border-slate-200/80 bg-white/96 p-3 text-sm text-slate-600 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.3)]">
      {label ? <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div> : null}
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const configEntry =
            typeof entry.dataKey === "string" && config ? config[entry.dataKey] : undefined;
          const indicatorColor =
            entry.color ?? configEntry?.color ?? "rgb(148 163 184)";

          return (
            <div key={`${entry.dataKey}-${index}`} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: indicatorColor }}
                />
                <span>{configEntry?.label ?? entry.name ?? entry.dataKey}</span>
              </div>
              <span className="admin-number-tabular font-semibold text-slate-950">
                {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ChartContainer, ChartTooltip, ChartTooltipContent };
