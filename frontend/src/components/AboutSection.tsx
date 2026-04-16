import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To support people and communities through practical acts of care.",
    color: "#2D8B6F",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A compassionate society where everyone feels seen, valued, and supported.",
    color: "#E8553A",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-12 relative overflow-hidden">
      {/* Warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-emerald-50/30" />
      <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-[100px]" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="section-badge">Our Story</span>
          <h2 className="section-title mt-5">
            Born from{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              Compassion
            </span>
            , Driven by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
              Purpose
            </span>
          </h2>
          <p className="section-subtitle mt-4">
            We started with compassion and continue with service.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-base leading-relaxed text-center mb-6">
            Invenger Foundation is built on one belief: <strong className="text-foreground">every life matters</strong>.
            We continue to serve with care, consistency, and respect for every community we reach.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -3, boxShadow: "0 14px 40px rgba(0,0,0,0.08)" }}
                className="about-card rounded-2xl p-5 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                    style={{ backgroundColor: c.color + "15", color: c.color }}
                  >
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
