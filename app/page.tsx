// app/(website)/homepage/page.tsx
import { headers } from "next/headers";
import DesktopHomepage from "./(website)/homepage/desktop/DesktopHomepage";
import MobileHomepage from "./(website)/homepage/mobile/MobileHomepage";
import { homepageData } from "./(website)/homepage/data/homepage.data";
import { getHomepageBackendData } from "@/lib/api/homepage";

export const dynamic = "force-dynamic";

const MOBILE_UA_PATTERN =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export default async function HomepagePage() {
  const dataPromise = getHomepageBackendData();
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") ?? "";
  const isMobileDevice = MOBILE_UA_PATTERN.test(userAgent);
  let data = homepageData;

  try {
    data = await dataPromise;
  } catch (error) {
    console.error("Homepage API unavailable. Using static fallback.", error);
  }

  return isMobileDevice ? (
    <MobileHomepage data={data} />
  ) : (
    <DesktopHomepage data={data} />
  );
}
