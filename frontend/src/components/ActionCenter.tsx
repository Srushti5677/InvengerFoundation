import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, Send, MapPin, Phone, IndianRupee, ShieldCheck, BarChart3, Briefcase, Megaphone } from "lucide-react";

const amounts = [100, 500, 1000, 2500, 5000];

const transparency = [
  { icon: ShieldCheck, label: "100% Transparent", desc: "Every rupee tracked" },
  { icon: BarChart3, label: "Impact Reports", desc: "Quarterly updates" },
];

const ActionCenter = () => {
  const [activeTab, setActiveTab] = useState<"donate" | "volunteer">("donate");

  // Switch tabs based on URL hash (for navbar links)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#donate") setActiveTab("donate");
      if (hash === "#volunteer") setActiveTab("volunteer");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  
  // Donate States
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState("");
  const activeAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  // Volunteer States
  const [vForm, setVForm] = useState({ name: "", email: "", phone: "", availability: "" });
  const [vSubmitted, setVSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vForm),
      });
      
      if (res.ok) {
        setVSubmitted(true);
        setTimeout(() => {
          setVSubmitted(false);
          setVForm({ name: "", email: "", phone: "", availability: "" });
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "donate", label: "One-time Donation", icon: IndianRupee },
    { id: "volunteer", label: "Join as Volunteer", icon: Users },
  ];

  return (
    <section id="volunteer" className="py-16 relative overflow-hidden bg-white">
      <div id="donate" className="absolute top-0 left-0 w-0 h-0 invisible" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 pointer-events-none" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="section-badge bg-emerald-50 text-emerald-600">Take Action</span>
          <h2 className="section-title mt-6">How You Can <span className="text-emerald-600 italic">Help</span></h2>
          <p className="section-subtitle mt-4">Choose the way you want to make an impact today. Every contribution matters.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 p-1.5 bg-slate-100 rounded-2xl w-fit mx-auto border border-slate-200 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-emerald-600 shadow-md ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-emerald-500" : ""}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 md:p-10 min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === "donate" && (
                <motion.div
                  key="donate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="text-center md:text-left max-w-2xl">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Help Us Fund Our Missions</h3>
                    <p className="text-slate-500">Pick an amount or enter your own to see exactly how your donation changes lives.</p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {amounts.map((amt) => {
                      const isSelected = selectedAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                          className={`py-4 rounded-2xl font-black text-sm transition-all border ${
                            isSelected
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200"
                              : "bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:text-emerald-600"
                          }`}
                        >
                          ₹{amt.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full pl-11 pr-4 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                    />
                  </div>

                  <button className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all">
                    Complete Donation
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                    {transparency.map((item) => (
                      <div key={item.label} className="flex flex-col items-center text-center p-4">
                        <item.icon className="w-6 h-6 text-emerald-500 mb-2" />
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">{item.label}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "volunteer" && (
                <motion.div
                  key="volunteer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid lg:grid-cols-2 gap-10"
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900">Be Part of the Team</h3>
                    <p className="text-slate-500 leading-relaxed">Join hundreds of compassionate hearts making a difference every single day through field work, social media, and professional skills.</p>
                    
                    <div className="space-y-3">
                      {[
                        { icon: MapPin, text: "Field work & Rescue missions" },
                        { icon: Megaphone, text: "Awareness & Content creation" },
                        { icon: Briefcase, text: "Professional & Skills-based" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                          <item.icon className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-slate-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleVSubmit} className="space-y-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={vForm.name}
                      onChange={(e) => setVForm({...vForm, name: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={vForm.email}
                      onChange={(e) => setVForm({...vForm, email: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={vForm.phone}
                      onChange={(e) => setVForm({...vForm, phone: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <select
                      required
                      value={vForm.availability}
                      onChange={(e) => setVForm({...vForm, availability: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="">Availability</option>
                      <option value="weekends">Weekends</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    <button 
                      type="submit"
                      disabled={vSubmitted}
                      className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                    >
                      {vSubmitted ? <><CheckCircle className="w-4 h-4" /> Joined!</> : <><Send className="w-4 h-4" /> Submit Request</>}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionCenter;
