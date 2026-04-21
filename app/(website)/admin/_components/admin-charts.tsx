"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
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

export function StatusBarChart({
  data,
}: {
  data: DashboardChartItemDto[];
}) {
  return (
    <ChartContainer
      className="h-64 w-full"
      config={{
        total: { label: "Total", color: "#64748b" },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={12}>
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
      </ResponsiveContainer>
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
      className="h-64 w-full"
      config={{
        total: { label: "Total", color },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={normalized}>
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
      </ResponsiveContainer>
    </ChartContainer>
  );
}
