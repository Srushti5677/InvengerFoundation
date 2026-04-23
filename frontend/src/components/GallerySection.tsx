import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Camera, MapPin } from "lucide-react";
import { resolveMediaURL } from "@/utils/media";

const GallerySection = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gallery");
        const data = await res.json();
        if (Array.isArray(data)) {
          setGallery(data.map(item => ({
            ...item,
            src: resolveMediaURL(item.imageUrl)
          })));
        }
      } catch (err) {
        console.error("Gallery load fail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading || gallery.length === 0) return null;

  const categories = ["All", ...new Set(gallery.map(img => img.category))];
  const filteredImages = filter === "All" ? gallery : gallery.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-40 -left-64 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Camera className="w-3.5 h-3.5" />
            Visual Journey
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Moments of <span className="text-emerald-600 italic">Change</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A glimpse into the lives we touch and the transformation we build together across India.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative group cursor-pointer break-inside-avoid rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-slate-100"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{img.location}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">{img.title}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-white/60 text-xs font-medium">{img.category}</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded-3xl shadow-2xl overflow-hidden shadow-emerald-500/10"
              />
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pointer-events-none">
                <div>
                  <div className="flex items-center gap-3 text-emerald-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{selectedImage.location}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">{selectedImage.title}</h3>
                </div>
                <div className="flex flex-col items-start lg:items-end">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-500/30">
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
