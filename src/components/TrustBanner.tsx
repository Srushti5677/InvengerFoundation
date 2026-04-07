import { ShieldCheck, Heart, Award } from "lucide-react";

const TrustBanner = () => (
  <div className="trust-banner py-4 overflow-hidden relative">
    <div className="marquee-track relative">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-12 mx-8">
          <span className="flex items-center gap-2 text-sm font-medium text-white/80 whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Transparent — Every donation tracked and reported
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-white/80 whitespace-nowrap">
            <Heart className="w-4 h-4 text-red-400" />
            2,800+ animals rescued and rehabilitated
          </span>
          <span className="flex items-center gap-2 text-sm font-medium text-white/80 whitespace-nowrap">
            <Award className="w-4 h-4 text-amber-400" />
            80G Tax Exemption Certified
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBanner;
