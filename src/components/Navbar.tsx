import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import invengerLogo from "@/assets/invenger logo.jpg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Our Causes", href: "#causes" },
  { label: "Campaigns", href: "#campaigns" },
  { label: "Impact", href: "#impact" },
  { label: "Gallery", href: "#gallery" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 navbar-glass"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-3 group">
          <motion.img
            src={invengerLogo}
            alt="Invenger Foundation Logo"
            className={`h-10 w-auto object-contain transition-all duration-300 ${
              scrolled ? "" : "brightness-0 invert"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </a>

        <div className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((l) => {
            const sectionName = l.href.replace("#", "");
            const isActive = activeSection === sectionName;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-3.5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  isActive
                    ? scrolled ? "text-primary" : "text-white"
                    : scrolled
                    ? "text-foreground/60 hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-full ${
                      scrolled
                        ? "bg-primary/8 border border-primary/15"
                        : "bg-white/10 border border-white/15"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            );
          })}
          <motion.a
            href="#donate"
            className="ml-3 px-6 py-2.5 text-sm font-semibold rounded-full relative overflow-hidden inline-flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #E8553A, #D4432E)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(232,85,58,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Heart className="w-4 h-4 text-white animate-heartbeat" />
            <span className="relative z-10 text-white">Donate Now</span>
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`xl:hidden ${scrolled ? "text-foreground" : "text-white"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="xl:hidden mx-4 mt-2 rounded-2xl overflow-hidden shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground/70 py-3 px-4 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#donate"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 text-sm font-semibold text-center rounded-xl text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #E8553A, #D4432E)" }}
              >
                <Heart className="w-4 h-4" />
                Donate Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
