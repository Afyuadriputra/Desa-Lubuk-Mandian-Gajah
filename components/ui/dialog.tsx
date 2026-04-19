"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialogContext() {
  const value = React.useContext(DialogContext);
  if (!value) {
    throw new Error("Dialog components must be used inside Dialog");
  }
  return value;
}

export function Dialog({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof open === "boolean";
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen: React.Dispatch<React.SetStateAction<boolean>> = React.useCallback(
    (value) => {
      const next = typeof value === "function" ? value(currentOpen) : value;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [currentOpen, isControlled, onOpenChange],
  );

  return <DialogContext.Provider value={{ open: currentOpen, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactElement<any>;
  asChild?: boolean;
}) {
  const { setOpen } = useDialogContext();
  const child = React.Children.only(children as React.ReactElement<any>);

  if (asChild) {
    return React.cloneElement(child, {
      onClick: (event: React.MouseEvent) => {
        child.props.onClick?.(event);
        setOpen(true);
      },
    });
  }

  return <button onClick={() => setOpen(true)}>{children}</button>;
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useDialogContext();

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 px-6 py-10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
    >
      <div
        className={cn(
          "relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#15130f] shadow-2xl",
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Tutup galeri"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-2xl font-bold text-white", className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-white/75", className)} {...props} />;
}
