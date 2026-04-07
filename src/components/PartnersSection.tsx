import { motion } from "framer-motion";

const partners = ["UNICEF", "Red Cross", "WHO", "UNDP", "Save the Children", "Oxfam", "World Vision", "CARE"];

const PartnersSection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background to-blue-50/20" />

    <div className="relative container mx-auto px-4">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-12"
      >
        Trusted By Leading Organizations
      </motion.p>
      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="marquee-track">
          {[...partners, ...partners].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex-shrink-0 mx-5 px-8 py-4 rounded-2xl bg-white border border-border/50 flex items-center justify-center min-w-[170px] shadow-sm hover:shadow-lg transition-shadow cursor-default"
            >
              <span className="font-display text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-muted-foreground to-foreground">
                {p}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
