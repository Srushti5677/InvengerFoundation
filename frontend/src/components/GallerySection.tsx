import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CalendarDays, Users, Sparkles, Camera, Heart, ImageOff } from "lucide-react";

interface GalleryEvent {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  date?: string;
  location?: string;
  impact?: string;
  category: string;
}

const categories = [
  { key: "all", label: "All" },
  { key: "events", label: "Events" },
  { key: "rescues", label: "Rescues" },
  { key: "plantations", label: "Plantations" },
  { key: "drives", label: "Drives" },
];

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [items, setItems] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gallery");
        const data = await res.json();
        if (Array.isArray(data)) setItems(data);
      } catch (err) {
        console.error("Gallery load fail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === "all" ? items : items.filter((e) => e.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50 pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider uppercase border border-emerald-100">
            <Camera className="w-3.5 h-3.5" />
            Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-6 tracking-tight">
            Compassion <span className="text-emerald-600 italic">in Action</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 mt-6 text-lg leading-relaxed">
            Moments that matter — captured from the field, the shelters, and the communities we serve.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                cat.key === activeCategory
                  ? "text-white shadow-lg"
                  : "text-slate-500 bg-white border border-slate-200 hover:border-emerald-200"
              }`}
              style={cat.key === activeCategory ? { background: "linear-gradient(135deg, #059669, #10B981)" } : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredItems.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-100 italic text-slate-400">
                  <ImageOff className="w-10 h-10 mx-auto mb-4 opacity-20" />
                  No photos in this category yet.
                </div>
              ) : (
                filteredItems.map((e, i) => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedEvent(e)}
                    className="group bg-white rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
                  >
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={e.imageUrl}
                        alt={e.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <span className="text-white text-xs font-bold tracking-widest uppercase">View Details →</span>
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-md bg-black/20 border border-white/20 uppercase tracking-widest">
                        {e.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{e.title}</h3>
                      <div className="flex items-center gap-2 mt-3 no-underline">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600 tracking-wide uppercase">{e.impact || "Community Impact"}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
              >
                <div className="relative h-80">
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5" /> {selectedEvent.date || "Recent Mission"}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {selectedEvent.location || "On-field"}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">{selectedEvent.title}</h3>
                  <p className="mt-6 text-slate-500 leading-relaxed text-sm">{selectedEvent.description || "A milestone in our journey of compassion. Every photo tells a story of change, hope, and the incredible legacy of the Invenger Foundation community."}</p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                      <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2.5">
                        <Users className="w-3.5 h-3.5" /> Impact Created
                      </h4>
                      <p className="text-slate-900 font-bold mt-2 text-sm">{selectedEvent.impact || "Community Growth"}</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
                        <Camera className="w-3.5 h-3.5" /> Mission
                      </h4>
                      <p className="text-slate-900 font-bold mt-2 text-sm uppercase tracking-tight">{selectedEvent.category}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedEvent(null)}
                    className="mt-8 w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl"
                    style={{ background: "linear-gradient(135deg, #059669, #10B981)", boxShadow: "0 8px 25px rgba(5,150,105,0.3)" }}
                  >
                    <Heart className="w-4 h-4" /> Supporting Our Work
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
