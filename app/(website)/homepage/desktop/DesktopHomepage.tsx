import HomeNavbar from "./_components/HomeNavbar";
import HeroSection from "./_components/HeroSection";
import QuickStatsSection from "./_components/QuickStatsSection";
import NamingSection from "./_components/NamingSection";
import CultureSection from "./_components/CultureSection";
import SialangSection from "./_components/SialangSection";
import PeatSection from "./_components/PeatSection";
import RecoverySection from "./_components/RecoverySection";
import PotentialSection from "./_components/PotentialSection";
import FacilitiesSection from "./_components/FacilitiesSection";
import GallerySection from "./_components/GallerySection";
import ContactSection from "./_components/ContactSection";
import HomeFooter from "./_components/HomeFooter";
import type { HomepageData } from "../data/homepage.types";

type Props = {
  data: HomepageData;
};

export default function DesktopHomepage({ data }: Props) {
  return (
    <>
      <HomeNavbar />
      <main>
        <HeroSection data={data} />
        <QuickStatsSection data={data} />
        <NamingSection data={data} />
        <CultureSection data={data} />
        <SialangSection data={data} />
        <PeatSection data={data} />
        <RecoverySection data={data} />
        <PotentialSection data={data} />
        <FacilitiesSection data={data} />
        <GallerySection data={data} />
        <ContactSection data={data} />
      </main>
      <HomeFooter data={data} />
    </>
  );
}