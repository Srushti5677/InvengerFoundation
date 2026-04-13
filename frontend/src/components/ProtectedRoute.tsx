import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      navigate("/admin/login");
      return;
    }

    try {
      const parsed = JSON.parse(user);
      if (parsed.role !== "ADMIN") {
        navigate("/admin/login");
      }
    } catch {
      navigate("/admin/login");
    }
  }, [navigate]);

  const token = localStorage.getItem("adminToken");
  if (!token) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
