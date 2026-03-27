import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CalendarDays, Users } from "lucide-react";

import galleryOrphanage from "@/assets/gallery-orphanage.jpg";
import galleryEducation from "@/assets/gallery-education.jpg";
import galleryHealth from "@/assets/gallery-health.jpg";
import galleryEnvironment from "@/assets/gallery-environment.jpg";
import galleryWater from "@/assets/gallery-water.jpg";
import galleryWomen from "@/assets/gallery-women.jpg";
import galleryRelief from "@/assets/gallery-relief.jpg";
import heroBg from "@/assets/hero-bg.jpg";

interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  impact: string;
  year: number;
  recent?: boolean;
}

const events: GalleryEvent[] = [
  {
    id: "1", title: "Community Education Drive", description: "Organized free tutoring sessions for 500+ children across rural schools, providing books, stationery, and mentorship from professional educators.", image: galleryEducation, date: "March 2025", location: "Rural Karnataka", impact: "500+ children educated", year: 2025, recent: true,
  },
  {
    id: "2", title: "Orphanage Visit & Support", description: "Visited multiple orphanages providing food, clothing, and emotional support. Organized recreational activities and career guidance sessions.", image: galleryOrphanage, date: "January 2025", location: "Bangalore", impact: "Donated food to 200 children", year: 2025, recent: true,
  },
  {
    id: "3", title: "Green Earth Tree Plantation", description: "Massive tree plantation drive involving 300 volunteers planting 5000+ saplings across deforested areas to combat climate change.", image: galleryEnvironment, date: "June 2025", location: "Western Ghats", impact: "5,000+ saplings planted", year: 2025, recent: true,
  },
  {
    id: "4", title: "Rural Health Camp", description: "Free health camp providing check-ups, medicines, and health awareness sessions to underserved rural communities.", image: galleryHealth, date: "November 2024", location: "Tamil Nadu", impact: "1,200 patients treated", year: 2024,
  },
  {
    id: "5", title: "Clean Water Initiative", description: "Installed water purification systems in 15 villages, ensuring clean drinking water access for thousands of families.", image: galleryWater, date: "August 2024", location: "Rajasthan", impact: "3,000 families served", year: 2024,
  },
  {
    id: "6", title: "Women Empowerment Workshop", description: "Skill development workshops teaching tailoring, handicrafts, and entrepreneurship to empower women toward financial independence.", image: galleryWomen, date: "April 2024", location: "Maharashtra", impact: "150 women trained", year: 2024,
  },
  {
    id: "7", title: "Flood Relief Distribution", description: "Emergency relief operations providing food, shelter materials, and medical supplies to flood-affected communities.", image: galleryRelief, date: "September 2023", location: "Assam", impact: "800 families supported", year: 2023,
  },
  {
    id: "8", title: "Community Building Drive", description: "Multi-day community development event bringing together volunteers from across the country for skill-sharing and infrastructure development.", image: heroBg, date: "December 2023", location: "Kerala", impact: "2 schools renovated", year: 2023,
  },
];

const years = [2025, 2024, 2023];

const GallerySection = () => {
  const [tab, setTab] = useState<"recent" | "yearwise">("recent");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);

  const filteredEvents = tab === "recent" ? events.filter((e) => e.recent) : events.filter((e) => e.year === selectedYear);

  return (
    <section id="gallery" className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Gallery</span>
          <h2 className="section-title mt-3">Our Work in Action</h2>
          <p className="section-subtitle mt-4">Explore our events, activities, and the communities we've touched.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {(["recent", "yearwise"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={t === tab ? "year-btn-active" : "year-btn"}
            >
              {t === "recent" ? "Recent Activities" : "Year-wise Highlights"}
            </button>
          ))}
        </div>

        {/* Year pills */}
        {tab === "yearwise" && (
          <div className="flex justify-center gap-3 mb-10">
            {years.map((y) => (
              <button key={y} onClick={() => setSelectedYear(y)} className={y === selectedYear ? "year-btn-active" : "year-btn"}>
                {y}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab + selectedYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedEvent(e)}
                className="glass-card-hover rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className="relative overflow-hidden h-52">
                  <img src={e.image} alt={e.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold glass-card text-foreground">{e.date}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{e.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{e.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-primary text-sm font-medium">
                    <Users className="w-4 h-4" /> {e.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="relative">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover rounded-t-2xl" />
                  <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-lg hover:bg-muted transition-colors">
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold text-foreground">{selectedEvent.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {selectedEvent.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedEvent.location}</span>
                  </div>
                  <p className="mt-4 text-foreground leading-relaxed">{selectedEvent.description}</p>
                  <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <h4 className="font-semibold text-primary flex items-center gap-2"><Users className="w-5 h-5" /> Impact Summary</h4>
                    <p className="text-foreground mt-1">{selectedEvent.impact}</p>
                  </div>
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
