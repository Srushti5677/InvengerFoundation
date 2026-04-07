import { motion } from "framer-motion";
import { ArrowUpRight, Heart, PawPrint, TreePine, Baby, Utensils, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import invengerLogo from "@/assets/invenger logo.jpg";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", hoverColor: "#1877F2" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", hoverColor: "#E4405F" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", hoverColor: "#1DA1F2" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", hoverColor: "#0A66C2" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com", hoverColor: "#FF0000" },
];

const Footer = () => (
  <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0f2922 0%, #091a15 100%)" }}>
    {/* Decorative gradient line */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

    {/* Emotional CTA banner */}
    <div className="container mx-auto px-4 pt-16 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <Heart className="w-8 h-8 text-red-400 mx-auto mb-4 animate-heartbeat" />
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          Every Act of Kindness Matters
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          Whether you donate, volunteer, or simply share our story — you become part of a community
          that believes in a better world. Thank you for caring.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.a
            href="#donate"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #E8553A, #D4432E)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Donate Now
          </motion.a>
          <motion.a
            href="#volunteer"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white border border-white/20 hover:bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join as Volunteer
          </motion.a>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <img
              src={invengerLogo}
              alt="Invenger Foundation Logo"
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            Empowering lives through action, compassion, and community development. Every life matters.
          </p>
          <div className="flex gap-3 mt-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.15, y: -3, borderColor: social.hoverColor, color: social.hoverColor }}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-5">Our Causes</h4>
          <div className="space-y-3">
            {[
              { icon: PawPrint, label: "Animal Welfare", href: "#causes" },
              { icon: Baby, label: "Orphan Support", href: "#causes" },
              { icon: TreePine, label: "Environmental Protection", href: "#causes" },
              { icon: Utensils, label: "Food & Aid", href: "#causes" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-emerald-400 transition-colors group"
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-5">Get Involved</h4>
          <div className="space-y-3">
            {["Donate", "Volunteer", "Sponsor a Life", "Campaigns", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "")}`}
                className="flex items-center gap-1 text-sm text-white/40 hover:text-emerald-400 transition-colors group"
              >
                {l}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-5">Stay Updated</h4>
          <p className="text-white/40 text-sm mb-4">Subscribe for impact stories and updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-emerald-400/50 transition-colors"
            />
            <motion.button
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #2D8B6F, #25765E)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join
            </motion.button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Invenger Foundation. All rights reserved.
        </p>
        <p className="text-xs text-white/20 flex items-center gap-1">
          Built with <Heart className="w-3 h-3 text-red-400" fill="currentColor" /> for a better world
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
