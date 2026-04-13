import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Lightbulb, Heart, Calendar } from "lucide-react";
import galleryEducation from "@/assets/gallery-education.jpg";
import galleryOrphanage from "@/assets/gallery-orphanage.jpg";
import { useRef } from "react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To create sustainable impact through compassion — rescuing animals, protecting the environment, supporting orphans, and feeding the hungry with dignity.",
    color: "#2D8B6F",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A world where no life is abandoned, no child goes hungry, and every living being is treated with love and respect.",
    color: "#3B7DD8",
  },
  {
    icon: Lightbulb,
    title: "Why We Exist",
    text: "Because millions of stray animals suffer in silence, children sleep without meals, and our planet needs urgent healing. We bridge the gap between hope and action.",
    color: "#E8553A",
  },
];

const timeline = [
  { year: "2020", event: "Founded with a dream to create change", detail: "Started with 5 volunteers and a vision to make every life matter." },
  { year: "2021", event: "First animal rescue shelter opened", detail: "Rescued 200+ stray animals in the first year and provided medical care." },
  { year: "2022", event: "Expanded to orphan support & food drives", detail: "Reached 5,000+ children through education and nutrition programs." },
  { year: "2023", event: "Planted 10,000 trees across Karnataka", detail: "Partnered with communities for massive reforestation drives." },
  { year: "2024", event: "25,000 people impacted", detail: "Health camps, clean water initiatives, and women empowerment programs." },
  { year: "2025", event: "Growing stronger, reaching further", detail: "Expanding operations to 5 new states with 500+ active volunteers." },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-emerald-50/30" />
      <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full bg-emerald-400/5 blur-[100px]" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge">
            <Heart className="w-4 h-4" />
            Our Story
          </span>
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
          <p className="section-subtitle mt-5">
            We didn't start with a plan — we started with tears. Tears for the stray
            puppy left shivering in the rain. For the child who hadn't eaten in two days.
            That pain became our purpose.
          </p>
        </motion.div>

        {/* Story + Images */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Invenger Foundation was born from a simple belief:{" "}
              <strong className="text-foreground">every life matters</strong>. What started as
              a small group of passionate individuals rescuing stray animals from the streets
              has grown into a movement that touches thousands of lives every year.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From feeding children in orphanages to planting trees for
              a greener future, from organizing health camps in rural areas to rescuing
              injured animals — <em className="text-primary font-medium">we believe in action over words</em>.
            </p>

            {/* Image with parallax */}
            <motion.div
              className="relative rounded-2xl overflow-hidden group mt-8"
              style={{ y: imageY }}
            >
              <img
                src={galleryEducation}
                alt="Education program by Invenger Foundation"
                className="w-full h-64 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Education drives across rural Karnataka
              </div>
            </motion.div>
          </motion.div>

          {/* Value cards */}
          <div className="space-y-5">
            {values.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
                className="about-card rounded-2xl p-6 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                    style={{ backgroundColor: c.color + "15", color: c.color }}
                  >
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{c.title}</h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline - Our Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Our <span className="text-primary">Journey</span> of Impact
          </h3>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 md:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30 md:-translate-x-1/2 z-10 mt-1.5" />

              {/* Content */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
              }`}>
                <span className="text-sm font-bold text-primary">{item.year}</span>
                <h4 className="font-display text-lg font-bold text-foreground mt-1">{item.event}</h4>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
