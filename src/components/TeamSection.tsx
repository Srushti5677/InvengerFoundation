import { motion } from "framer-motion";
import { Linkedin, Twitter, Heart } from "lucide-react";
import { useRef } from "react";

const team = [
  { name: "Arun Kumar", role: "Founder & President", bio: "Passionate about social change with 15+ years in community development. Started the foundation with a dream to save every life.", initials: "AK", color: "#2D8B6F" },
  { name: "Sneha Patel", role: "Co-Founder & Director", bio: "Former educator turned social entrepreneur. Leads education and orphan support initiatives with heart and vision.", initials: "SP", color: "#3B7DD8" },
  { name: "Vikram Singh", role: "Head of Operations", bio: "Operations expert ensuring every resource reaches those who need it most. A logistics genius with a caring soul.", initials: "VS", color: "#8B5CF6" },
  { name: "Meera Nair", role: "Community Lead", bio: "Connects communities with volunteers, bridging gaps with empathy. Her warmth inspires everyone around her.", initials: "MN", color: "#E8553A" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 to-background" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge">
            <Heart className="w-4 h-4" />
            Our Team
          </span>
          <h2 className="section-title mt-5">
            Hearts Behind{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
              the Mission
            </span>
          </h2>
          <p className="section-subtitle mt-5">Dedicated individuals united by a shared purpose — because compassion needs champions.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}
              className="team-card-3d rounded-2xl p-7 text-center cursor-default"
            >
              <motion.div
                className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-xl font-bold text-white shadow-lg"
                style={{ backgroundColor: m.color }}
                whileHover={{ scale: 1.1 }}
              >
                {m.initials}
              </motion.div>
              <h3 className="font-display text-lg font-bold text-foreground">{m.name}</h3>
              <p className="text-sm font-semibold mt-1" style={{ color: m.color }}>{m.role}</p>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{m.bio}</p>
              <div className="flex justify-center gap-3 mt-5">
                <motion.button
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
