import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Megaphone, HandHeart, Briefcase, Heart, CheckCircle, Send } from "lucide-react";

const roles = [
  { icon: MapPin, title: "Field Work", description: "Join rescue missions, tree planting drives, and food distribution on the ground.", color: "#2D8B6F" },
  { icon: Megaphone, title: "Social Media", description: "Spread awareness, create content, and amplify our stories across platforms.", color: "#3B7DD8" },
  { icon: HandHeart, title: "Fundraising", description: "Help organize events, campaigns, and donor outreach to fuel our missions.", color: "#E8553A" },
  { icon: Briefcase, title: "Skills-Based", description: "Contribute your professional skills — design, legal, medical, tech, and more.", color: "#8B5CF6" },
];

const VolunteerSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", skills: "", availability: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", skills: "", availability: "", message: "" });
    }, 4000);
  };

  return (
    <section id="volunteer" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-50/20 to-background" />
      <div className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge">
            <Heart className="w-4 h-4" />
            Join Our Team
          </span>
          <h2 className="section-title mt-5">
            Be the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              Change
            </span>{" "}
            You Want to See
          </h2>
          <p className="section-subtitle mt-5">
            Volunteering isn't just giving time — it's gaining purpose. Join hundreds
            of compassionate hearts who are making a difference every single day.
          </p>
        </motion.div>

        {/* Volunteer Roles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="volunteer-role-card rounded-2xl p-6 text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: role.color + "12", color: role.color }}
              >
                <role.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{role.title}</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{role.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Volunteer Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="font-display text-2xl font-bold text-foreground">
              Ready to <span className="text-primary">Volunteer</span>?
            </h3>
            <p className="text-muted-foreground mt-2">Fill in your details and we'll connect you with the right role.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="contact-form-card rounded-3xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <input
                  type="tel"
                  maxLength={15}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Availability</label>
                <select
                  value={form.availability}
                  onChange={(e) => setForm({ ...form, availability: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="">Select availability</option>
                  <option value="weekends">Weekends only</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="flexible">Flexible</option>
                  <option value="fulltime">Full-time</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Skills & Interests</label>
              <input
                type="text"
                maxLength={200}
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="e.g., Photography, Teaching, Fundraising, Medical"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Why do you want to volunteer?</label>
              <textarea
                maxLength={500}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-border bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                placeholder="Tell us what motivates you..."
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #2D8B6F, #25765E)" }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(45,139,111,0.3)" }}
              whileTap={{ scale: 0.98 }}
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Thank you! We'll be in touch.
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Join as Volunteer
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
