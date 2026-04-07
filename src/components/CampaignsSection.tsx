import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Target, TrendingUp, PawPrint, TreePine, Utensils, Baby, Droplets } from "lucide-react";
import campaignAnimals from "@/assets/campaign-animals.png";
import campaignTrees from "@/assets/campaign-trees.png";
import campaignFood from "@/assets/campaign-food.png";
import galleryWater from "@/assets/gallery-water.jpg";
import galleryOrphanage from "@/assets/gallery-orphanage.jpg";

interface Campaign {
  title: string;
  description: string;
  image: string;
  icon: typeof Heart;
  color: string;
  goal: number;
  raised: number;
  donors: number;
}

const campaigns: Campaign[] = [
  {
    title: "Save Stray Animals",
    description: "Help us rescue, vaccinate, and find homes for 5,000 stray animals this year. Every donation provides food, medical care, and shelter.",
    image: campaignAnimals,
    icon: PawPrint,
    color: "#E8553A",
    goal: 500000,
    raised: 347000,
    donors: 892,
  },
  {
    title: "Plant Trees Initiative",
    description: "Join our mission to plant 50,000 trees. Combat climate change, restore ecosystems, and give our planet the care it deserves.",
    image: campaignTrees,
    icon: TreePine,
    color: "#2D8B6F",
    goal: 300000,
    raised: 218000,
    donors: 654,
  },
  {
    title: "Feed the Hungry",
    description: "Provide nutritious meals to those in need. ₹50 feeds one person for a day. Together, we can ensure no one sleeps hungry.",
    image: campaignFood,
    icon: Utensils,
    color: "#D4932A",
    goal: 400000,
    raised: 312000,
    donors: 1243,
  },
  {
    title: "Clean Water for Villages",
    description: "Install water purification systems in rural villages. Every family deserves access to clean, safe drinking water.",
    image: galleryWater,
    icon: Droplets,
    color: "#3B7DD8",
    goal: 600000,
    raised: 285000,
    donors: 487,
  },
  {
    title: "Educate an Orphan",
    description: "Give the gift of education to orphaned children. Your support provides books, uniforms, tutoring, and hope for a bright future.",
    image: galleryOrphanage,
    icon: Baby,
    color: "#8B5CF6",
    goal: 350000,
    raised: 198000,
    donors: 376,
  },
];

function ProgressBar({ percentage, color, inView }: { percentage: number; color: string; inView: boolean }) {
  return (
    <div className="progress-bar-bg h-2.5 w-full">
      <motion.div
        className="h-full"
        style={{ backgroundColor: color, borderRadius: "100px" }}
        initial={{ width: "0%" }}
        animate={{ width: inView ? `${percentage}%` : "0%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

const CampaignsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="campaigns" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-50/20 to-background" />
      <div className="absolute -left-40 top-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge">
            <Target className="w-4 h-4" />
            Active Campaigns
          </span>
          <h2 className="section-title mt-5">
            Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E8553A] to-[#D4432E]">
              Support
            </span>{" "}
            Changes Lives
          </h2>
          <p className="section-subtitle mt-5">
            Choose a cause close to your heart. Every rupee counts. Every donation
            brings us closer to a world filled with compassion.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {campaigns.map((campaign, i) => {
            const percentage = Math.round((campaign.raised / campaign.goal) * 100);

            return (
              <motion.div
                key={campaign.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="campaign-card rounded-2xl overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: campaign.color, boxShadow: `0 4px 12px ${campaign.color}40` }}
                  >
                    <campaign.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-foreground">{campaign.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">{campaign.description}</p>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-foreground">
                        ₹{(campaign.raised / 1000).toFixed(0)}K raised
                      </span>
                      <span className="text-muted-foreground">
                        Goal: ₹{(campaign.goal / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <ProgressBar percentage={percentage} color={campaign.color} inView={inView} />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {percentage}% funded
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {campaign.donors} donors
                      </span>
                    </div>
                  </div>

                  {/* Donate button */}
                  <motion.a
                    href="#donate"
                    className="mt-5 w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 relative overflow-hidden"
                    style={{ backgroundColor: campaign.color }}
                    whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${campaign.color}40` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="w-4 h-4" />
                    Donate to This Campaign
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;
