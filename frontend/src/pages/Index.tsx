import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import LiveActivityStrip from "@/components/LiveActivityStrip";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import CausesSection from "@/components/CausesSection";
import CampaignsSection from "@/components/CampaignsSection";
import DonateSection from "@/components/DonateSection";
import VolunteerSection from "@/components/VolunteerSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import ImpactMapSection from "@/components/ImpactMapSection";
import ProjectsSection from "@/components/ProjectsSection";
import SponsorSection from "@/components/SponsorSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import FloatingActionButton from "@/components/FloatingActionButton";
import FloatingIcons from "@/components/FloatingIcons";
import DarkModeToggle from "@/components/DarkModeToggle";
import SectionDivider from "@/components/SectionDivider";
import MiniTestimonial from "@/components/MiniTestimonial";

const Index = () => (
  <div className="min-h-screen relative">
    <LoadingScreen />
    <FloatingIcons />
    <FloatingActionButton />
    <DarkModeToggle />

    <Navbar />
    <HeroSection />
    <TrustBanner />
    <LiveActivityStrip />

    <AboutSection />

    <MiniTestimonial
      quote="Their transparency is unmatched. I know exactly where my ₹500 goes every month."
      name="Rahul Deshpande"
      role="Monthly Donor since 2023"
      color="#2D8B6F"
    />

    <CausesSection />

    <SectionDivider variant="wave" color="#f0fdf9" />

    <CampaignsSection />

    <MiniTestimonial
      quote="Volunteering here gave me purpose. I've helped rescue 50 animals in just 6 months."
      name="Ananya Sharma"
      role="Animal Rescue Volunteer"
      color="#E8553A"
    />

    <ImpactSection />

    <SectionDivider variant="curve" color="#0f2922" />

    <DonateSection />

    <SectionDivider variant="curve" flip color="hsl(150 20% 98%)" />

    <SponsorSection />

    <MiniTestimonial
      quote="Sponsoring a child's education changed her life — and mine. The letters she writes fill my heart."
      name="Dr. Priya Menon"
      role="Child Sponsor"
      color="#3B7DD8"
    />

    <VolunteerSection />
    <SuccessStoriesSection />
    <JourneyTimeline />

    <SectionDivider variant="wave" color="#f5f3ff" />

    <GallerySection />
    <ImpactMapSection />
    <TestimonialsSection />
    <TeamSection />

    <SectionDivider variant="tilt" color="#eff6ff" />

    <ProjectsSection />
    <BlogSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
