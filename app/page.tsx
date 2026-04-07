import HomeNavbar from "./(website)/homepage/_components/HomeNavbar";
import HeroSection from "./(website)/homepage/_components/HeroSection";
import QuickStatsSection from "./(website)/homepage/_components/QuickStatsSection";
import NamingSection from "./(website)/homepage/_components/NamingSection";
import CultureSection from "./(website)/homepage/_components/CultureSection";
import SialangSection from "./(website)/homepage/_components/SialangSection";
import PeatSection from "./(website)/homepage/_components/PeatSection";
import RecoverySection from "./(website)/homepage/_components/RecoverySection";
import PotentialSection from "./(website)/homepage//_components/PotentialSection";
import FacilitiesSection from "./(website)/homepage/_components/FacilitiesSection";
import GallerySection from "./(website)/homepage/_components/GallerySection";
import ContactSection from "./(website)/homepage/_components/ContactSection";
import HomeFooter from "./(website)/homepage/_components/HomeFooter";

export default function HomePage() {
  return (
    <>
      <HomeNavbar />
      <main>
        <HeroSection />
        <QuickStatsSection />
        <NamingSection />
        <CultureSection />
        <SialangSection />
        <PeatSection />
        <RecoverySection />
        <PotentialSection />
        <FacilitiesSection />
        <GallerySection />
        <ContactSection />
      </main>
      <HomeFooter />
    </>
  );
}