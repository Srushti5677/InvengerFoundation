import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Heart } from "lucide-react";

const testimonials = [
  {
    quote: "The Invenger Foundation changed my life. Their education program helped me become the first graduate in my family. I now teach in the same community I grew up in.",
    name: "Priya Sharma",
    role: "Beneficiary, Education Program",
    stars: 5,
    color: "#3B7DD8",
  },
  {
    quote: "Volunteering with Invenger has been the most rewarding experience. Seeing the smiles on children's faces when we visit orphanages is something I'll never forget.",
    name: "Rahul Menon",
    role: "Volunteer since 2022",
    stars: 5,
    color: "#2D8B6F",
  },
  {
    quote: "When I was a stray dog rescuer working alone, Invenger gave me a team, resources, and hope. Together we've saved over 500 animals in just two years.",
    name: "Dr. Kavitha Rao",
    role: "Veterinary Partner",
    stars: 5,
    color: "#E8553A",
  },
  {
    quote: "When floods destroyed our village, Invenger Foundation was among the first to reach us with food, medicine, and shelter. They stayed until we could rebuild.",
    name: "Ramesh Gogoi",
    role: "Flood Relief Beneficiary",
    stars: 5,
    color: "#D4932A",
  },
  {
    quote: "The women empowerment workshops gave me skills and confidence to start my own tailoring business. I'm now financially independent and can support my children's education.",
    name: "Fatima Begum",
    role: "Women Empowerment Program",
    stars: 5,
    color: "#8B5CF6",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
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
            Testimonials
          </span>
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

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].stars }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </motion.div>
                ))}
              </div>

              <p className="text-xl md:text-2xl text-foreground leading-relaxed italic font-display">
                "{testimonials[current].quote}"
              </p>

              <div className="mt-8">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: testimonials[current].color }}
                >
                  {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
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
