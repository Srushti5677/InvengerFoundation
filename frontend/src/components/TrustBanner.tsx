import { Ambulance, Utensils, Ear, Monitor, Award, Building2 } from "lucide-react";

const items = [
  { icon: Building2, text: "Registered NGO — Government Recognised", color: "text-emerald-400" },
  { icon: Ambulance, text: "Donated Ambulance to Community Health Centre", color: "text-red-400" },
  { icon: Utensils, text: "Meals Served to the Needy", color: "text-orange-400" },
  { icon: Building2, text: "Daily Necessities Supplied to Orphanages", color: "text-pink-400" },
  { icon: Ear, text: "Hearing Aids Provided to Differently-Abled", color: "text-sky-400" },
  { icon: Monitor, text: "Computers Donated to Police Stations", color: "text-violet-400" },
  { icon: Award, text: "100% Transparent — Every Donation Tracked", color: "text-emerald-400" },
];

const TrustBanner = () => (
  <div className="trust-banner py-4 overflow-hidden relative">
    <div className="marquee-track relative">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 flex items-center gap-14 mx-10">
          {items.map((item) => (
            <span
              key={item.text}
              className="flex items-center gap-2 text-sm font-medium text-white/85 whitespace-nowrap"
            >
              <item.icon className={`w-4 h-4 shrink-0 ${item.color}`} />
              {item.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TrustBanner;
