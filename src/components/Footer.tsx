import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="font-display text-lg font-bold text-primary-foreground">Invenger Foundation</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">Empowering lives through action, compassion, and community development since 2020.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
          <div className="space-y-2">
            {["About Us", "Our Impact", "Gallery", "Blog"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "")}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4">Get Involved</h4>
          <div className="space-y-2">
            {["Donate", "Volunteer", "Partner With Us", "Contact"].map((l) => (
              <a key={l} href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4">Follow Us</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
      <div className="border-t border-muted-foreground/20 pt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Invenger Foundation. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
