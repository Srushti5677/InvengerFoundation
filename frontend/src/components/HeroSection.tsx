import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Users, TreePine, Utensils, PawPrint } from "lucide-react";
import heroRescue from "@/assets/hero-rescue.png";
import heroChildren from "@/assets/images/image11.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const slides = [
  {
    image: heroRescue,
    headline: "Be the Reason Someone Survives Today",
    subtitle: "Every life is worth saving. Every act of kindness creates a ripple of hope that travels further than you can imagine.",
  },
  {
    image: heroChildren,
    headline: "Small Acts. Big Impact.",
    subtitle: "A meal, a book, a helping hand — the smallest gestures can change someone's entire world. Be that change.",
  },
  {
    image: heroBg,
    headline: "Together, We Can Heal the World",
    subtitle: "When compassion meets action, miracles happen. Join a community of changemakers building a better tomorrow.",
  },
];

const focusAreas = [
  { icon: PawPrint, title: "Animal Care", subtitle: "Rescue, treatment, and shelter support." },
  { icon: TreePine, title: "Elder Care", subtitle: "Support and companionship for senior citizens." },
  { icon: Users, title: "Child Support", subtitle: "Care, engagement, and education outreach." },
  { icon: Utensils, title: "Food Relief", subtitle: "Meal support for communities in need." },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Preload hero images to avoid grey/blank flashes between transitions.
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Smooth stacked crossfade to prevent transition flicker */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <motion.img
            key={slide.image}
            src={slide.image}
            alt="Invenger Foundation - Making a difference"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: bgY }}
            width={1920}
            height={1080}
            initial={false}
            animate={{
              opacity: i === currentSlide ? 1 : 0,
              scale: i === currentSlide ? 1 : 1.04,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Warm glow overlay */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: "linear-gradient(to top, rgba(15, 41, 34, 0.8), transparent)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 pt-32 pb-48"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Emotional badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/90 border border-white/15"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              Making the world better, one life at a time
            </span>
          </motion.div>

          {/* Headline with emotional impact */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                {slides[currentSlide].headline}
              </h1>
              <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#donate"
              className="hero-btn-primary group relative overflow-hidden px-8 py-3.5 rounded-full font-semibold text-base inline-flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Donate Now
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.a>
            <motion.a
              href="#volunteer"
              className="hero-btn-outline px-8 py-3.5 rounded-full font-semibold text-base inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-5 h-5" />
              Join Us
            </motion.a>
          </motion.div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === currentSlide
                    ? "w-10 h-2 bg-white"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Focus area cards */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {focusAreas.map((item, i) => (
            <motion.div
              key={item.title}
              className="hero-stat-card rounded-2xl p-4 text-center border border-white/10 hover:border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <item.icon className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
              <div className="text-base md:text-lg font-bold text-white font-body">
                {item.title}
              </div>
              <div className="text-white/50 text-[10px] md:text-xs mt-1 font-medium leading-tight">
                {item.subtitle}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/40 text-xs uppercase tracking-widest font-medium">Discover More</span>
        <ArrowDown className="w-5 h-5 text-white/40" />
      </motion.div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-[60px]" preserveAspectRatio="none">
          <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="hsl(150 20% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
