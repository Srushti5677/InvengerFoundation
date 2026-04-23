import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoImpactSection from "@/components/VideoImpactSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import CausesSection from "@/components/CausesSection";
import OurWorkShowcase from "@/components/OurWorkShowcase";
import ActionCenter from "@/components/ActionCenter";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingActionButton from "@/components/FloatingActionButton";
import FloatingIcons from "@/components/FloatingIcons";
import DarkModeToggle from "@/components/DarkModeToggle";

import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Faster reveal to avoid "blank screen" feeling
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative scroll-smooth overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <VideoImpactSection />
        <SectionDivider variant="tilt" color="white" className="z-20" />
        <JourneyTimeline />
        <CausesSection />
        <SectionDivider variant="wave" color="#05070A" />
        <OurWorkShowcase />
        <ActionCenter />
      </main>
      <Footer />
      <FloatingActionButton />
      <FloatingIcons />
      <DarkModeToggle />
    </div>
  );
};

export default Index;
