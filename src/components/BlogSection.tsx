import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import galleryEnvironment from "@/assets/gallery-environment.jpg";
import galleryWomen from "@/assets/gallery-women.jpg";
import galleryWater from "@/assets/gallery-water.jpg";

const posts = [
  { title: "How Tree Plantation Drives Are Changing Rural India", excerpt: "Our latest plantation drive saw 300 volunteers plant over 5,000 saplings in the Western Ghats.", image: galleryEnvironment, date: "June 15, 2025", readTime: "5 min read" },
  { title: "Empowering Women Through Skill Development", excerpt: "150 women completed our tailoring workshop and are now earning independently.", image: galleryWomen, date: "April 8, 2025", readTime: "4 min read" },
  { title: "Clean Water for 3,000 Families in Rajasthan", excerpt: "Our clean water initiative installed purification systems across 15 villages.", image: galleryWater, date: "Aug 20, 2024", readTime: "6 min read" },
];

const BlogSection = () => (
  <section id="blog" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Blog & Updates</span>
        <h2 className="section-title mt-3">Latest From the Field</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.article key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer">
            <div className="overflow-hidden h-48">
              <img src={p.image} alt={p.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>{p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readTime}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{p.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
