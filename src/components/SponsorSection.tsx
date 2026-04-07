import { motion } from "framer-motion";
import { PawPrint, Baby, TreePine, Heart, ArrowRight } from "lucide-react";
import campaignAnimals from "@/assets/campaign-animals.png";
import galleryOrphanage from "@/assets/gallery-orphanage.jpg";
import campaignTrees from "@/assets/campaign-trees.png";

const sponsorOptions = [
  {
    icon: PawPrint,
    title: "Sponsor an Animal",
    monthly: 500,
    description: "Cover food, shelter, and medical care for one rescued animal. You'll receive monthly updates and photos.",
    image: campaignAnimals,
    color: "#E8553A",
    includes: ["Monthly photo updates", "Naming rights", "Visit the shelter", "Certificate of sponsorship"],
  },
  {
    icon: Baby,
    title: "Sponsor a Child",
    monthly: 1500,
    description: "Fund education, nutrition, and healthcare for one orphaned child. Change a life, one month at a time.",
    image: galleryOrphanage,
    color: "#3B7DD8",
    includes: ["Progress reports", "Handwritten letters", "School visit option", "Birthday celebration"],
  },
  {
    icon: TreePine,
    title: "Sponsor a Tree",
    monthly: 200,
    description: "Plant and maintain a tree in your name. Track its growth and offset your carbon footprint.",
    image: campaignTrees,
    color: "#2D8B6F",
    includes: ["GPS location of your tree", "Growth photo updates", "CO₂ offset certificate", "Plantation visit"],
  },
];

const SponsorSection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-50/20 to-background" />

    <div className="relative container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-badge">
          <Heart className="w-4 h-4" />
          Sponsor a Life
        </span>
        <h2 className="section-title mt-5">
          Give the Gift of{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E8553A] to-[#D4432E]">
            Hope
          </span>
        </h2>
        <p className="section-subtitle mt-5">
          Create a lasting bond. Sponsor an animal, a child, or a tree,
          and watch your kindness grow month after month.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {sponsorOptions.map((option, i) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="sponsor-card group"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={600}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: option.color }}
              >
                ₹{option.monthly}/mo
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: option.color + "15", color: option.color }}
                >
                  <option.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{option.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{option.description}</p>

              {/* Includes */}
              <div className="space-y-2 mb-5">
                {option.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: option.color }} />
                    {item}
                  </div>
                ))}
              </div>

              <motion.a
                href="#donate"
                className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: option.color }}
                whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${option.color}35` }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="w-4 h-4" />
                Start Sponsoring
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SponsorSection;
