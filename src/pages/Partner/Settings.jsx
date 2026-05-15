import React from 'react';
import { FaUser, FaLock, FaBell, FaGlobe, FaCreditCard, FaCloudUploadAlt } from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-500 text-sm">Update your company profile and portal preferences.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Navigation Tabs (Vertical/Horizontal mix) */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
          
          {/* Left Navigation */}
          <div className="w-full md:w-64 p-4 bg-slate-50/50">
            <nav className="space-y-1">
              {[
                { name: 'Profile', icon: FaUser, active: true },
                { name: 'Security', icon: FaLock },
                { name: 'Notifications', icon: FaBell },
                { name: 'Branding', icon: FaGlobe },
                { name: 'Billing', icon: FaCreditCard },
              ].map((tab) => (
                <button 
                  key={tab.name}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    tab.active ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                  }`}
                >
                  <tab.icon className={tab.active ? 'text-green-500' : 'text-slate-400'} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8">
            <div className="space-y-8">
              
              {/* Profile Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 text-3xl font-bold overflow-hidden border-4 border-white shadow-sm">
                      UP
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:bg-green-600 transition-all">
                      <FaCloudUploadAlt />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Company Logo</h4>
                    <p className="text-xs text-slate-400 mt-1">PNG or JPG. Max 5MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Company Name</label>
                    <input type="text" defaultValue="Ultra Partner Pvt Ltd" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-green-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contact Number</label>
                    <input type="text" defaultValue="+91 9876543210" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-green-500 transition-all" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Business Address</label>
                    <textarea rows="3" defaultValue="123 Industrial Area, Sector 5, Ahmedabad, Gujarat 380001" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-green-500 transition-all resize-none"></textarea>
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-slate-50 flex justify-end gap-3">
                <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                <button className="px-6 py-2.5 bg-[#14532D] text-white rounded-xl text-sm font-bold hover:bg-[#166534] shadow-lg shadow-green-900/10 transition-all">Save Changes</button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-red-800 text-sm">Deactivate Account</h4>
          <p className="text-xs text-red-600/70">Once you deactivate, all your data will be archived.</p>
        </div>
        <button className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-50 transition-all">Deactivate</button>
      </div>
    </div>
  );
};

export default Settings;
