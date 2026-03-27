import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import ImpactSection from "@/components/ImpactSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import BlogSection from "@/components/BlogSection";
import DonateSection from "@/components/DonateSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <TrustBanner />
    <ImpactSection />
    <AboutSection />
    <GallerySection />
    <TestimonialsSection />
    <TeamSection />
    <PartnersSection />
    <BlogSection />
    <DonateSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
