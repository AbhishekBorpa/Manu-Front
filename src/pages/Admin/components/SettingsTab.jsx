import React, { useState, useEffect } from "react";
import { Save, Layout, Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "../../../api/config";

const SettingsTab = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [navbarData, setNavbarData] = useState(null);
  const [settings, setSettings] = useState({
    showMainCategory: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/navbar`);
      const data = await res.json();
      if (data.success && data.navbar) {
        setNavbarData(data.navbar);
        setSettings({
          showMainCategory: data.navbar.showMainCategory !== false,
        });
      } else if (data.showMainCategory !== undefined) {
          // Fallback if structure is different
          setNavbarData(data);
          setSettings({
            showMainCategory: data.showMainCategory !== false,
          });
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!navbarData || !navbarData._id) {
        alert("Navbar settings not found or missing ID.");
        return;
    }
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/navbar/${navbarData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        alert("Settings updated successfully! ✅");
      } else {
        alert(data.msg || "Failed to update settings.");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full p-4 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] font-bold">Site Settings</h2>
          <p className="text-gray-400 mt-1 text-[11px]">Manage global visibility and configuration for the website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="h-[40px] px-6 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-green-900/20"
        >
          {saving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HOMEPAGE SECTIONS */}
        <div className="bg-[#081120] border border-white/10 rounded-[32px] p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Layout size={20} />
            </div>
            <h3 className="text-lg font-bold">Homepage Sections</h3>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${settings.showMainCategory ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                  {settings.showMainCategory ? <Eye size={18} /> : <EyeOff size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Main Category Section</p>
                  <p className="text-[10px] text-gray-500">Show or hide the categories list below hero section</p>
                </div>
              </div>
              
              <button
                onClick={() => setSettings({ ...settings, showMainCategory: !settings.showMainCategory })}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${settings.showMainCategory ? 'bg-green-600 shadow-lg shadow-green-900/20' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.showMainCategory ? 'translate-x-6' : ''}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
