"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DashboardChartItemDto,
  DashboardTrendPointDto,
} from "@/lib/api/types";

const chartColors = ["#94a3b8", "#64748b", "#3b82f6", "#d97706", "#16a34a"];

function MeasuredChartFrame({
  children,
}: {
  children: (size: { width: number; height: number }) => React.ReactNode;
}) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    const updateSize = () => {
      const nextWidth = Math.floor(node.clientWidth);
      const nextHeight = Math.floor(node.clientHeight);

      setSize((prev) =>
        prev.width === nextWidth && prev.height === nextHeight
          ? prev
          : { width: nextWidth, height: nextHeight },
      );
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    observer.observe(node);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const isReady = size.width > 0 && size.height > 0;

  return (
    <div ref={hostRef} className="h-full w-full min-w-0">
      {isReady ? children(size) : <div className="h-full w-full" aria-hidden="true" />}
    </div>
  );
}

export function StatusBarChart({
  data,
}: {
  data: DashboardChartItemDto[];
}) {
  return (
    <ChartContainer
      className="h-64 min-h-[16rem] w-full min-w-0"
      config={{
        total: { label: "Total", color: "#64748b" },
      }}
    >
      <MeasuredChartFrame>
        {({ width, height }) => (
        <BarChart width={width} height={height} data={data} barCategoryGap={12}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
          <ChartTooltip
            cursor={{ fill: "rgba(148,163,184,0.08)" }}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="total" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`${entry.label}-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Bar>
        </BarChart>
        )}
      </MeasuredChartFrame>
    </ChartContainer>
  );
}

export function TrendLineChart({
  data,
  color = "#3b82f6",
}: {
  data: DashboardTrendPointDto[];
  color?: string;
}) {
  const normalized = data.map((item) => ({
    ...item,
    shortDate: new Date(item.date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    }),
  }));

  return (
    <ChartContainer
      className="h-64 min-h-[16rem] w-full min-w-0"
      config={{
        total: { label: "Total", color },
      }}
    >
      <MeasuredChartFrame>
        {({ width, height }) => (
        <LineChart width={width} height={height} data={normalized}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="shortDate" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
          <ChartTooltip
            cursor={{ stroke: "#cbd5e1", strokeDasharray: "4 4" }}
            content={<ChartTooltipContent />}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="var(--color-total)"
            strokeWidth={3}
            dot={{ r: 0 }}
            activeDot={{ r: 5, strokeWidth: 0, fill: color }}
          />
        </LineChart>
        )}
      </MeasuredChartFrame>
    </ChartContainer>
  );
}
