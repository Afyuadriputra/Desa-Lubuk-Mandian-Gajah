type Variant = "content" | "media" | "story" | "contact" | "footer";

type Props = {
  variant?: Variant;
};

const shellClassName =
  "section-shell-mobile overflow-hidden bg-surface px-4 animate-pulse";

export default function MobileSectionSkeleton({
  variant = "content",
}: Props) {
  if (variant === "footer") {
    return (
      <footer className="border-t border-primary/8 bg-surface-container pt-8 pb-24">
        <div className="px-4">
          <div className="rounded-[24px] border border-primary/10 bg-white p-4 shadow-[0_14px_34px_rgba(31,94,59,0.05)]">
            <div className="h-24 rounded-[20px] bg-primary/8" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-28 rounded-full bg-primary/10" />
              <div className="h-14 rounded-[18px] bg-primary/6" />
              <div className="h-14 rounded-[18px] bg-primary/6" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "contact") {
    return (
      <section className={`${shellClassName} bg-surface`}>
        <div className="rounded-[24px] border border-primary/10 bg-white p-4 shadow-[0_14px_34px_rgba(31,94,59,0.05)]">
          <div className="h-24 rounded-[20px] bg-primary/10" />
          <div className="mt-4 space-y-3">
            <div className="h-20 rounded-[20px] bg-surface-container-low" />
            <div className="h-20 rounded-[20px] bg-surface-container-low" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 rounded-2xl bg-primary/8" />
              <div className="h-12 rounded-2xl bg-primary/8" />
            </div>
            <div className="h-40 rounded-[20px] bg-primary/8" />
          </div>
        </div>
      </section>
    );
  }

  if (variant === "story") {
    return (
      <section className={shellClassName}>
        <div className="mx-auto max-w-sm">
          <div className="h-4 w-24 rounded-full bg-primary/10" />
          <div className="mt-4 h-9 w-3/4 rounded-2xl bg-primary/12" />
          <div className="mt-3 h-4 w-full rounded-full bg-primary/8" />
          <div className="mt-2 h-4 w-4/5 rounded-full bg-primary/8" />
          <div className="mt-5 h-[360px] rounded-[28px] bg-white shadow-[0_14px_34px_rgba(31,94,59,0.05)]" />
        </div>
      </section>
    );
  }

  if (variant === "media") {
    return (
      <section className={shellClassName}>
        <div className="mx-auto max-w-sm">
          <div className="h-4 w-24 rounded-full bg-primary/10" />
          <div className="mt-4 h-[240px] rounded-[28px] bg-primary/8" />
          <div className="mt-4 h-24 rounded-[24px] bg-white shadow-[0_14px_34px_rgba(31,94,59,0.05)]" />
        </div>
      </section>
    );
  }

  return (
    <section className={shellClassName}>
      <div className="mx-auto max-w-sm">
        <div className="h-4 w-24 rounded-full bg-primary/10" />
        <div className="mt-4 h-8 w-2/3 rounded-2xl bg-primary/12" />
        <div className="mt-3 h-4 w-full rounded-full bg-primary/8" />
        <div className="mt-2 h-4 w-5/6 rounded-full bg-primary/8" />
        <div className="mt-5 h-32 rounded-[24px] bg-white shadow-[0_14px_34px_rgba(31,94,59,0.05)]" />
      </div>
    </section>
  );
}
