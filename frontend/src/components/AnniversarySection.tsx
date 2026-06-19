import { motion } from "framer-motion";
import { Sparkles, Gift, Heart } from "lucide-react";
import anniversaryDrive from "@/assets/images/anniversary-drive.jpg";
import anniversaryCake from "@/assets/images/anniversary-cake.jpg";

const AnniversarySection = () => {
  return (
    <section id="anniversary" className="py-20 lg:py-24 scroll-mt-20 relative overflow-hidden bg-[#051411]">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Info */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              20-Year Milestone
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-black text-white leading-snug tracking-tight">
              Celebrating Two
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300">
                Decades of Care.
              </span>
            </h2>
            
            <p className="text-white/60 text-base leading-relaxed font-light max-w-lg">
              For 20 years, Invenger has been committed to community empowerment and service. Special drives were conducted to share joy and support with local development centers.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Community Welfare Drive</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-1">Distributed essential food supplies and support packages to families with Inchara Foundation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Sharing Joy at Chetana Centre</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-1">Celebrated with a cake-cutting ceremony and child welfare drives at the Child Development Centre.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Photo Layout */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <img
                src={anniversaryDrive}
                alt="20th Anniversary Food Drive"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Welfare Drive</p>
                <p className="text-xs font-bold text-white mt-0.5 leading-tight">Inchara Foundation Support</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <img
                src={anniversaryCake}
                alt="20th Anniversary Cake Cutting"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Celebrations</p>
                <p className="text-xs font-bold text-white mt-0.5 leading-tight">Chetana Development Centre</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnniversarySection;
