import type { HomepageData } from "../data/homepage.types";
import MobileHeader from "./_components/MobileHeader";
import BottomNav from "./_components/BottomNav";
import HeroMobile from "./_components/HeroMobile";
import QuickStatsMobile from "./_components/QuickStatsMobile";
import NamingMobile from "./_components/NamingMobile";
import CultureMobile from "./_components/CultureMobile";
import SialangMobile from "./_components/SialangMobile";
import PeatMobile from "./_components/PeatMobile";
import RecoveryMobile from "./_components/RecoveryMobile";
import PotentialMobile from "./_components/PotentialMobile";
import FacilitiesMobile from "./_components/FacilitiesMobile";
import GalleryMobile from "./_components/GalleryMobile";
import ContactMobile from "./_components/ContactMobile";
import FooterMobile from "./_components/FooterMobile";

type Props = {
  data: HomepageData;
};

export default function MobileHomepage({ data }: Props) {
  return (
    <>
      <MobileHeader data={data} />
      <BottomNav />
      <main>
        <HeroMobile data={data} />
        <QuickStatsMobile data={data} />
        <NamingMobile data={data} />
        <CultureMobile data={data} />
        <SialangMobile data={data} />
        <PeatMobile data={data} />
        <RecoveryMobile data={data} />
        <PotentialMobile data={data} />
        <FacilitiesMobile data={data} />
        <GalleryMobile data={data} />
        <ContactMobile data={data} />
      </main>
      <FooterMobile data={data} />
    </>
  );
}