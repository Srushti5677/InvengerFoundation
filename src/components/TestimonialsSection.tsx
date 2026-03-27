import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The Invenger Foundation changed my life. Their education program helped me become the first graduate in my family. I now teach in the same community I grew up in.",
    name: "Priya Sharma",
    role: "Beneficiary, Education Program",
  },
  {
    quote: "Volunteering with Invenger has been the most rewarding experience. Seeing the smiles on children's faces when we visit orphanages is something I'll never forget.",
    name: "Rahul Menon",
    role: "Volunteer since 2022",
  },
  {
    quote: "The women empowerment workshops gave me skills and confidence to start my own tailoring business. I'm now financially independent and can support my children's education.",
    name: "Fatima Begum",
    role: "Women Empowerment Program",
  },
  {
    quote: "When floods destroyed our village, Invenger Foundation was among the first to reach us with food, medicine, and shelter. They stayed until we could rebuild.",
    name: "Ramesh Gogoi",
    role: "Flood Relief Beneficiary",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="section-title mt-3">Voices of Change</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <Quote className="w-16 h-16 text-primary/10 mx-auto mb-6" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-foreground leading-relaxed italic font-display">
                "{testimonials[current].quote}"
              </p>
              <div className="mt-8">
                <p className="font-semibold text-foreground text-lg">{testimonials[current].name}</p>
                <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-8" : "bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent((c) => (c + 1) % testimonials.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
