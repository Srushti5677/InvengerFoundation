import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";

// Importing local images
import img1 from "@/assets/images/20260227_112610.jpg";
import img2 from "@/assets/images/20260227_112652.jpg";
import img3 from "@/assets/images/20260227_124419.jpg";
import img4 from "@/assets/images/image10.jpg";
import img5 from "@/assets/images/image11.jpg";
import img6 from "@/assets/images/image12.jpg";
import img7 from "@/assets/images/image13.jpg";
import img8 from "@/assets/images/ambulance.jpg";
import img9 from "@/assets/images/ambulance1.jpg";
import img10 from "@/assets/images/ambulance2.jpg";
import img11 from "@/assets/images/blooddonation.jpg";
import img12 from "@/assets/images/wheelchair2.jpg";
import img13 from "@/assets/images/wheelchair.jpg";

const galleryData = [
  { id: 1, src: img8, tag: "Emergency Care" },
  { id: 2, src: img13, tag: "Mobility Aid" },
  { id: 3, src: img11, tag: "Life-Saving Drives" },
  { id: 4, src: img1, tag: "Ground Impact" },
  { id: 5, src: img5, tag: "Education Essentials" },
  { id: 6, src: img9, tag: "Medical Transit" },
  { id: 7, src: img2, tag: "Volunteer Effort" },
  { id: 8, src: img12, tag: "Empowerment" },
  { id: 9, src: img3, tag: "Community Outreach" },
  { id: 10, src: img4, tag: "Healthcare Support" },
  { id: 11, src: img6, tag: "Relief Distribution" },
  { id: 12, src: img7, tag: "Impact in Action" },
  { id: 13, src: img10, tag: "Emergency Response" },
];

const OurWorkShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryData.length);
    }, 4500); // 4.5 seconds per image
    return () => clearInterval(interval);
  }, []);

  // 3D Parallax logic for the central frame
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
  
  // Tilted slightly on mouse move
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const currentImage = galleryData[activeIndex];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#0A0F1C] min-h-screen flex flex-col justify-center perspective-[1200px]">
      
      {/* Dynamic Background Blurring out the active image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img 
             key={`bg-${currentImage.id}`}
             src={currentImage.src}
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.2 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1.5 }}
             className="w-full h-full object-cover blur-[100px] scale-110"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-[#0A0F1C]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center w-full">
        
        {/* Title Area */}
        <div className="text-center mb-12 relative z-20">
           <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" />
              Our Work
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight drop-shadow-2xl">
              Focus on <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 italic font-light">Impact.</span>
            </h2>
        </div>

        {/* Central Massive Dynamic Frame */}
        <div className="w-[100vw] h-[60vh] md:h-[75vh] flex items-center justify-center mt-10 perspective-[1600px]">
            <AnimatePresence mode="wait">
               <motion.div 
                  key={currentImage.id}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -60, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="relative rounded-[2rem] sm:rounded-[3rem] p-2 md:p-3 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.8)] border border-slate-700/50 bg-[#0A0F1C] group cursor-pointer"
               >
                  {/* The Image dynamically hugging natural aspect ratio. Small images explicitly blown up to ensure cinematic look. */}
                  <img 
                    src={currentImage.src}
                    alt={currentImage.tag}
                    className={`rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[inset_0_-20px_50px_rgba(0,0,0,0.5)] transition-transform duration-[3s] group-hover:scale-[1.02] ${
                       currentImage.id === 13 
                         ? "w-[90vw] md:w-[70vw] h-[45vh] md:h-[65vh] object-cover" 
                         : "max-h-[55vh] md:max-h-[70vh] max-w-[90vw] md:max-w-[85vw] w-auto h-auto object-contain"
                    }`}
                  />
                  
                  {/* Clean, minimal floating caption */}
                  <div 
                    className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/10 shadow-2xl"
                    style={{ transform: "translateZ(40px)" }}
                  >
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-white/95 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                        {currentImage.tag}
                     </p>
                  </div>

                  {/* Abstract Animated Glow Border on Hover */}
                  <div className="absolute inset-0 border-[2px] border-emerald-500/0 group-hover:border-emerald-500/30 rounded-[2rem] sm:rounded-[3rem] transition-all duration-700 pointer-events-none z-30 mix-blend-screen" />
               </motion.div>
            </AnimatePresence>
        </div>

        {/* Minimal Progress Dots */}
        <div className="mt-12 flex items-center justify-center gap-3 relative z-20">
           {galleryData.map((_, i) => (
             <button 
               key={i}
               onClick={() => setActiveIndex(i)}
               className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i ? 'w-10 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
               aria-label={`Go to slide ${i + 1}`}
             />
           ))}
        </div>
        
      </div>
    </section>
  );
};

export default OurWorkShowcase;
