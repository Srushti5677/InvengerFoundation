import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";
import galleryEducation from "@/assets/gallery-education.jpg";

const cards = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To create sustainable impact through education, healthcare, and community development — reaching the most underserved populations with dignity and compassion.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A world where every individual has access to basic needs, quality education, and the opportunity to lead a fulfilling life regardless of their background.",
  },
  {
    icon: Lightbulb,
    title: "Why We Exist",
    text: "Millions lack access to education, clean water, and healthcare. We bridge this gap by mobilizing volunteers, resources, and communities toward lasting change.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="section-title mt-3">A Story of Hope &amp; Action</h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              Invenger Foundation was born from a simple belief: that every act of
              kindness creates ripples of change. What started as a small group of
              passionate individuals has grown into a movement that touches thousands
              of lives every year.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              From feeding children in orphanages to empowering women through skill
              development, from organizing health camps in rural areas to planting
              trees for a greener future — we believe in action over words.
            </p>
            <div className="mt-8 relative rounded-2xl overflow-hidden">
              <img
                src={galleryEducation}
                alt="Education program by Invenger Foundation"
                className="w-full h-64 object-cover rounded-2xl"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
          </motion.div>

          <div className="space-y-6">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card-hover rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{c.title}</h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">{c.text}</p>
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
