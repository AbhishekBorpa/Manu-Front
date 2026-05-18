export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api";

export const getServerUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  // Remove /api from the end of base URL if it's there
  const base = API_BASE_URL.replace("/api", "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
};
