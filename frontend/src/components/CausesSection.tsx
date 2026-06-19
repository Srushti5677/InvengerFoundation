import { motion } from "framer-motion";
import { PawPrint, Baby, TreePine, Utensils } from "lucide-react";
import indiaAnimalWelfare from "@/assets/india-animal-welfare.png";
import indiaOrphanSupport from "@/assets/india-orphan-support.png";
import indiaEnvironment from "@/assets/india-environment.png";
import indiaFoodAid from "@/assets/india-food-aid.png";

const causes = [
  {
    icon: PawPrint,
    title: "Animal Care",
    description: "Rescuing and rehabilitating stray and injured animals. We provide medical attention and safe shelters for every creature in need.",
    image: indiaAnimalWelfare,
    color: "#E8553A",
  },
  {
    icon: TreePine,
    title: "Elder Care",
    description: "Providing companionship and essential support for our senior citizens. Ensuring they live with dignity, health, and respect.",
    image: indiaEnvironment,
    color: "#2D8B6F",
  },
  {
    icon: Baby,
    title: "Child Support",
    description: "Empowering orphans through education, nutrition, and personal care. We are dedicated to building a brighter future for every child.",
    image: indiaOrphanSupport,
    color: "#3B7DD8",
  },
  {
    icon: Utensils,
    title: "Food Relief",
    description: "Serving hot, nutritious meals to the hungry and distributing aid to families in crisis. No one should ever have to sleep hungry.",
    image: indiaFoodAid,
    color: "#D4932A",
  },
];

const CausesSection = () => (
  <section id="causes" className="py-16 lg:py-0 lg:h-screen lg:min-h-[650px] scroll-mt-20 relative overflow-hidden flex items-center bg-white">
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 via-background to-background" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[100px]" />

    <div className="relative container mx-auto px-4 w-full lg:pt-20 lg:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 lg:mb-8"
      >
        <span className="section-badge">What We Do</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mt-4 tracking-tight">
          Every Life{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
            Deserves
          </span>{" "}
          a Champion
        </h2>
        <p className="text-slate-500 mt-3 text-sm md:text-base max-w-xl mx-auto">
          Our work spans across four pillars of compassion. Each cause is close to our hearts
          and fueled by the belief that change starts with caring.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-6">
        {causes.map((cause, i) => (
          <motion.div
            key={cause.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="cause-card rounded-2xl overflow-hidden group cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 sm:h-52 md:h-48 lg:h-36 xl:h-40 overflow-hidden">
              <img
                src={cause.image}
                alt={cause.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: cause.color, boxShadow: `0 4px 10px ${cause.color}40` }}
                >
                  <cause.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-base">{cause.title}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-3.5 xl:p-4">
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{cause.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CausesSection;
