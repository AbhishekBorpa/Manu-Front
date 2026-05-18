import React from "react";
import { Edit2 } from "lucide-react";

const ProfileTab = ({
  adminProfile,
  setAdminProfile,
}) => {
  const API_URL = import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api";

  const handleProfileSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!adminProfile.id) return alert("No User ID found.");
      
      const res = await fetch(`${API_URL}/admin/users/${adminProfile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: adminProfile.name, email: adminProfile.email })
      });
      
      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert(data.msg || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 flex-1 overflow-hidden p-4">
      <div className="bg-[#081120] border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-auto animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-6 border-b border-white/10 pb-8 mb-8">
          <div className="relative">
            <img 
              src="https://i.pravatar.cc/150" 
              alt="admin profile" 
              className="w-24 h-24 rounded-full border-4 border-green-500 object-cover shadow-lg shadow-green-500/20"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 p-1.5 rounded-full border-2 border-[#081120] cursor-pointer hover:bg-green-400 transition-colors">
              <Edit2 size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{adminProfile.name}</h2>
            <p className="text-green-500 font-medium text-sm mt-1 uppercase tracking-widest">{adminProfile.role}</p>
            <p className="text-gray-400 text-sm mt-1">{adminProfile.email}</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={adminProfile.name}
                onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
                className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={adminProfile.email}
                onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
                className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Role</label>
            <input 
              type="text" 
              value={adminProfile.role}
              disabled
              className="w-full bg-[#0b1220]/50 border border-white/5 rounded-xl h-[45px] px-4 text-sm text-gray-500 outline-none cursor-not-allowed"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button type="button" className="px-6 h-[45px] rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all">
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleProfileSave}
              className="px-6 h-[45px] rounded-xl text-sm font-medium bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
