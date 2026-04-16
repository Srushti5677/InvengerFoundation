import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, MapPin } from "lucide-react";
import { resolveMediaURL } from "@/utils/media";

interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  mainImage: string;
  impact: string;
  location: string;
  category: string;
  isFeatured: boolean;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Projects load fail", err);
      }
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest uppercase border border-blue-100">
              <BookOpen className="w-3.5 h-3.5" />
              Featured Deep Dives
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 tracking-tight italic">
              Major <span className="text-blue-600">Missions</span>
            </h2>
            <p className="text-slate-500 mt-6 text-lg">
              Explore our most extensive projects through immersive case studies that detail the "how" and "why" of our mission.
            </p>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            Browse All Records
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[48px] p-8 border border-white shadow-2xl shadow-slate-200/50 group flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-8 shadow-xl">
                 <img src={resolveMediaURL(p.mainImage)} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-lg">
                      {p.category}
                    </span>
                    {p.isFeatured && (
                      <span className="px-3 py-1 bg-amber-400 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                        ★ TOP IMPACT
                      </span>
                    )}
                 </div>
              </div>

              <div className="flex-1 px-2">
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {p.location}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 12 MIN READ</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                  {p.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-lg mb-8 line-clamp-3">
                  {p.summary}
                </p>

                <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 mb-8">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Yield</p>
                   <p className="text-xl font-bold text-slate-800 italic">"{p.impact}"</p>
                </div>
              </div>

              <button className="w-full py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-[20px] shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group-hover:gap-4">
                 Open Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
