import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, Award, Volume2, VolumeX, Phone } from "lucide-react";
import ourWorkVideo from "@/assets/Videos/our-work.mp4";

const VideoImpactSection = () => {
  const [videos, setVideos] = useState<any[]>([
    {
      id: "our-work-local",
      title: "Our Mission in Motion",
      description: "Witness the direct results of our collective efforts. Every moment captures a journey of change made possible by your support.",
      impact: "15,000+ Lives Touched",
      videoUrl: ourWorkVideo,
      thumbnailUrl: ourWorkVideo
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = videos[activeIndex];

  return (
    <section id="impact" className="py-12 lg:py-0 lg:h-[90vh] lg:max-h-[780px] lg:min-h-[600px] scroll-mt-20 relative overflow-hidden bg-slate-950 border-t border-white/5 flex items-center">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Side: Content & Gallery */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Real Impact in Motion
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-3 lg:mb-4">
                    {current.title}
                  </h2>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-light mb-4 lg:mb-6 max-w-lg">
                    {current.description || "Witness the direct results of our collective efforts. Every video captures a moment of change made possible by your support."}
                  </p>
                  
                  {/* Highlight Stat */}
                  <div className="inline-flex items-center gap-4 p-3 lg:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Award className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Community Result</p>
                      <p className="text-base lg:text-lg font-black text-white">{current.impact}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Video Gallery (Thumbnail List) */}
            <div className="space-y-3 lg:space-y-4">
               <div className="flex items-center justify-between">
                  <h4 className="text-white text-xs font-black uppercase tracking-widest">Video Archive</h4>
                  <span className="text-white/30 text-[10px] uppercase font-bold">{activeIndex + 1} / {videos.length}</span>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none snap-x">
                  {videos.map((vid, idx) => (
                    <button
                      key={vid.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative flex-shrink-0 w-24 md:w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all snap-start ${
                        activeIndex === idx ? "border-emerald-500 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-white/10 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <video src={vid.videoUrl} className="w-full h-full object-cover" muted playsInline />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                         <Play className={`w-4 h-4 text-white ${activeIndex === idx ? "fill-white" : ""}`} />
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {/* Right Side: 3D Mobile Frame */}
          <div className="flex justify-center perspective-[2000px] h-full items-center">
            <motion.div
              initial={{ rotateY: -8, rotateX: 2 }}
              animate={{ rotateY: -3, rotateX: 0 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[350px] aspect-[9/16] mx-auto"
            >
              {/* Phone Frame Decoration */}
              <div className="relative z-20 rounded-[2.5rem] p-2 lg:p-2.5 border-[8px] lg:border-[10px] border-slate-900 bg-slate-950 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.8)] border-x-[10px] lg:border-x-[12px] border-y-[10px] lg:border-y-[12px] overflow-hidden w-full h-full flex flex-col">
                {/* Speaker/Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-lg z-30" />
                
                {/* Screen Content */}
                <div className="relative flex-1 rounded-[1.8rem] lg:rounded-[2rem] bg-black overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.video
                      key={current.videoUrl}
                      ref={videoRef}
                      src={current.videoUrl}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Volume Toggle */}
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white z-40 hover:bg-emerald-500 transition-all"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Bottom Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full z-30" />
              </div>

              {/* Shadows & Glows */}
              <div className="absolute inset-10 bg-emerald-500/10 blur-[60px] -z-10 rounded-full" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoImpactSection;
