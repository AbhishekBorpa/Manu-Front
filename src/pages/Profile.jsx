import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaShieldAlt, FaCamera, FaCheckCircle, FaChartLine, FaArrowRight } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 p-6">
        <FaUser className="text-6xl mb-4 opacity-20" />
        <p className="text-xl font-bold">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Card */}
      <div className="bg-[#14532D] rounded-[32px] md:rounded-[40px] p-6 md:p-12 text-white relative overflow-hidden mb-6 md:mb-8 shadow-2xl shadow-green-900/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-green-400/20 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="relative group">
            <div className="w-24 h-24 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-[24px] md:rounded-[32px] flex items-center justify-center text-3xl md:text-5xl font-extrabold border-2 md:border-4 border-white/20 shadow-inner">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 bg-white text-[#14532D] rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
              <FaCamera className="text-xs md:text-base" />
            </button>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1 md:mb-2">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight">{user.name}</h1>
              <FaCheckCircle className="text-green-400 text-lg" />
            </div>
            <p className="text-green-100/70 font-bold text-sm md:text-lg mb-4 md:mb-6 capitalize">{user.role || 'Verified User'}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
              <span className="px-3 md:px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold border border-white/10">Member since 2024</span>
              <span className="px-3 md:px-4 py-1 bg-green-400 text-[#14532D] rounded-full text-[10px] md:text-xs font-bold">Premium Account</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Shortcut for Partners/Admins */}
      {(user.role === 'partner' || user.role === 'admin') && (
        <div className="mb-6 md:mb-8 bg-gradient-to-r from-[#14532D] to-[#166534] rounded-[24px] md:rounded-[32px] p-0.5 md:p-1 shadow-lg">
          <div className="bg-white rounded-[22px] md:rounded-[30px] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 text-[#14532D] rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-inner">
                <FaChartLine />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-sm md:text-base">Partner Management Portal</h3>
                <p className="text-[10px] md:text-xs text-slate-500 font-medium">Manage leads, inventory, and business analytics.</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = user.role === 'admin' ? '/admin/dashboard' : '/partner/dashboard'}
              className="w-full md:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-[#14532D] text-white rounded-xl md:rounded-2xl font-bold hover:bg-[#166534] transition-all shadow-lg shadow-green-900/20 active:scale-95 flex items-center justify-center gap-2 text-xs md:text-sm"
            >
              Go to Dashboard
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        
        {/* Contact Info */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-sm">
          <h3 className="text-base md:text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FaEnvelope className="text-sm" />
            </div>
            Contact Information
          </h3>
          
          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-slate-700 font-bold text-sm md:text-base">{user.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
              <p className="text-slate-700 font-bold text-sm md:text-base">{user.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 border border-slate-100 shadow-sm">
          <h3 className="text-base md:text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <FaShieldAlt className="text-sm" />
            </div>
            Security & Privacy
          </h3>
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Password</p>
                <p className="text-slate-700 font-bold text-sm">••••••••••••</p>
              </div>
              <button className="text-xs font-black text-[#14532D] hover:underline">Change</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">2FA Status</p>
                <p className="text-red-500 font-black text-xs uppercase">Disabled</p>
              </div>
              <button className="text-xs font-black text-[#14532D] hover:underline">Enable</button>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
        <button className="flex-1 bg-[#14532D] text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg shadow-green-900/10 hover:bg-[#166534] transition-all active:scale-95 text-xs md:text-sm">
          Edit Profile Details
        </button>
        <button className="flex-1 bg-slate-900 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:bg-black transition-all active:scale-95 text-xs md:text-sm">
          View Order History
        </button>
      </div>

    </div>
  );
};

export default Profile;
