import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Calendar, DollarSign, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: 15000, suffix: "+", label: "People Helped", color: "text-primary" },
  { icon: Calendar, value: 250, suffix: "+", label: "Events Conducted", color: "text-secondary" },
  { icon: DollarSign, value: 2.5, suffix: "M+", label: "Funds Utilized", color: "text-accent" },
  { icon: MapPin, value: 45, suffix: "+", label: "Areas Served", color: "text-primary" },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = Number.isInteger(value) ? Math.floor(count).toLocaleString() : count.toFixed(1);
  return <span className="counter-number">{display}{suffix}</span>;
}

const ImpactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Impact</span>
          <h2 className="section-title mt-3">Numbers That Tell Our Story</h2>
          <p className="section-subtitle mt-4">
            Every number represents a life touched, a community strengthened, and hope renewed.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover rounded-2xl p-8 text-center"
            >
              <s.icon className={`w-10 h-10 mx-auto mb-4 ${s.color}`} />
              <AnimatedCounter value={s.value} suffix={s.suffix} inView={inView} />
              <p className="text-muted-foreground mt-2 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
