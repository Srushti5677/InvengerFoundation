import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShieldCheck, BarChart3, Sparkles, Calculator, IndianRupee, CheckCircle } from "lucide-react";

const amounts = [100, 500, 1000, 2500, 5000];

const transparency = [
  { amount: "₹100", impact: "Feeds 2 stray animals for a week" },
  { amount: "₹500", impact: "Provides school supplies for 1 child" },
  { amount: "₹1,000", impact: "Plants 10 trees in barren land" },
  { amount: "₹2,500", impact: "Vaccinate 15 stray dogs" },
  { amount: "₹5,000", impact: "Feeds 100 people a nutritious meal" },
];

const DonateSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [showImpact, setShowImpact] = useState(false);

  const activeAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const getImpactMessage = (amount: number | null) => {
    if (!amount || amount <= 0) return "";
    if (amount < 200) return `feeds ${Math.floor(amount / 50)} stray animals for a week`;
    if (amount < 800) return `provides school supplies for ${Math.floor(amount / 500)} children`;
    if (amount < 2000) return `plants ${Math.floor(amount / 100)} trees in barren land`;
    if (amount < 4000) return `vaccinates ${Math.floor(amount / 170)} stray dogs`;
    return `feeds ${Math.floor(amount / 50)} people a nutritious meal`;
  };

  return (
    <section id="donate" className="py-28 relative overflow-hidden">
      {/* Deep dark background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(150deg, #0f2922 0%, #122d3a 40%, #1a1a2e 70%, #0f2922 100%)",
        }}
      />

      {/* Subtle glow orbs */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(45,139,111,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[8%] w-[350px] h-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,85,58,0.12) 0%, transparent 70%)", filter: "blur(80px)" }}
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-14 h-14 mx-auto text-red-400" fill="currentColor" />
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Your Kindness Can{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-300">
                Save a Life
              </span>
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
              Every donation, no matter how small, creates a ripple of hope.
              We promise 100% transparency — you'll see exactly where your money goes.
            </p>
          </motion.div>

          {/* Donation card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Quick amounts */}
            <p className="text-white/70 text-sm font-medium mb-4 text-center">Choose an amount</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
              {amounts.map((amt) => {
                const isSelected = selectedAmount === amt && !customAmount;
                const impactLabels: Record<number, string> = {
                  100: "2 meals",
                  500: "feeds 8 people",
                  1000: "10 trees",
                  2500: "15 vaccines",
                  5000: "100 meals",
                };
                return (
                  <motion.button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    className={`relative py-3.5 rounded-xl font-semibold text-sm transition-all ${
                      isSelected
                        ? "text-white shadow-lg"
                        : "text-white/60 border border-white/10 hover:border-white/25"
                    }`}
                    style={
                      isSelected
                        ? { background: "linear-gradient(135deg, #E8553A, #D4432E)", boxShadow: "0 4px 20px rgba(232,85,58,0.3)" }
                        : { background: "rgba(255,255,255,0.05)" }
                    }
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isSelected ? { scale: [1, 1.08, 1] } : {}}
                    transition={isSelected ? { duration: 0.3 } : {}}
                  >
                    <span className="block">₹{amt.toLocaleString()}</span>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="block text-[10px] text-white/70 mt-0.5 font-medium"
                        >
                          = {impactLabels[amt]}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Custom amount */}
            <div className="relative mb-6">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 outline-none transition-all text-lg"
              />
            </div>

            {/* Impact calculator */}
            {activeAmount && activeAmount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 rounded-xl bg-emerald-400/8 border border-emerald-400/15"
              >
                <div className="flex items-center gap-2 text-emerald-300 text-sm">
                  <Calculator className="w-4 h-4" />
                  <span className="font-medium">
                    Your ₹{activeAmount.toLocaleString()} {getImpactMessage(activeAmount)}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Donate button */}
            <motion.button
              className="w-full py-5 rounded-xl font-bold text-lg text-white relative overflow-hidden flex items-center justify-center gap-3"
              style={{ background: "linear-gradient(135deg, #E8553A, #D4432E)" }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(232,85,58,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="w-5 h-5" />
              Donate ₹{activeAmount ? activeAmount.toLocaleString() : "—"} Now
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {[
              { icon: ShieldCheck, label: "100% Transparent", desc: "Every rupee tracked & reported" },
              { icon: BarChart3, label: "Impact Reports", desc: "Quarterly updates to donors" },
              { icon: Sparkles, label: "Tax Benefits", desc: "80G certified deductions" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="donate-feature-card rounded-2xl p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <item.icon className="w-7 h-7 mx-auto mb-3 text-emerald-400" />
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-white/40 text-xs mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Where Your Money Goes - Transparency */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-center text-white font-display text-xl font-bold mb-6">
              Where Your Money Goes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {transparency.map((item, i) => (
                <motion.div
                  key={item.amount}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-white font-bold text-sm">{item.amount}</span>
                    <span className="text-white/50 text-sm"> — {item.impact}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
