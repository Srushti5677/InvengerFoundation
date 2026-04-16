import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import AboutSection from "@/components/AboutSection";
import VideoImpactSection from "@/components/VideoImpactSection";
import CausesSection from "@/components/CausesSection";
import OurWorkShowcase from "@/components/OurWorkShowcase";
import ActionCenter from "@/components/ActionCenter";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingActionButton from "@/components/FloatingActionButton";
import FloatingIcons from "@/components/FloatingIcons";
import DarkModeToggle from "@/components/DarkModeToggle";

const Index = () => (
  <div className="min-h-screen relative">
    <LoadingScreen />
    <FloatingIcons />
    <FloatingActionButton />
    <DarkModeToggle />

    <Navbar />
    <HeroSection />
    <TrustBanner />

    <AboutSection />
    <VideoImpactSection />
    <CausesSection />
    <OurWorkShowcase />
    <ActionCenter />

    <SuccessStoriesSection />
    <TestimonialsSection />
    <ProjectsSection />
    <Footer />
  </div>
);

export default Index;
