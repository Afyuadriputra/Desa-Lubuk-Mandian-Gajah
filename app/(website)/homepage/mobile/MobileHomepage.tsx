import dynamic from "next/dynamic";
import type { HomepageData } from "../data/homepage.types";
import MobileHeader from "./_components/MobileHeader";
import BottomNav from "./_components/BottomNav";
import HeroMobile from "./_components/HeroMobile";
import QuickStatsMobile from "./_components/QuickStatsMobile";
import MobileSectionSkeleton from "./_components/MobileSectionSkeleton";

const NamingMobile = dynamic(() => import("./_components/NamingMobile"), {
  loading: () => <MobileSectionSkeleton variant="media" />,
});
const CultureMobile = dynamic(() => import("./_components/CultureMobile"), {
  loading: () => <MobileSectionSkeleton variant="content" />,
});
const SialangMobile = dynamic(() => import("./_components/SialangMobile"), {
  loading: () => <MobileSectionSkeleton variant="media" />,
});
const PeatMobile = dynamic(() => import("./_components/PeatMobile"), {
  loading: () => <MobileSectionSkeleton variant="media" />,
});
const RecoveryMobile = dynamic(() => import("./_components/RecoveryMobile"), {
  loading: () => <MobileSectionSkeleton variant="content" />,
});
const PotentialMobile = dynamic(() => import("./_components/PotentialMobile"), {
  loading: () => <MobileSectionSkeleton variant="story" />,
});
const FacilitiesMobile = dynamic(
  () => import("./_components/FacilitiesMobile"),
  {
    loading: () => <MobileSectionSkeleton variant="story" />,
  }
);
const GalleryMobile = dynamic(() => import("./_components/GalleryMobile"), {
  loading: () => <MobileSectionSkeleton variant="story" />,
});
const ContactMobile = dynamic(() => import("./_components/ContactMobile"), {
  loading: () => <MobileSectionSkeleton variant="contact" />,
});
const FooterMobile = dynamic(() => import("./_components/FooterMobile"), {
  loading: () => <MobileSectionSkeleton variant="footer" />,
});

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
