import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The children were genuinely happy and engaged throughout the day. Invenger Foundation brought warmth, care, and joyful energy that made the occasion special for our center.",
    name: "Kadri Anganavadi Kendra",
    role: "Children's Community Visit",
    color: "#3B7DD8",
  },
  {
    quote: "We truly appreciate Invenger Foundation's thoughtful support and kindness. Their visit brought comfort to our children and showed how much community care can mean in one day.",
    name: "Chetana Child Development Centre",
    role: "Free Meal Initiative",
    color: "#2D8B6F",
  },
  {
    quote: "Our elders felt heard, respected, and valued during Invenger Foundation's visit. Their compassionate presence and support made a meaningful difference to everyone at our home.",
    name: "SANJEEVAN - A Center for Elderly Home",
    role: "Elderly Care Outreach",
    avatar: "SV",
    color: "#E8553A",
  },
  {
    quote: "Invenger Foundation's support came with sincerity and respect for our work. Their contribution helped us continue our daily care efforts with confidence and gratitude.",
    name: "Inchara Foundation",
    role: "Essential Support Donation",
    color: "#D4932A",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 to-background" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title mt-5">
            Voices of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
              Hope
            </span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card rounded-3xl p-10 md:p-14 text-center"
            >
              <Quote className="w-10 h-10 mx-auto mb-6" style={{ color: testimonials[current].color + "30" }} />

              <p className="text-xl md:text-2xl text-foreground leading-relaxed italic font-display">
                "{testimonials[current].quote}"
              </p>

              <div className="mt-8">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: testimonials[current].color }}
                >
                  {testimonials[current].avatar ?? testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="font-semibold text-foreground text-lg font-display">{testimonials[current].name}</p>
                <p className="text-muted-foreground text-sm mt-1">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-11 h-11 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-10 h-3 bg-primary"
                      : "w-3 h-3 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-11 h-11 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
