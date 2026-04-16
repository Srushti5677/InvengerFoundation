import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ImagePlus, Video, Trash2, Edit,
  LogOut, Plus, CheckCircle, XCircle, TrendingUp, Heart, BookOpen, Users
} from "lucide-react";
import { resolveMediaURL } from "@/utils/media";

import invengerLogo from "@/assets/invenger logo.jpg";

const API = "http://localhost:5000/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"campaigns" | "gallery" | "stories" | "projects" | "volunteers" | "media">("campaigns");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "", goalAmount: "", imageUrl: "", videoUrl: "" });
  const [galleryForm, setGalleryForm] = useState({ title: "", imageUrl: "", category: "events", impact: "", date: "", lat: 12.9716, lng: 77.5946 });
  const [storyForm, setStoryForm] = useState({ title: "", subtitle: "", imageUrl: "", beforeText: "", afterText: "", quote: "", quotePerson: "", color: "#D4A017", isMilestone: false, year: new Date().getFullYear() });
  const [projectForm, setProjectForm] = useState({ title: "", summary: "", mainImage: "", impact: "", location: "", category: "", isFeatured: false, content: [] as any[] });

  const token = localStorage.getItem("adminToken");
  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async () => {
    try {
      const [cRes, gRes, sRes, pRes, vRes] = await Promise.all([
        fetch(`${API}/campaigns`),
        fetch(`${API}/gallery`),
        fetch(`${API}/stories`),
        fetch(`${API}/projects`),
        fetch(`${API}/volunteers`, { headers })
      ]);
      setCampaigns(await cRes.json());
      setGalleryItems(await gRes.json());
      setStories(await sRes.json());
      setProjects(await pRes.json());
      setVolunteers(await vRes.json());
    } catch (err) {
      console.error("Load fail", err);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, type: "campaign" | "gallery" | "story" | "project") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch(`${API}/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (!res.ok) return showToast("error", data.error);
      
      if (type === "gallery") setGalleryForm(f => ({ ...f, [field]: data.url }));
      else if (type === "story") setStoryForm(f => ({ ...f, [field]: data.url }));
      else if (type === "project") setProjectForm(f => ({ ...f, [field]: data.url }));
      else setForm(f => ({ ...f, [field]: data.url }));
      
      showToast("success", "File uploaded!");
    } catch { showToast("error", "Upload failed."); }
    finally { setUploading(false); }
  };

  const handleSaveCampaign = async () => {
    if (!form.title || !form.goalAmount) return showToast("error", "Title and goal amount are required.");
    const url = editingId ? `${API}/campaigns/${editingId}` : `${API}/campaigns`;
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers, body: JSON.stringify({ ...form, goalAmount: parseFloat(form.goalAmount) }) });
    if (res.ok) { showToast("success", "Saved!"); setShowForm(false); loadData(); }
  };

  const handleSaveGallery = async () => {
    if (!galleryForm.title || !galleryForm.imageUrl) return showToast("error", "Title and image required.");
    const res = await fetch(`${API}/gallery`, { method: "POST", headers, body: JSON.stringify(galleryForm) });
    if (res.ok) { showToast("success", "Saved!"); setShowGalleryForm(false); loadData(); }
  };

  const handleSaveStory = async () => {
    if (!storyForm.title || !storyForm.imageUrl) return showToast("error", "Title and image required.");
    const res = await fetch(`${API}/stories`, { method: "POST", headers, body: JSON.stringify(storyForm) });
    if (res.ok) { showToast("success", "Saved!"); setShowStoryForm(false); loadData(); }
  };

  const handleSaveProject = async () => {
    if (!projectForm.title || !projectForm.mainImage) return showToast("error", "Title and image required.");
    const url = editingId ? `${API}/projects/${editingId}` : `${API}/projects`;
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers, body: JSON.stringify(projectForm) });
    if (res.ok) { showToast("success", "Project Saved!"); setShowProjectForm(false); loadData(); }
  };

  const handleDeleteCampaign = async (id: number) => {
    if (confirm("Delete?")) {
      await fetch(`${API}/campaigns/${id}`, { method: "DELETE", headers });
      loadData();
    }
  };

  const handleDeleteGallery = async (id: number) => {
    if (confirm("Delete?")) {
      await fetch(`${API}/gallery/${id}`, { method: "DELETE", headers });
      loadData();
    }
  };

  const handleDeleteStory = async (id: number) => {
    if (confirm("Delete?")) {
      await fetch(`${API}/stories/${id}`, { method: "DELETE", headers });
      loadData();
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm("Delete Project?")) {
      await fetch(`${API}/projects/${id}`, { method: "DELETE", headers });
      loadData();
    }
  };

  const handleDeleteVolunteer = async (id: number) => {
    if (confirm("Remove volunteer application?")) {
      await fetch(`${API}/volunteers/${id}`, { method: "DELETE", headers });
      loadData();
    }
  };

  const startEditCampaign = (c: any) => {
    setForm({ title: c.title, description: c.description, goalAmount: String(c.goalAmount), imageUrl: c.imageUrl || "", videoUrl: c.videoUrl || "" });
    setEditingId(c.id); setShowForm(true);
    setActiveTab("campaigns");
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif", background: "#F1F5F9" }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col"
        style={{ background: "linear-gradient(180deg, #0A1628 0%, #0E2040 100%)" }}>
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white" style={{ background: "linear-gradient(135deg,#D4A017,#E8553A)" }}>IF</div>
            <div>
              <p className="text-white font-bold text-sm">Invenger</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { id: "campaigns", label: "Campaigns", icon: LayoutDashboard },
            { id: "volunteers", label: "Volunteers", icon: Users },
            { id: "gallery", label: "Gallery", icon: ImagePlus },
            { id: "projects", label: "Projects", icon: BookOpen },
            { id: "stories", label: "Stories", icon: Heart },
            { id: "media", label: "Media Bank", icon: Video },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === id ? "bg-white/10 text-white border-l-4 border-[#D4A017]" : "text-white/40 hover:text-white"}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full py-2.5 rounded-xl text-xs font-bold text-white/40 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/20 transition-all flex items-center justify-center gap-2">
            <LogOut className="w-3.5 h-3.5" /> SIGN OUT
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="px-8 py-5 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">{activeTab}</h1>
          <button onClick={() => {
            if (activeTab === "campaigns") setShowForm(true);
            if (activeTab === "gallery") setShowGalleryForm(true);
            if (activeTab === "stories") setShowStoryForm(true);
            if (activeTab === "projects") setShowProjectForm(true);
          }} className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all shadow-lg">
            + NEW {activeTab.toUpperCase()}
          </button>
        </header>

        <div className="p-8">
          {activeTab === "campaigns" && (
            <div className="space-y-6">
              <AnimatePresence>
                {showForm && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none border border-slate-100" />
                      <input type="number" placeholder="Goal (₹)" value={form.goalAmount} onChange={e => setForm({...form, goalAmount: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none border border-slate-100" />
                    </div>
                    <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-slate-100 mb-4 h-24" />
                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <label className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center cursor-pointer text-blue-600 font-bold text-xs uppercase">
                         {form.imageUrl ? "Image Set ✓" : "Thumbnail Image"}
                         <input type="file" className="hidden" onChange={e => handleFileUpload(e, "imageUrl", "campaign")} />
                       </label>
                       <label className="p-3 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center cursor-pointer text-orange-600 font-bold text-xs uppercase">
                         {form.videoUrl ? "Video Set ✓" : "Campaign Video"}
                         <input type="file" className="hidden" onChange={e => handleFileUpload(e, "videoUrl", "campaign")} />
                       </label>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSaveCampaign} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">SAVE</button>
                      <button onClick={() => setShowForm(false)} className="px-6 py-2.5 text-slate-400 text-xs font-bold">CANCEL</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid grid-cols-1 gap-3">
                {campaigns.map(c => (
                  <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                    <img src={resolveMediaURL(c.imageUrl)} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{c.title}</h3>
                      <p className="text-xs text-slate-400">₹{c.raisedAmount} / ₹{c.goalAmount}</p>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => startEditCampaign(c)} className="p-2 text-slate-400 hover:text-slate-900"><Edit className="w-4 h-4" /></button>
                       <button onClick={() => handleDeleteCampaign(c.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
             <div className="space-y-6">
               {showGalleryForm && (
                 <div className="bg-white p-6 rounded-3xl border border-slate-200">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input type="text" placeholder="Title" value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none" />
                      <select value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none">
                        <option value="events">Events</option>
                        <option value="rescues">Rescues</option>
                        <option value="plantations">Plantations</option>
                        <option value="drives">Drives</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input type="number" step="any" placeholder="Latitude (e.g. 12.97)" value={galleryForm.lat} onChange={e => setGalleryForm({...galleryForm, lat: parseFloat(e.target.value)})} className="p-3 bg-slate-50 rounded-xl outline-none" />
                      <input type="number" step="any" placeholder="Longitude (e.g. 77.59)" value={galleryForm.lng} onChange={e => setGalleryForm({...galleryForm, lng: parseFloat(e.target.value)})} className="p-3 bg-slate-50 rounded-xl outline-none" />
                    </div>
                    <label className="w-full p-4 bg-emerald-50 border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer mb-6">
                      <ImagePlus className="w-8 h-8 text-emerald-400 mb-2" />
                      <span className="text-xs font-bold text-emerald-600 uppercase">{galleryForm.imageUrl ? "PHOTO UPLOADED ✓" : "CLICK TO UPLOAD PHOTO"}</span>
                      <input type="file" className="hidden" onChange={e => handleFileUpload(e, "imageUrl", "gallery")} />
                    </label>
                    <div className="flex gap-2">
                      <button onClick={handleSaveGallery} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">ADD TO GALLERY</button>
                      <button onClick={() => setShowGalleryForm(false)} className="px-6 py-2.5 text-slate-400 text-xs font-bold">CANCEL</button>
                    </div>
                 </div>
               )}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 {galleryItems.map(item => (
                   <div key={item.id} className="bg-white p-2 rounded-2xl border border-slate-100 group relative shadow-sm">
                     <img src={resolveMediaURL(item.imageUrl)} className="w-full h-40 rounded-xl object-cover" />
                     <button onClick={() => handleDeleteGallery(item.id)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                     <p className="p-2 text-xs font-black uppercase text-slate-900 truncate">{item.title}</p>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === "stories" && (
            <div className="space-y-6">
              {showStoryForm && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input type="text" placeholder="Story Title" value={storyForm.title} onChange={e => setStoryForm({...storyForm, title: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none" />
                    <input type="text" placeholder="Subtitle" value={storyForm.subtitle} onChange={e => setStoryForm({...storyForm, subtitle: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <textarea placeholder="Before Situation" value={storyForm.beforeText} onChange={e => setStoryForm({...storyForm, beforeText: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none h-20" />
                    <textarea placeholder="After Impact" value={storyForm.afterText} onChange={e => setStoryForm({...storyForm, afterText: e.target.value})} className="p-3 bg-slate-50 rounded-xl outline-none h-20" />
                  </div>
                  <textarea placeholder="The Quote" value={storyForm.quote} onChange={e => setStoryForm({...storyForm, quote: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none h-20 mb-4" />
                  <input type="text" placeholder="Quote Author" value={storyForm.quotePerson} onChange={e => setStoryForm({...storyForm, quotePerson: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl outline-none mb-4" />
                  
                  <div className="flex items-center gap-6 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={storyForm.isMilestone} onChange={e => setStoryForm({...storyForm, isMilestone: e.target.checked})} className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm font-bold text-slate-700">Journey Milestone</span>
                    </label>
                    {storyForm.isMilestone && (
                      <input type="number" placeholder="Year" value={storyForm.year} onChange={e => setStoryForm({...storyForm, year: parseInt(e.target.value)})} className="p-2 bg-slate-50 rounded-lg outline-none border border-slate-100 w-24 text-sm font-bold" />
                    )}
                  </div>

                  <label className="w-full h-32 bg-purple-50 border-2 border-dashed border-purple-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer mb-6">
                    <Heart className="w-6 h-6 text-purple-400 mb-2" />
                    <span className="text-xs font-bold text-purple-600 uppercase">{storyForm.imageUrl ? "STORY PHOTO READY ✓" : "UPLOAD STORY IMAGE"}</span>
                    <input type="file" className="hidden" onChange={e => handleFileUpload(e, "imageUrl", "story")} />
                  </label>
                  <div className="flex gap-2">
                    <button onClick={handleSaveStory} className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold">PUBLISH STORY</button>
                    <button onClick={() => setShowStoryForm(false)} className="px-6 py-2.5 text-slate-400 text-xs font-bold">CANCEL</button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-slate-800">
                 {stories.map(s => (
                   <div key={s.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-4 items-center">
                     <img src={resolveMediaURL(s.imageUrl)} className="w-24 h-24 rounded-2xl object-cover" />
                     <div className="flex-1">
                        <h4 className="font-bold">{s.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">{s.afterText}</p>
                     </div>
                     <button onClick={() => handleDeleteStory(s.id)} className="p-2 text-slate-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {showProjectForm && (
                 <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-2xl">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <input type="text" placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold" />
                      <input type="text" placeholder="Category" value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100" />
                    </div>
                    <textarea placeholder="Punchy Summary" value={projectForm.summary} onChange={e => setProjectForm({...projectForm, summary: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 h-24 mb-6" />
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                       <input type="text" placeholder="Location" value={projectForm.location} onChange={e => setProjectForm({...projectForm, location: e.target.value})} className="p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100" />
                       <div className="flex items-center gap-2 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <input type="checkbox" checked={projectForm.isFeatured} onChange={e => setProjectForm({...projectForm, isFeatured: e.target.checked})} className="w-4 h-4" />
                          <span className="text-sm font-bold text-slate-600">Featured Deep-Dive</span>
                       </div>
                    </div>

                    <label className="w-full h-48 bg-blue-50 border-2 border-dashed border-blue-100 rounded-[32px] flex flex-col items-center justify-center cursor-pointer mb-8">
                       <BookOpen className="w-8 h-8 text-blue-400 mb-2" />
                       <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{projectForm.mainImage ? "COVER PHOTO READY ✓" : "UPLOAD PROJECT COVER"}</span>
                       <input type="file" className="hidden" onChange={e => handleFileUpload(e, "mainImage", "project")} />
                    </label>

                    <div className="flex gap-4">
                      <button onClick={handleSaveProject} className="px-10 py-4 bg-slate-900 text-white rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">CREATE PROJECT</button>
                      <button onClick={() => setShowProjectForm(false)} className="px-8 py-4 text-slate-400 font-bold text-xs uppercase hover:text-slate-900 transition-all">CANCEL</button>
                    </div>
                 </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map(p => (
                  <div key={p.id} className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm transition-all hover:shadow-2xl group flex flex-col">
                    <img src={resolveMediaURL(p.mainImage)} className="w-full h-64 object-cover rounded-[32px] mb-6 shadow-lg shadow-slate-200" />
                    <div className="px-2 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">{p.category}</span>
                        {p.isFeatured && <span className="text-amber-500">★</span>}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{p.title}</h3>
                      <p className="text-slate-400 text-sm italic mb-4">📍 {p.location}</p>
                      <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-6">{p.summary}</p>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                       <button className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">VIEW LIVE →</button>
                       <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "volunteers" && (
            <div className="space-y-4">
              <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Name</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Contact</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Availability</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date Applied</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {volunteers.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-900">{v.name}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm text-slate-600 font-medium">{v.email}</p>
                          <p className="text-xs text-slate-400">{v.phone || "No phone"}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                            {v.availability}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-xs text-slate-400">{new Date(v.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => handleDeleteVolunteer(v.id)}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {volunteers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic text-sm">
                          No volunteer applications yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "media" && (
             <div className="bg-white p-10 rounded-[40px] border border-slate-100 text-center shadow-xl">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <Video className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Direct Media Upload</h2>
                <p className="text-slate-400 text-sm mt-2 mb-8">Upload files directly to your server's storage to get URLs for campaigns or gallery.</p>
                <label className="inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-all">
                  {uploading ? "Uploading..." : "Browse Files"}
                  <input type="file" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    const fd = new FormData();
                    fd.append("file", file);
                    const res = await fetch(`${API}/upload`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
                    const data = await res.json();
                    setUploading(false);
                    if (res.ok) alert("Uploaded! URL: " + data.url);
                  }} />
                </label>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
