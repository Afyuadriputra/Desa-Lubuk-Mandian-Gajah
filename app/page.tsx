// app/(website)/homepage/page.tsx
import { headers } from "next/headers";
import DesktopHomepage from "./(website)/homepage/desktop/DesktopHomepage";
import MobileHomepage from "./(website)/homepage/mobile/MobileHomepage";
import { homepageData } from "./(website)/homepage/data/homepage.data";

const MOBILE_UA_PATTERN =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export default async function HomepagePage() {
  const data = homepageData;
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") ?? "";
  const isMobileDevice = MOBILE_UA_PATTERN.test(userAgent);

  return isMobileDevice ? (
    <MobileHomepage data={data} />
  ) : (
    <DesktopHomepage data={data} />
  );
}
