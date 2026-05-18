import React, { useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const LeadModal = ({ isOpen, onClose, product, partnerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: product?.title || '',
    location: '',
    budget: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch((import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({
          ...formData,
          partnerId: partnerId || "69fdb00aebd7eba490690f9b" // Fallback to a default admin if partnerId is missing
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: '', email: '', phone: '', project: product?.title || '', location: '', budget: '', notes: ''
          });
        }, 2000);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-[32px] w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Inquiry Sent!</h3>
            <p className="text-slate-500 font-medium">The supplier will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="bg-[#14532D] p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black">Inquire Now</h3>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <FaTimes />
                </button>
              </div>
              <p className="text-green-100/70 text-sm font-medium">
                Sourcing: <span className="text-white font-bold">{product?.title}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-3 md:space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all" placeholder="+91 ..." />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
                <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all" placeholder="john@company.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all" placeholder="City, State" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Estimated Budget</label>
                  <input name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all" placeholder="e.g. ₹5L - ₹10L" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Requirements / Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="w-full px-4 md:px-5 py-2.5 md:py-3 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all resize-none" placeholder="Tell us more about your requirements..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 md:py-4 bg-[#14532D] text-white rounded-xl md:rounded-2xl font-black text-sm shadow-xl shadow-green-900/20 hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'Processing...' : (
                  <>
                    Send Inquiry
                    <FaPaperPlane className="text-[10px]" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
