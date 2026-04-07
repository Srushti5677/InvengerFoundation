import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Quote } from "lucide-react";
import storySchool from "@/assets/story-school.png";
import campaignAnimals from "@/assets/campaign-animals.png";
import galleryWomen from "@/assets/gallery-women.jpg";
import galleryWater from "@/assets/gallery-water.jpg";

const stories = [
  {
    title: "From Streets to Safety",
    subtitle: "Animal Rescue Story",
    image: campaignAnimals,
    beforeText: "Dozens of stray dogs were injured, starving, and left to suffer on the streets of Bangalore.",
    afterText: "Today, 200+ rescues later, these animals have been treated, rehabilitated, and many found loving forever homes.",
    quote: "Seeing a dog wag its tail after weeks of pain gives me the strength to keep going.",
    quotePerson: "Dr. Meera, Veterinary Volunteer",
    color: "#E8553A",
  },
  {
    title: "A Classroom Full of Dreams",
    subtitle: "Education Success Story",
    image: storySchool,
    beforeText: "40 children in a remote Karnataka village had no access to education or school supplies.",
    afterText: "A fully renovated classroom, new books, and dedicated tutors now serve these children. 12 have already topped their district exams.",
    quote: "I never thought I could read a book. Now I want to become a teacher.",
    quotePerson: "Priya, Age 11, Student",
    color: "#3B7DD8",
  },
  {
    title: "Water of Life",
    subtitle: "Clean Water Initiative",
    image: galleryWater,
    beforeText: "15 villages in Rajasthan relied on contaminated water sources, leading to widespread disease.",
    afterText: "Water purification systems now serve 3,000+ families with clean, safe drinking water. Waterborne diseases dropped by 80%.",
    quote: "My children don't fall sick every month anymore. This is a miracle for us.",
    quotePerson: "Kamala Devi, Village Resident",
    color: "#2D8B6F",
  },
  {
    title: "She Earns, She Leads",
    subtitle: "Women Empowerment",
    image: galleryWomen,
    beforeText: "150 women in rural Maharashtra had no income and depended entirely on others for survival.",
    afterText: "After our skill development workshops, they now run their own tailoring businesses and earn independently.",
    quote: "I never imagined I could support my family. Now I'm training other women too.",
    quotePerson: "Fatima Begum, Workshop Graduate",
    color: "#8B5CF6",
  },
];

const SuccessStoriesSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % stories.length);
  const prev = () => setCurrent((c) => (c - 1 + stories.length) % stories.length);

  const story = stories[current];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-50/20 to-background" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge">
            <Sparkles className="w-4 h-4" />
            Success Stories
          </span>
          <h2 className="section-title mt-5">
            Real Lives,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
              Real Impact
            </span>
          </h2>
          <p className="section-subtitle mt-5">
            Behind every number is a story of hope, resilience, and transformation.
            These are the stories that keep us going.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden group">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-[350px] object-cover rounded-2xl"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <div className="absolute bottom-5 left-5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: story.color }}
                  >
                    {story.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">{story.title}</h3>

                {/* Before/After */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-500 font-bold text-xs">B</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Before</p>
                      <p className="text-foreground/80 leading-relaxed">{story.beforeText}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-600 font-bold text-xs">A</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-1">After</p>
                      <p className="text-foreground leading-relaxed font-medium">{story.afterText}</p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <Quote className="w-6 h-6 text-primary/30 mb-2" />
                  <p className="text-foreground italic leading-relaxed">"{story.quote}"</p>
                  <p className="text-primary text-sm font-semibold mt-2">— {story.quotePerson}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div className="flex items-center gap-3">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-10 h-3 bg-primary"
                      : "w-3 h-3 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
