import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Activity, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import workVideo from "@/assets/Videos/our-work.mp4";

const VideoImpactSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Decorative background gradients from the original design */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          
          {/* Left Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100">
              <Activity className="w-3.5 h-3.5" />
              Impact in Motion
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Seeing the <span className="text-emerald-600 italic">Smile</span> <br />
              Behind Every Action
            </h2>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Our work is more than just statistics. It's about the lives we touch, the children we educate, and the communities we empower every single day. Listen to their stories.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 text-left max-w-lg mx-auto lg:mx-0">
              {[
                { icon: Sparkles, title: "Real Impact", desc: "Verifiable change in lives across the country." },
                { icon: ShieldCheck, title: "Pure Intention", desc: "Driven entirely by compassion and transparency." },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors duration-300 shadow-sm border border-emerald-100">
                    <item.icon className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Larger Premium Phone Video Frame  */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1.5 }}
            className="flex-shrink-0 relative"
          >
            {/* The Device Frame (Made larger as requested) */}
            <div className="relative z-10 w-[320px] sm:w-[380px] md:w-[400px] aspect-[9/16] bg-slate-900 rounded-[3.5rem] p-3 shadow-2xl shadow-emerald-900/15 border border-slate-200 group">
              
              {/* Device Notch (Creates phone illusion) */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-30" />
              
              {/* Inner screen bezel */}
              <div className="absolute inset-0 z-20 pointer-events-none border-[2px] border-white/5 rounded-[3.5rem]" />
              
              <div className="w-full h-full relative rounded-[2.8rem] overflow-hidden bg-black" onClick={toggleMute}>
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted={isMuted}
                  loop 
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                >
                  <source src={workVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Dark gradient for controls visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Audio Toggle Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white hover:bg-white/30 transition-all z-30 shadow-lg"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="text-xs font-bold uppercase tracking-wider">{isMuted ? "Sound Off" : "Sound On"}</span>
                </button>

                {/* Play symbol for visual cue (Appears briefly if mutated) */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-opacity duration-500 ${isMuted ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                   <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-500">
                      <Play className="w-6 h-6 fill-white" />
                   </div>
                   <p className="text-white text-xs font-bold tracking-widest uppercase mt-4 drop-shadow-md">Tap to listen</p>
                </div>
              </div>
            </div>

            {/* Restored and Animated decorative background circle behind video */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-transparent rounded-full opacity-60 -z-10" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-60 -z-10" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VideoImpactSection;
