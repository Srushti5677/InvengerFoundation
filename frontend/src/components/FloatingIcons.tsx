import { motion } from "framer-motion";

const icons = [
  { emoji: "🍃", size: 18, x: "8%", delay: 0, duration: 14 },
  { emoji: "🐾", size: 16, x: "35%", delay: 4, duration: 16 },
  { emoji: "🌱", size: 15, x: "50%", delay: 1, duration: 20 },
  { emoji: "🍃", size: 20, x: "65%", delay: 3, duration: 15 },
  { emoji: "🐾", size: 14, x: "90%", delay: 0.5, duration: 19 },
  { emoji: "🌱", size: 16, x: "15%", delay: 6, duration: 22 },
];

const FloatingIcons = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {icons.map((icon, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: icon.x,
          top: "100%",
          fontSize: icon.size,
          opacity: 0.06,
        }}
        animate={{
          y: [0, -window.innerHeight - 100],
          x: [0, Math.sin(i) * 40, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: icon.duration,
          repeat: Infinity,
          delay: icon.delay,
          ease: "linear",
        }}
      >
        {icon.emoji}
      </motion.div>
    ))}
  </div>
);

export default FloatingIcons;
