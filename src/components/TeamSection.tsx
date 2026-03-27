import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Arun Kumar", role: "Founder & President", bio: "Passionate about social change with 15+ years in community development.", initials: "AK" },
  { name: "Sneha Patel", role: "Co-Founder & Director", bio: "Former educator turned social entrepreneur driving education initiatives.", initials: "SP" },
  { name: "Vikram Singh", role: "Head of Operations", bio: "Operations expert ensuring every resource reaches those who need it most.", initials: "VS" },
  { name: "Meera Nair", role: "Community Lead", bio: "Connects communities with volunteers, bridging gaps with empathy.", initials: "MN" },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Team</span>
          <h2 className="section-title mt-3">The People Behind the Mission</h2>
          <p className="section-subtitle mt-4">Dedicated individuals united by a shared purpose of making a difference.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover rounded-2xl p-6 text-center"
            >
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(213 74% 59%), hsl(145 45% 55%))" }}>
                {m.initials}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="text-primary text-sm font-medium">{m.role}</p>
              <p className="text-muted-foreground text-sm mt-3">{m.bio}</p>
              <div className="flex justify-center gap-3 mt-4">
                <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
