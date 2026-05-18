import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaBell, FaGlobe, FaCreditCard, FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { API_BASE_URL } from '../../api/config';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    address: '',
    website: '',
    logo: ''
  });

  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : {};

      const res = await fetch(`${API_BASE_URL}/partner/kyc-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      const profile = data.profile || {};
      const loadedData = {
        companyName: profile.companyName || user.name || 'Ultra Partner',
        phone: user.phone || profile.phone || '',
        address: profile.address || '',
        website: profile.website || '',
        logo: profile.logo || ''
      };

      setFormData(loadedData);
      setInitialData(loadedData);
    } catch (err) {
      console.error("Fetch profile details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadLogoToCloudinary = async (file) => {
    if (!file) return;
    setLogoUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "manu_uploads");
      data.append("cloud_name", "djsxaigna");

      const res = await fetch("https://api.cloudinary.com/v1_1/djsxaigna/image/upload", {
        method: "POST",
        body: data,
      });
      const fileData = await res.json();
      if (fileData.secure_url) {
        setFormData(prev => ({ ...prev, logo: fileData.secure_url }));
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Logo upload error:", err);
      alert("Error uploading logo");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadLogoToCloudinary(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/partner/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        // Update user state local storage phone
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          user.phone = formData.phone;
          user.name = formData.companyName;
          localStorage.setItem('user', JSON.stringify(user));
        }

        alert("Profile settings updated successfully! 🎉");
        setInitialData(formData);
      } else {
        alert(data.msg || "Failed to update profile");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      alert("Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 text-3xl font-bold overflow-hidden border-4 border-white shadow-sm">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Company Logo" className="w-full h-full object-cover" />
                    ) : (
                      formData.companyName ? formData.companyName[0].toUpperCase() : 'UP'
                    )}
                  </div>
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:bg-green-600 transition-all cursor-pointer"
                  >
                    {logoUploading ? <FaSpinner className="animate-spin text-xs" /> : <FaCloudUploadAlt />}
                  </label>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Company Logo</h4>
                  <p className="text-xs text-slate-400 mt-1">PNG or JPG. Max 5MB.</p>
                  {formData.logo && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logo: '' })}
                      className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1 mt-1.5"
                    >
                      <FaTrashAlt className="text-[10px]" /> Remove Logo
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 99999 99999"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Website URL</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourfactory.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Business Address</label>
                  <textarea
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20 resize-none"
                  ></textarea>
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-slate-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormData(initialData)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-[#14532D] text-white rounded-xl text-sm font-bold hover:bg-[#166534] shadow-lg shadow-green-900/10 transition-all flex items-center gap-2"
              >
                {saving && <FaSpinner className="animate-spin text-xs" />}
                Save Changes
              </button>
            </div>
          </form>
        );

      case 'Security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Security Credentials</h3>
            <p className="text-slate-400 text-xs font-medium">To update your password, email, or credentials, please open the general user Profile screen via your account dropdown settings.</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                <p className="text-slate-400 text-xs mt-1">Add an extra layer of protection to your partner profile.</p>
              </div>
              <span className="px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase rounded-full">Inactive</span>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { title: 'Email Alerts on New Leads', desc: 'Get immediately notified when a new machinery tender matches your categories.', val: true },
                { title: 'KYC Status Updates', desc: 'Receive instant notifications regarding verification approval or rejection.', val: true },
                { title: 'Weekly Performance Summaries', desc: 'Receive weekly analysis summaries of active negotiations and closed sales.', val: false }
              ].map((pref, i) => (
                <div key={i} className="flex items-start justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{pref.title}</h4>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{pref.desc}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={pref.val}
                      className="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FaGlobe className="text-4xl text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">{activeTab} tab configuration</h3>
            <p className="text-slate-400 text-xs">Standard parameters for corporate billing and custom domain routing.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-500 text-sm">Update your company profile and portal preferences.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
          
          {/* Left Navigation */}
          <div className="w-full md:w-64 p-4 bg-slate-50/50">
            <nav className="space-y-1">
              {[
                { name: 'Profile', icon: FaUser },
                { name: 'Security', icon: FaLock },
                { name: 'Notifications', icon: FaBell },
                { name: 'Branding', icon: FaGlobe },
                { name: 'Billing', icon: FaCreditCard },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.name ? 'bg-white text-green-600 shadow-sm border border-slate-100/80' : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                  }`}
                >
                  <tab.icon className={activeTab === tab.name ? 'text-green-500' : 'text-slate-400'} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8">
            {renderTabContent()}
          </div>

        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-red-800 text-sm">Deactivate Account</h4>
          <p className="text-xs text-red-600/70">Once you deactivate, all your data will be archived.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to deactivate your partner account?")) {
              alert("Deactivation request submitted.");
            }
          }}
          className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-50 transition-all"
        >
          Deactivate
        </button>
      </div>
    </div>
  );
};

export default Settings;
