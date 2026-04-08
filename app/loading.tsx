import MobileSectionSkeleton from "./(website)/homepage/mobile/_components/MobileSectionSkeleton";

export default function Loading() {
  return (
    <main className="bg-surface">
      <div className="sticky top-0 z-30 border-b border-primary/8 bg-white/80 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-sm items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-primary/10 animate-pulse" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-24 rounded-full bg-primary/10 animate-pulse" />
            <div className="h-4 w-36 rounded-full bg-primary/12 animate-pulse" />
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-surface px-4 pb-6 pt-5">
        <div className="mx-auto max-w-sm animate-pulse">
          <div className="h-[60vh] rounded-[32px] bg-primary/12" />
          <div className="-mt-28 px-4">
            <div className="rounded-[28px] bg-white/88 p-4 shadow-[0_18px_40px_rgba(31,94,59,0.08)]">
              <div className="h-4 w-24 rounded-full bg-secondary-container/60" />
              <div className="mt-4 h-10 w-3/4 rounded-2xl bg-primary/12" />
              <div className="mt-3 h-4 w-full rounded-full bg-primary/8" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-primary/8" />
            </div>
          </div>
        </div>
      </section>

      <MobileSectionSkeleton variant="content" />
      <MobileSectionSkeleton variant="media" />
      <MobileSectionSkeleton variant="content" />
      <MobileSectionSkeleton variant="story" />
      <MobileSectionSkeleton variant="contact" />
      <MobileSectionSkeleton variant="footer" />
    </main>
  );
}
