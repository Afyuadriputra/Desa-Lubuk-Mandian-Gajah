// app/(website)/homepage/page.tsx
import DesktopHomepage from "./desktop/DesktopHomepage";
import MobileHomepage from "./mobile/MobileHomepage";
import { homepageData } from "./data/homepage.data";

export default function HomepagePage() {
  const data = homepageData;

  return (
    <>
      <div className="hidden md:block">
        <DesktopHomepage data={data} />
      </div>

      <div className="md:hidden">
        <MobileHomepage data={data} />
      </div>
    </>
  );
}