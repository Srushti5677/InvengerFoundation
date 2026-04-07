import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, TreePine, Utensils, Heart, Users, Droplets, Baby } from "lucide-react";

const activities = [
  { icon: PawPrint, text: "2 stray dogs rescued in Bangalore", time: "5 min ago", color: "#E8553A" },
  { icon: Utensils, text: "50 hot meals served at Whitefield shelter", time: "12 min ago", color: "#D4932A" },
  { icon: TreePine, text: "20 saplings planted in Mysore district", time: "30 min ago", color: "#2D8B6F" },
  { icon: Heart, text: "₹5,000 donated by an anonymous donor", time: "45 min ago", color: "#E8553A" },
  { icon: Baby, text: "School supplies delivered to 15 children", time: "1 hr ago", color: "#3B7DD8" },
  { icon: Users, text: "3 new volunteers joined from Mumbai", time: "2 hr ago", color: "#8B5CF6" },
  { icon: Droplets, text: "Water purifier installed in Rajasthan village", time: "3 hr ago", color: "#06B6D4" },
  { icon: PawPrint, text: "Injured cat treated and recovering", time: "4 hr ago", color: "#E8553A" },
];

const LiveActivityStrip = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activity = activities[currentIndex];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border-y border-border/50">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live</span>
          </div>

          <div className="h-4 w-px bg-border" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2"
            >
              <activity.icon className="w-3.5 h-3.5 shrink-0" style={{ color: activity.color }} />
              <span className="text-sm text-foreground/75 font-medium">{activity.text}</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">· {activity.time}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityStrip;
