import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, CalendarDays, Users, Sparkles, Camera, Heart } from "lucide-react";

import galleryOrphanage from "@/assets/gallery-orphanage.jpg";
import galleryEducation from "@/assets/gallery-education.jpg";
import galleryHealth from "@/assets/gallery-health.jpg";
import galleryEnvironment from "@/assets/gallery-environment.jpg";
import galleryWater from "@/assets/gallery-water.jpg";
import galleryWomen from "@/assets/gallery-women.jpg";
import galleryRelief from "@/assets/gallery-relief.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import campaignAnimals from "@/assets/campaign-animals.png";
import campaignTrees from "@/assets/campaign-trees.png";
import campaignFood from "@/assets/campaign-food.png";

interface GalleryEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  impact: string;
  category: string;
  story?: string;
}

const events: GalleryEvent[] = [
  { id: "1", title: "Stray Animal Rescue Drive", description: "Rescued and treated 120 stray animals in a massive city-wide rescue drive.", image: campaignAnimals, date: "Feb 2025", location: "Bangalore", impact: "120 animals rescued", category: "rescues", story: "What started as a distress call about 3 injured puppies turned into the largest animal rescue drive in Bangalore's history. Our team of 40 volunteers and 5 vets worked around the clock for 72 hours. Every animal received medical treatment, vaccinations, and is now in a safe shelter awaiting adoption." },
  { id: "2", title: "Community Education Drive", description: "Free tutoring sessions for 500+ children across rural schools.", image: galleryEducation, date: "March 2025", location: "Rural Karnataka", impact: "500+ children educated", category: "events", story: "We discovered that in some remote villages, children had never held a textbook. Our education drive brought volunteer teachers, learning materials, and hope. 12 children from this batch scored district-top marks within a year." },
  { id: "3", title: "Orphanage Visit & Support", description: "Provided food, clothing, and emotional support to orphanages.", image: galleryOrphanage, date: "Jan 2025", location: "Bangalore", impact: "200 children supported", category: "events" },
  { id: "4", title: "Green Earth Plantation", description: "Massive tree plantation drive with 300 volunteers planting 5000+ saplings.", image: campaignTrees, date: "June 2025", location: "Western Ghats", impact: "5,000+ saplings planted", category: "plantations" },
  { id: "5", title: "Food Distribution Drive", description: "Served hot meals to 1,000 underprivileged families in flood-affected areas.", image: campaignFood, date: "Aug 2025", location: "Assam", impact: "1,000 families fed", category: "drives" },
  { id: "6", title: "Rural Health Camp", description: "Free health check-ups, medicines, and awareness sessions.", image: galleryHealth, date: "Nov 2024", location: "Tamil Nadu", impact: "1,200 patients treated", category: "events" },
  { id: "7", title: "Clean Water Initiative", description: "Installed purification systems in 15 villages.", image: galleryWater, date: "Aug 2024", location: "Rajasthan", impact: "3,000 families served", category: "drives" },
  { id: "8", title: "Women Empowerment Workshop", description: "Skill development in tailoring, handicrafts, and entrepreneurship.", image: galleryWomen, date: "Apr 2024", location: "Maharashtra", impact: "150 women trained", category: "events" },
  { id: "9", title: "Flood Relief Operations", description: "Emergency relief with food, shelter, and medical supplies.", image: galleryRelief, date: "Sep 2023", location: "Assam", impact: "800 families supported", category: "drives" },
  { id: "10", title: "Animal Shelter Setup", description: "Established a permanent shelter for rescued stray animals.", image: campaignAnimals, date: "Dec 2024", location: "Bangalore", impact: "Permanent shelter created", category: "rescues" },
  { id: "11", title: "Community Development", description: "Multi-day community event for infrastructure development.", image: heroBg, date: "Dec 2023", location: "Kerala", impact: "2 schools renovated", category: "events" },
  { id: "12", title: "Environment Awareness", description: "Awareness campaign on climate change and sustainability.", image: galleryEnvironment, date: "Mar 2024", location: "Multiple cities", impact: "10,000+ people reached", category: "plantations" },
];

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

  const filteredEvents = activeCategory === "all" ? events : events.filter((e) => e.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-emerald-50/20" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-badge">
            <Camera className="w-4 h-4" />
            Gallery
          </span>
          <h2 className="section-title mt-5">
            Compassion{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
              in Action
            </span>
          </h2>
          <p className="section-subtitle mt-5">Moments that matter — captured from the field, the shelters, and the communities we serve.</p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                cat.key === activeCategory
                  ? "text-white shadow-md"
                  : "text-muted-foreground bg-muted hover:text-foreground"
              }`}
              style={
                cat.key === activeCategory
                  ? { background: "linear-gradient(135deg, #2D8B6F, #25765E)" }
                  : undefined
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filteredEvents.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedEvent(e)}
                className="gallery-card rounded-2xl overflow-hidden cursor-pointer group"
                whileHover={{ y: -6 }}
              >
                <div className="relative overflow-hidden h-48">
                  <img src={e.image} alt={e.title} loading="lazy" width={600} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Impact overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-end pb-4">
                    <span className="text-white font-bold text-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {e.impact}
                    </span>
                    <span className="text-white/70 text-xs mt-1">Click to read story →</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-md bg-white/15 border border-white/20">
                    {e.date}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{e.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-primary">{e.impact}</span>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border"
              >
                <div className="relative">
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover rounded-t-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-3xl" />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <h3 className="absolute bottom-4 left-6 font-display text-2xl font-bold text-white">{selectedEvent.title}</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {selectedEvent.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedEvent.location}</span>
                  </div>
                  <p className="mt-4 text-foreground leading-relaxed">{selectedEvent.description}</p>

                  {/* Emotional story popup content */}
                  {selectedEvent.story && (
                    <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200/50 dark:border-amber-500/15">
                      <p className="text-sm text-foreground/80 italic leading-relaxed">"{selectedEvent.story}"</p>
                    </div>
                  )}

                  <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <h4 className="font-semibold text-primary flex items-center gap-2"><Users className="w-5 h-5" /> Impact</h4>
                    <p className="text-foreground mt-1">{selectedEvent.impact}</p>
                  </div>

                  {/* Story CTA */}
                  <motion.a
                    href="#donate"
                    onClick={() => setSelectedEvent(null)}
                    className="mt-5 w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #E8553A, #D4432E)" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="w-4 h-4" /> Help More Stories Like This
                  </motion.a>
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
