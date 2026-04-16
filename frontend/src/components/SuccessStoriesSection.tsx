import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, Quote, ImageOff } from "lucide-react";
import { resolveMediaURL } from "@/utils/media";

interface Story {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  beforeText: string;
  afterText: string;
  quote: string;
  quotePerson: string;
  color: string;
}

const SuccessStoriesSection = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stories");
        const data = await res.json();
        if (Array.isArray(data)) setStories(data);
      } catch (err) {
        console.error("Story load fail", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const next = () => setStories(s => s.length ? (setCurrent((c) => (c + 1) % s.length) as any) : 0);
  const prev = () => setStories(s => s.length ? (setCurrent((c) => (c - 1 + s.length) % s.length) as any) : 0);

  const story = stories[current];

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wider uppercase border border-emerald-100">
            <Sparkles className="w-3.5 h-3.5" />
            Impact Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-6 tracking-tight">
            Real Lives, <span className="text-emerald-600 italic">Real Impact</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 mt-6 text-lg leading-relaxed">
            Behind every number is a story of hope, resilience, and transformation.
            These are the moments that drive our mission forward.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
          </div>
        ) : stories.length === 0 ? (
          <div className="max-w-3xl mx-auto py-20 text-center bg-slate-50 rounded-[40px] border border-slate-100">
            <ImageOff className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="italic text-slate-400">Our success stories are being updated. Check back soon for new impact reports.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="grid lg:grid-cols-2 gap-12 items-center bg-white p-8 lg:p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50"
              >
                {/* Image */}
                <div className="relative rounded-[32px] overflow-hidden group aspect-[4/3] lg:aspect-auto lg:h-[450px]">
                  <img
                    src={resolveMediaURL(story.imageUrl)}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span
                      className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md shadow-lg"
                      style={{ backgroundColor: story.color || "#059669" }}
                    >
                      {story.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col h-full justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 tracking-tight">{story.title}</h3>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-400 font-black text-xs">B</div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">The Challenge</p>
                        <p className="text-slate-500 leading-relaxed text-sm lg:text-base">{story.beforeText}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100 text-emerald-600 font-black text-xs shadow-sm">A</div>
                      <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">The Outcome</p>
                        <p className="text-slate-900 font-medium leading-relaxed text-sm lg:text-base">{story.afterText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 relative">
                    <Quote className="w-8 h-8 text-emerald-200 absolute -top-4 -left-2 fill-emerald-50" />
                    <p className="text-slate-700 italic leading-relaxed text-lg font-medium">"{story.quote}"</p>
                    <div className="flex items-center gap-3 mt-6">
                      <div className="h-px w-8 bg-emerald-200" />
                      <p className="text-emerald-700 text-xs font-black uppercase tracking-widest">{story.quotePerson}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-8 mt-12">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-900"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <div className="flex items-center gap-4">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
                      i === current
                        ? "w-12 bg-emerald-600"
                        : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-900"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
