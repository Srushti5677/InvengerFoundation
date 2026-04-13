import { motion } from "framer-motion";
import { PawPrint, Baby, TreePine, Utensils, ArrowRight, Heart } from "lucide-react";
import campaignAnimals from "@/assets/campaign-animals.png";
import galleryOrphanage from "@/assets/gallery-orphanage.jpg";
import galleryEnvironment from "@/assets/gallery-environment.jpg";
import campaignFood from "@/assets/campaign-food.png";

const causes = [
  {
    icon: PawPrint,
    title: "Animal Welfare",
    description: "Rescuing, rehabilitating, and rehoming stray and injured animals. Every creature deserves love, safety, and a second chance at life.",
    image: campaignAnimals,
    color: "#E8553A",
    stats: "2,800+ animals rescued",
  },
  {
    icon: Baby,
    title: "Orphan Support",
    description: "Providing education, nutrition, and emotional care to orphaned children. We become the family they never had.",
    image: galleryOrphanage,
    color: "#3B7DD8",
    stats: "1,200+ children supported",
  },
  {
    icon: TreePine,
    title: "Environmental Protection",
    description: "Planting trees, cleaning water bodies, and fighting climate change. Because the earth is the only home we all share.",
    image: galleryEnvironment,
    color: "#2D8B6F",
    stats: "15,000+ trees planted",
  },
  {
    icon: Utensils,
    title: "Food & Aid",
    description: "Serving hot meals to the hungry, distributing essentials during disasters, and ensuring no one sleeps on an empty stomach.",
    image: campaignFood,
    color: "#D4932A",
    stats: "50,000+ meals served",
  },
];

const CausesSection = () => (
  <section id="causes" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-background to-background" />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[100px]" />

    <div className="relative container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-badge">
          <Heart className="w-4 h-4" />
          What We Do
        </span>
        <h2 className="section-title mt-5">
          Every Life{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
            Deserves
          </span>{" "}
          a Champion
        </h2>
        <p className="section-subtitle mt-5">
          Our work spans across four pillars of compassion. Each cause is close to our hearts
          and fueled by the belief that change starts with caring.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {causes.map((cause, i) => (
          <motion.div
            key={cause.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="cause-card rounded-2xl overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={cause.image}
                alt={cause.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: cause.color, boxShadow: `0 4px 15px ${cause.color}50` }}
                >
                  <cause.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-lg">{cause.title}</span>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-white/15 backdrop-blur-md border border-white/20">
                {cause.stats}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed">{cause.description}</p>
              <motion.div
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: cause.color }}
                whileHover={{ x: 5 }}
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CausesSection;
