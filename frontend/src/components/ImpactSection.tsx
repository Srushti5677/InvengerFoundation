import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Calendar, Heart, MapPin, PawPrint, TreePine, Utensils, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: 25000, suffix: "+", label: "People Helped", color: "#3B7DD8" },
  { icon: PawPrint, value: 2800, suffix: "+", label: "Animals Rescued", color: "#E8553A" },
  { icon: TreePine, value: 15000, suffix: "+", label: "Trees Planted", color: "#2D8B6F" },
  { icon: Utensils, value: 50000, suffix: "+", label: "Meals Served", color: "#D4932A" },
  { icon: Calendar, value: 350, suffix: "+", label: "Events Conducted", color: "#8B5CF6" },
  { icon: MapPin, value: 45, suffix: "+", label: "Areas Served", color: "#06B6D4" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

const ImpactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-emerald-50/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-badge">
            <TrendingUp className="w-4 h-4" />
            Our Impact
          </span>
          <h2 className="section-title mt-5">
            Numbers That Tell{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
              Our Story
            </span>
          </h2>
          <p className="section-subtitle mt-5">
            Every number represents a life touched, a community strengthened,
            and a promise kept. This is what compassion in action looks like.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
              className="impact-card-3d rounded-2xl p-6 text-center cursor-default"
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: s.color + "12", color: s.color }}
              >
                <s.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold font-body" style={{ color: s.color }}>
                <AnimatedCounter value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <p className="text-muted-foreground mt-2 font-medium text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
