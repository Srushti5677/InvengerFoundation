import { motion } from "framer-motion";

const partners = ["UNICEF", "Red Cross", "WHO", "UNDP", "Save the Children", "Oxfam", "World Vision", "CARE"];

const PartnersSection = () => (
  <section className="py-16 border-y border-border">
    <div className="container mx-auto px-4">
      <p className="text-center text-muted-foreground text-sm uppercase tracking-widest mb-10">Trusted By Leading Organizations</p>
      <div className="overflow-hidden relative">
        <div className="marquee-track">
          {[...partners, ...partners].map((p, i) => (
            <motion.div key={i} className="flex-shrink-0 mx-8 px-8 py-4 rounded-xl bg-muted/50 flex items-center justify-center min-w-[160px]">
              <span className="font-display text-lg font-semibold text-muted-foreground">{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
