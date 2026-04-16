import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, PawPrint, Send, CheckCircle } from "lucide-react";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 mb-2"
            >
              <motion.a
                href="#donate"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-xl"
                style={{ background: "linear-gradient(135deg, #E8553A, #D4432E)" }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Donate Now
              </motion.a>

              <motion.button
                onClick={() => { setShowForm(true); setIsOpen(false); }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-xl"
                style={{ background: "linear-gradient(135deg, #3B7DD8, #2D6BC4)" }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <PawPrint className="w-4 h-4" /> Report a Case
              </motion.button>

              <motion.a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-xl"
                style={{ background: "linear-gradient(135deg, #2D8B6F, #25765E)" }}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4" /> Call Helpline
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl relative"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #666, #555)"
              : "linear-gradient(135deg, #E8553A, #D4432E)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={!isOpen ? { boxShadow: ["0 0 0 0 rgba(232,85,58,0.4)", "0 0 0 14px rgba(232,85,58,0)", "0 0 0 0 rgba(232,85,58,0.4)"] } : {}}
          transition={!isOpen ? { duration: 2, repeat: Infinity } : {}}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Send className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Report Case Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl max-w-md w-full p-8 shadow-2xl border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <PawPrint className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">Report a Case</h3>
                    <p className="text-xs text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="">Type of case</option>
                  <option>Injured animal</option>
                  <option>Abandoned animal</option>
                  <option>Child in distress</option>
                  <option>Environmental issue</option>
                  <option>Other emergency</option>
                </select>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the situation & location..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
                <motion.button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #3B7DD8, #2D6BC4)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitted ? (
                    <><CheckCircle className="w-4 h-4" /> Report Submitted!</>
                  ) : (
                    <><Send className="w-4 h-4" /> Submit Report</>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActionButton;
