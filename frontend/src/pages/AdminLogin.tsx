import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import invengerLogo from "@/assets/invenger logo.jpg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Login failed.");
      if (data.user.role !== "ADMIN") return setError("Access denied. Admins only.");
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      navigate("/admin/dashboard");
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #0A1628 0%, #0E2040 60%, #122B55 100%)" }}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)", backgroundSize: "50px 50px" }} />
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20" 
          style={{ background: "radial-gradient(circle, #E8553A 0%, transparent 70%)", filter: "blur(60px)", transform: "translate(-30%, 30%)" }} />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15" 
          style={{ background: "radial-gradient(circle, #D4A017 0%, transparent 70%)", filter: "blur(60px)", transform: "translate(30%, -30%)" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-base flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #D4A017, #E8553A)", color: "#fff", boxShadow: "0 4px 16px rgba(212,160,23,0.4)" }}>
              IF
            </div>
            <span className="text-white font-bold text-lg">Invenger Foundation</span>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage your <br />
            <span style={{ color: "#D4A017" }}>impact</span> from<br />
            one place.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Upload campaigns, track donations, manage media, <br />
            and drive change — all from your admin dashboard.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          {[["150+", "Volunteers"], ["₹12L+", "Donations"], ["40+", "Campaigns"]].map(([val, label]) => (
            <div key={label} className="px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="text-white font-bold text-lg">{val}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: "#F8FAFD" }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1.5" style={{ color: "#0A1628" }}>Welcome back 👋</h1>
            <p className="text-sm" style={{ color: "#6B7280" }}>Sign in to your admin portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "email", label: "Email address", type: "email", placeholder: "admin@invenger.com", icon: Mail },
              { key: "password", label: "Password", type: showPassword ? "text" : "password", placeholder: "••••••••", icon: Lock },
            ].map(({ key, label, type, placeholder, icon: Icon }) => (
              <div key={key}>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9CA3AF" }} />
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required
                    className="w-full pl-10 pr-10 py-3 text-sm rounded-xl outline-none transition-all"
                    style={{
                      background: "#fff",
                      border: "1.5px solid #E5E7EB",
                      color: "#111827",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                    onFocus={e => { e.target.style.borderColor = "#0A1628"; e.target.style.boxShadow = "0 0 0 3px rgba(10,22,40,0.08)"; }}
                    onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)"; }}
                  />
                  {key === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-sm px-4 py-2.5 rounded-xl"
                style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}>
                {error}
              </motion.p>
            )}

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white mt-2 transition-all"
              style={{ background: "linear-gradient(135deg, #0A1628 0%, #122B55 100%)", boxShadow: "0 4px 12px rgba(10,22,40,0.3)" }}>
              {loading ? "Signing in…" : "Sign in →"}
            </motion.button>
          </form>

          <p className="text-center text-xs mt-8" style={{ color: "#9CA3AF" }}>
            Invenger Foundation · Admin Portal · 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
