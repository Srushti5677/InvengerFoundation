import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Target, TrendingUp, ImagePlus } from "lucide-react";
import { resolveMediaURL } from "@/utils/media";

interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  goalAmount: number;
  raisedAmount: number;
  isActive: boolean;
  createdAt: string;
}

function ProgressBar({ percentage, color, inView }: { percentage: number; color: string; inView: boolean }) {
  return (
    <div className="progress-bar-bg h-2.5 w-full bg-secondary/20 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: "0%" }}
        animate={{ width: inView ? `${percentage}%` : "0%" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

const CampaignsSection = () => {
  const [dbCampaigns, setDbCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/campaigns");
        const data = await res.json();
        if (Array.isArray(data)) {
          setDbCampaigns(data);
        }
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <section id="campaigns" className="py-16 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white pointer-events-none" />
      
      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase border border-primary/10">
            <Target className="w-3.5 h-3.5" />
            Active Campaigns
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-6 tracking-tight">
            Your <span className="text-primary italic">Support</span> Changes Lives
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 mt-6 text-lg leading-relaxed">
            Choose a cause close to your heart. Every donation brings us closer to a world filled with compassion.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbCampaigns.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <ImagePlus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No active campaigns</h3>
                <p className="text-slate-500 mt-2">Check back soon for new opportunities to help.</p>
              </div>
            ) : (
              dbCampaigns.map((campaign, i) => {
                const percentage = Math.round(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100);
                const color = i % 3 === 0 ? "#E8553A" : i % 3 === 1 ? "#2D8B6F" : "#3B7DD8";

                return (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                  >
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden">
                      {campaign.imageUrl ? (
                        <img
                          src={resolveMediaURL(campaign.imageUrl)}
                          alt={campaign.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <ImagePlus className="w-10 h-10 text-slate-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                          {campaign.isActive ? "Active" : "Completed"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{campaign.title}</h3>
                      <p className="text-slate-500 text-sm mt-3 leading-relaxed line-clamp-2">{campaign.description}</p>

                      {/* Progress */}
                      <div className="mt-8">
                        <div className="flex justify-between items-end mb-2.5">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Raised</p>
                            <p className="text-lg font-bold text-slate-900">₹{(campaign.raisedAmount || 0).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Goal</p>
                            <p className="text-sm font-semibold text-slate-600">₹{(campaign.goalAmount || 0).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <ProgressBar percentage={percentage} color={color} inView={inView} />
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {percentage}% funded
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center transition-all shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, boxShadow: `0 8px 20px ${color}30` }}
                      >
                        Donate Now
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampaignsSection;
