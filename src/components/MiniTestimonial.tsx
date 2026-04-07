import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface MiniTestimonialProps {
  quote: string;
  name: string;
  role: string;
  color?: string;
}

const MiniTestimonial = ({ quote, name, role, color = "#2D8B6F" }: MiniTestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="max-w-2xl mx-auto my-8 px-4"
  >
    <div
      className="relative rounded-2xl p-6 md:p-8 text-center"
      style={{
        background: `linear-gradient(135deg, ${color}08, ${color}04)`,
        border: `1px solid ${color}15`,
      }}
    >
      <Quote className="w-6 h-6 mx-auto mb-3 opacity-20" style={{ color }} />
      <div className="flex justify-center gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-foreground/80 italic text-sm md:text-base leading-relaxed font-display">
        "{quote}"
      </p>
      <div className="mt-4">
        <p
          className="font-semibold text-sm"
          style={{ color }}
        >
          {name}
        </p>
        <p className="text-muted-foreground text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default MiniTestimonial;
