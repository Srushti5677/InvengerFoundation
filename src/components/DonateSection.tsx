import { motion } from "framer-motion";
import { Heart, ShieldCheck, BarChart3 } from "lucide-react";

const DonateSection = () => (
  <section id="donate" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(213 74% 59%), hsl(145 45% 55%))" }} />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-30" />

    <div className="relative container mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Heart className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Make a Difference Today</h2>
        <p className="text-primary-foreground/85 text-lg max-w-2xl mx-auto mb-10">
          Your donation directly funds education, healthcare, and community development. Every rupee is accounted for with full transparency.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
          {[
            { icon: ShieldCheck, label: "100% Transparent" },
            { icon: BarChart3, label: "Impact Reports" },
            { icon: Heart, label: "Tax Benefits" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <item.icon className="w-8 h-8" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        <a href="#contact" className="btn-primary-hero" style={{ background: "hsl(0 0% 100%)", color: "hsl(213 74% 59%)" }}>
          Donate Now
        </a>
      </motion.div>
    </div>
  </section>
);

export default DonateSection;
