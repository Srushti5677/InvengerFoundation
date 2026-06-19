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
    <section id="gallery" className="py-12 lg:py-0 lg:h-[90vh] lg:max-h-[720px] lg:min-h-[600px] scroll-mt-20 relative overflow-hidden bg-[#05070A] border-t border-white/5 flex items-center">
      
      <div className="container mx-auto px-4 relative z-10 w-full lg:pt-10 lg:pb-10">

        
        {/* Title Area */}
        <div className="mb-6 lg:mb-8">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Focus on Impact
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-display font-black text-white leading-[1.1] tracking-tight">
              Our Work at <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Every Level.</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Content Area (Text/Summary) */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-6 lg:space-y-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 lg:space-y-6"
              >
                <div className="space-y-2 lg:space-y-3">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-[1.1]">
                    {currentItem.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-white/60 text-sm lg:text-base leading-relaxed font-light">
                    {currentItem.description}
                  </p>

                  <div className="p-4 lg:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                           <Activity className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Verified Community Impact</p>
                           <p className="text-base lg:text-lg font-black text-white tracking-tight">{currentItem.impact}</p>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons and progress indicator */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
               <div className="flex items-center gap-2.5">
                  <button 
                    onClick={() => setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveIndex((prev) => (prev + 1) % gallery.length)}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
               
               {/* Progress Indicators */}
               <div className="flex items-center gap-1.5">
                 {gallery.map((_, i) => (
                   <button 
                     key={i}
                     onClick={() => setActiveIndex(i)}
                     className={`h-1 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'w-1.5 bg-white/10 hover:bg-white/20'}`}
                   />
                 ))}
               </div>
            </div>
          </div>

          {/* Large Visual Showcase (Stable Frame) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <AnimatePresence mode="wait">
               <motion.div 
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative rounded-3xl p-3 bg-slate-900/40 border border-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.5)] overflow-hidden"
               >
                  <div className="relative w-full h-[50vh] md:h-[55vh] lg:h-[55vh] lg:max-h-[460px] xl:max-h-[500px] rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center">
                    {/* Blurred background image for all aspect ratios to prevent blank spaces and cropping */}
                    <img 
                      src={currentItem.src}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none select-none"
                    />
                    {/* Crisp centered foreground image showing the full photo without zoom/cropping */}
                    <img 
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="relative z-10 max-w-full max-h-full object-contain"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Visual Accent */}
                  <div className="absolute top-10 left-10 w-12 h-px bg-white/20" />
                  <div className="absolute top-10 left-10 w-px h-12 bg-white/20" />
               </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurWorkShowcase;
