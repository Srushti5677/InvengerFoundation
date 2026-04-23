import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Activity } from "lucide-react";

// Local Images
import img1 from "@/assets/images/20260227_112610.jpg";
import img2 from "@/assets/images/20260227_112652.jpg";
import img3 from "@/assets/images/20260227_124419.jpg";
import ambulance from "@/assets/images/ambulance.jpg";
import bloodDonation from "@/assets/images/blooddonation.jpg";
import wheelchair from "@/assets/images/wheelchair.jpg";
import img10 from "@/assets/images/image10.jpg";
import img11 from "@/assets/images/image11.jpg";
import img12 from "@/assets/images/image12.jpg";

const OurWorkShowcase = () => {
  const [gallery] = useState<any[]>([
    { id: 1, title: "Emergency Support", impact: "Relief", src: ambulance, description: "Providing critical care and quick response for emergencies." },
    { id: 2, title: "Resource Distribution", impact: "Drives", src: img1, description: "Essential resource distribution for families in need." },
    { id: 3, title: "Blood Donation Camp", impact: "Events", src: bloodDonation, description: "A successful drive to save lives through collective action." },
    { id: 4, title: "Wheelchair Assistance", impact: "Health", src: wheelchair, description: "Improving mobility and independence for differently-abled individuals." },
    { id: 5, title: "Care Initiative", impact: "Rescues", src: img3, description: "Providing dedicated care for those who need it most." },
    { id: 6, title: "Supplies Drive", impact: "Drives", src: img10, description: "Collecting and sorting essentials for distribution." },
    { id: 7, title: "Medical Support", impact: "Health", src: img11, description: "Bringing healthcare to the doorstep of the underserved." },
    { id: 8, title: "Field Operations", impact: "Rescues", src: img12, description: "Our team in action, responding to urgent calls for help." },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading] = useState(false);

  if (loading || gallery.length === 0) return null;

  const currentItem = gallery[activeIndex];

  return (
    <section id="gallery" className="py-20 relative overflow-hidden bg-[#05070A] border-t border-white/5">
      
      <div className="container mx-auto px-4 relative z-10">

        
        {/* Title Area */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
           <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Focus on Impact
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white leading-[1.1] tracking-tight">
                Our Work at <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Every Level.</span>
              </h2>
           </div>
           
           {/* Manual Navigation Arrows (Safe control) */}
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveIndex((prev) => (prev + 1) % gallery.length)}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Main Content Area (Text/Summary) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-[1.1]">
                    {currentItem.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-white/60 text-lg leading-relaxed font-light">
                    {currentItem.description}
                  </p>

                  <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                           <Activity className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-1">Verified Community Impact</p>
                           <p className="text-xl font-black text-white tracking-tight">{currentItem.impact}</p>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Large Visual Showcase (Stable Frame) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <AnimatePresence mode="wait">
               <motion.div 
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative rounded-[3rem] p-4 bg-slate-900/40 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
               >
                  <img 
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="w-full h-[50vh] md:h-[65vh] object-contain rounded-[2rem]"
                    loading="eager"
                  />
                  
                  {/* Visual Accent */}
                  <div className="absolute top-10 left-10 w-12 h-px bg-white/20" />
                  <div className="absolute top-10 left-10 w-px h-12 bg-white/20" />
               </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Progress Dots */}
        <div className="mt-16 flex items-center justify-center gap-3">
          {gallery.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-12 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurWorkShowcase;
