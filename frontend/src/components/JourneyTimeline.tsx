import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  afterText: string;
  year: number;
  color: string;
}

const JourneyTimeline = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stories");
        const data = await res.json();
        // Filter for milestones and sort by year
        const filtered = data
          .filter((s: any) => s.isMilestone)
          .sort((a: any, b: any) => a.year - b.year);
        setMilestones(filtered);
      } catch (err) {
        console.error("Timeline load fail", err);
      }
    };
    fetchTimeline();
  }, []);

  if (milestones.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black tracking-widest uppercase border border-amber-100">
            <Calendar className="w-3.5 h-3.5" />
            Our Legacy
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 tracking-tight">
            The Journey of <span className="text-emerald-600 italic">Impact</span>
          </h2>
          <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto">
            From a single spark of hope to a global movement. These are the milestones that define who we are.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-100 transform -translate-x-1/2" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-emerald-500 to-blue-500 transform -translate-x-1/2 z-10"
          />

          <div className="space-y-32">
            {milestones.map((m, index) => (
              <div key={m.id} className="relative flex flex-col md:flex-row items-center">
                {/* Year Marker */}
                <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white border-4 border-slate-900 rounded-full flex items-center justify-center font-black text-xs transform -translate-x-1/2 z-20 shadow-xl">
                  {m.year}
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? "md:pr-24 md:text-right" : "md:ml-auto md:pl-24"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                  >
                    <div className="relative group">
                       <div className="aspect-video w-full rounded-[32px] overflow-hidden mb-8 shadow-2xl shadow-slate-200 group-hover:scale-[1.02] transition-transform duration-500">
                         <img src={m.imageUrl} alt={m.title} className="w-full h-full object-cover" />
                       </div>
                       
                       <div className={`absolute -bottom-4 ${index % 2 === 0 ? "md:-right-4" : "md:-left-4"} bg-white p-4 rounded-2xl shadow-lg border border-slate-50 max-w-[200px]`}>
                          <p className="text-[10px] font-black uppercase text-amber-500 mb-1">{m.subtitle}</p>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">{m.title}</h4>
                       </div>
                    </div>
                  </motion.div>
                </div>

                {/* Description Side */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-0 mt-8 md:mt-0 ${index % 2 === 0 ? "md:ml-auto md:pl-24" : "md:pr-24 md:text-right"}`}>
                   <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                   >
                     <Sparkles className={`w-8 h-8 text-amber-400 mb-4 ${index % 2 === 0 ? "md:block" : "md:ml-auto"}`} />
                     <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">{m.title}</h3>
                     <p className="text-slate-500 leading-relaxed font-medium text-lg">
                       {m.afterText}
                     </p>
                     <button className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors">
                        Explored Full Record <ArrowRight className="w-4 h-4" />
                     </button>
                   </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
