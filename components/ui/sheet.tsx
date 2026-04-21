"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function Sheet(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger {...props} />;
}

function SheetContent({
  className,
  side = "right",
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  side?: "left" | "right";
}) {
  return (
    <DialogContent
      className={cn(
        "top-0 h-screen max-w-none -translate-y-0 rounded-none border-l border-slate-200/80 bg-white/96 p-0 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.34)]",
        side === "left"
          ? "left-0 w-[min(92vw,22rem)] -translate-x-0 translate-y-0"
          : "left-auto right-0 w-[min(92vw,22rem)] -translate-x-0 translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetHeader(props: React.ComponentProps<typeof DialogHeader>) {
  return <DialogHeader {...props} />;
}

function SheetTitle(props: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle {...props} />;
}

function SheetDescription(props: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription {...props} />;
}

export {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
