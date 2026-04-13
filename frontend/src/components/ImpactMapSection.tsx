import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapItem {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
}

const ImpactMapSection = () => {
  const [items, setItems] = useState<MapItem[]>([]);
  const [selected, setSelected] = useState<MapItem | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gallery");
        const data = await res.json();
        // Only items with coordinates
        setItems(data.filter((i: any) => i.lat && i.lng));
      } catch (err) {
        console.error("Map load fail", err);
      }
    };
    fetchLocations();
  }, []);

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden min-h-[700px]">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      
      <div className="relative container mx-auto px-4 mb-16 z-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase border border-blue-500/20">
            <MapPin className="w-3.5 h-3.5" />
            Global Presence
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-6 tracking-tight">
            Tracing Our <span className="text-[#D4A017] italic">Footsteps</span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg leading-relaxed max-w-xl">
            From remote villages to bustling cities, our missions are grounded in real locations. 
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto container h-[500px] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl bg-black">
        <MapContainer 
          key="impact-map-container"
          center={[12.9716, 77.5946]} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {items.length > 0 && items.map((item) => (
            <Marker 
              key={`marker-${item.id}`} 
              position={[item.lat, item.lng]}
              eventHandlers={{
                click: () => setSelected(item),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[150px]">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-500">{item.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <AnimatePresence>
          {selected && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-6 right-6 w-72 bg-white shadow-2xl rounded-[32px] p-4 z-[500] border border-slate-100"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-3">
                <img src={selected.imageUrl} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{selected.title}</h3>
              <p className="text-[10px] text-slate-500 mb-3">{selected.location}</p>
              <button className="w-full py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#D4A017] transition-colors">
                Deep Dive →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ImpactMapSection;
