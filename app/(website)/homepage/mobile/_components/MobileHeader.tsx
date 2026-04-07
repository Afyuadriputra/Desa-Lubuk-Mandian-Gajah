import type { HomepageData } from "../../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function MobileHeader({ data }: Props) {
  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-primary/5">
      <nav className="px-5 py-3 flex justify-center items-center">
        <div className="text-lg font-bold text-primary font-headline tracking-tight">
          {data.villageName}
        </div>
      </nav>
    </header>
  );
}