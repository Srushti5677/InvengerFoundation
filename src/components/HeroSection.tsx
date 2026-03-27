import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Community volunteers helping children" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 animate-float blur-xl" />
      <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-secondary/10 animate-float-delay blur-xl" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-accent/10 animate-float-delay-2 blur-xl" />

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 glass-card text-primary-foreground border border-primary-foreground/20">
            🌍 Making the world better, one step at a time
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Creating Change
            <br />
            That <span className="italic">Matters</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 font-body">
            Empowering lives through action, compassion, and community.
            Join us in building a future where everyone thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#gallery" className="btn-primary-hero" style={{ background: "hsl(0 0% 100%)", color: "hsl(213 74% 59%)" }}>
              Explore Our Work
            </a>
            <a href="#donate" className="btn-outline-hero">
              Donate Now
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path d="M0,60 C360,100 720,20 1440,60 L1440,100 L0,100 Z" fill="hsl(210 33% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
