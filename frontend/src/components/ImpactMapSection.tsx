import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MapPin, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons in Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const ImpactMapSection = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then(res => res.json())
      .then(data => setItems(data.filter((i: any) => i.lat && i.lng)))
      .catch(e => console.error(e));
  }, []);

  return (
    <section className="py-24 bg-slate-900 overflow-hidden min-h-[600px]">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl font-black text-white">Global Presence</h2>
      </div>

      <div className="container mx-auto h-[500px] rounded-3xl overflow-hidden border border-white/10">
        <MapContainer 
          center={[12.9716, 77.5946]} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {items.map((item) => (
            <Marker 
              key={item.id} 
              position={[item.lat, item.lng]}
              eventHandlers={{ click: () => setSelected(item) }}
            >
              <Popup>
                <div className="p-2">
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default ImpactMapSection;
