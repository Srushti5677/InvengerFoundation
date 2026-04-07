import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Heart, Users, TreePine, Utensils, PawPrint } from "lucide-react";
import heroRescue from "@/assets/hero-rescue.png";
import heroChildren from "@/assets/hero-children.png";
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

const impactCounters = [
  { icon: PawPrint, target: 2800, label: "Animals Rescued", suffix: "+" },
  { icon: TreePine, target: 15000, label: "Trees Planted", suffix: "+" },
  { icon: Users, target: 25000, label: "People Helped", suffix: "+" },
  { icon: Utensils, target: 50000, label: "Meals Served", suffix: "+" },
];

function AnimatedImpactCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countersInView, setCountersInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

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

  // Counters intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersInView(true);
      },
      { threshold: 0.3 }
    );
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Animated background images with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.img
            src={slides[currentSlide].image}
            alt="Invenger Foundation - Making a difference"
            className="w-full h-full object-cover"
            style={{ y: bgY }}
            width={1920}
            height={1080}
          />
        </motion.div>
      </AnimatePresence>

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
              <Heart className="w-4 h-4 text-red-400 animate-heartbeat" />
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
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                {slides[currentSlide].headline}
              </h1>
              <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
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
              className="hero-btn-primary group relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="w-5 h-5 group-hover:animate-heartbeat" />
              Donate Now
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.a>
            <motion.a
              href="#volunteer"
              className="hero-btn-outline px-10 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2"
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
                    ? "w-10 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Live impact counters */}
        <motion.div
          ref={countersRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {impactCounters.map((counter, i) => (
            <motion.div
              key={counter.label}
              className="hero-stat-card rounded-2xl p-5 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <counter.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
              <div className="text-2xl md:text-3xl font-extrabold text-white font-body">
                <AnimatedImpactCounter target={counter.target} suffix={counter.suffix} inView={countersInView} />
              </div>
              <div className="text-white/50 text-sm mt-1 font-medium">{counter.label}</div>
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
