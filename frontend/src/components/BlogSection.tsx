import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Newspaper } from "lucide-react";
import galleryEnvironment from "@/assets/gallery-environment.jpg";
import galleryWomen from "@/assets/gallery-women.jpg";
import galleryWater from "@/assets/gallery-water.jpg";
import campaignAnimals from "@/assets/campaign-animals.png";
import campaignFood from "@/assets/campaign-food.png";
import storySchool from "@/assets/story-school.png";

const posts = [
  { title: "How Tree Plantation Drives Are Changing Rural India", excerpt: "Our latest drive saw 300 volunteers plant over 5,000 saplings in the Western Ghats, restoring biodiversity and hope.", image: galleryEnvironment, date: "June 15, 2025", readTime: "5 min", tag: "Environment", color: "#2D8B6F" },
  { title: "Empowering Women Through Skill Development", excerpt: "150 women completed our tailoring workshop and are now earning independently. Their stories will inspire you.", image: galleryWomen, date: "April 8, 2025", readTime: "4 min", tag: "Empowerment", color: "#8B5CF6" },
  { title: "A Day in the Life of an Animal Rescuer", excerpt: "Follow Dr. Kavitha as she rescues, treats, and rehabilitates stray animals across Bangalore's busiest streets.", image: campaignAnimals, date: "March 22, 2025", readTime: "7 min", tag: "Animals", color: "#E8553A" },
  { title: "Clean Water Transforms 15 Villages", excerpt: "Our clean water initiative installed purification systems that reduced waterborne diseases by 80%.", image: galleryWater, date: "Aug 20, 2024", readTime: "6 min", tag: "Health", color: "#3B7DD8" },
  { title: "From Hunger to Hope: Our Food Drive Story", excerpt: "We served 10,000 meals during the monsoon floods. Here's how every plate made a difference.", image: campaignFood, date: "Sep 5, 2024", readTime: "5 min", tag: "Food", color: "#D4932A" },
  { title: "Education is Freedom: A Rural School Story", excerpt: "How a single classroom renovation transformed the educational outcomes of an entire village.", image: storySchool, date: "Jan 12, 2025", readTime: "6 min", tag: "Education", color: "#06B6D4" },
];

const BlogSection = () => (
  <section id="blog" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background to-blue-50/20" />

    <div className="relative container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-badge">
          <Newspaper className="w-4 h-4" />
          Blog & Updates
        </span>
        <h2 className="section-title mt-5">
          Stories From{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-500">
            the Heart
          </span>
        </h2>
        <p className="section-subtitle mt-5">Updates, awareness posts, and heartfelt stories from the ground.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="blog-card rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="overflow-hidden h-48 relative">
              <img src={p.image} alt={p.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: p.color }}
              >
                {p.tag}
              </div>
              <motion.div
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>{p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
              </div>
              <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{p.title}</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">{p.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
