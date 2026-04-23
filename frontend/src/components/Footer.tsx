import { motion } from "framer-motion";
import { ArrowUpRight, PawPrint, TreePine, Baby, Utensils, Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import invengerLogo from "@/assets/invenger logo.jpg";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com", hoverColor: "#1877F2" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", hoverColor: "#E4405F" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", hoverColor: "#1DA1F2" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", hoverColor: "#0A66C2" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com", hoverColor: "#FF0000" },
];

const Footer = () => (
  <footer id="contact" className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0f2922 0%, #091a15 100%)" }}>
    {/* Decorative gradient line */}
    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

    {/* Emotional CTA banner */}
    {/* Main footer content */}
    <div className="container mx-auto px-4 pt-12 pb-10">

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
              { icon: PawPrint, label: "Animal Care", href: "#causes" },
              { icon: TreePine, label: "Elder Care", href: "#causes" },
              { icon: Baby, label: "Child Support", href: "#causes" },
              { icon: Utensils, label: "Food Relief", href: "#causes" },
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
          <h4 className="font-display font-bold text-white mb-5">Quick Links</h4>
          <div className="space-y-3">
            {["Donate", "Volunteer", "Sponsor a Life", "Gallery"].map((l) => (
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
          <h4 className="font-display font-bold text-white mb-5">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-white/40 text-sm">Invenger Tower's Ware House Road, Ballalbagh, Lalbagh, Mangaluru, Karnataka - 575 003</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-white/40 text-sm">805-416-1971</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-white/40 text-sm">info@invengerfoundation.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Invenger Foundation. All rights reserved.
        </p>
        <p className="text-xs text-white/20">Committed to building a better world</p>
      </div>
    </div>
  </footer>
);

export default Footer;
