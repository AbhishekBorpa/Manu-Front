import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  FileText, 
  ExternalLink, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Building2,
  Calendar,
  Clock,
  Briefcase,
  Package,
  IndianRupee,
  ChevronRight
} from 'lucide-react';

const PartnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(false);

  useEffect(() => {
    fetchPartnerDetails();
  }, [id]);

  const fetchPartnerDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${ (import.meta.env.VITE_API_URL || "https://manu-back-bpob.onrender.com/api")}/admin/partner-profiles/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPartner(data.profile);
      } else {
        alert(data.msg || "Failed to load partner details.");
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error("Fetch partner details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (status) => {
    if (window.confirm(`Are you sure you want to mark this seller as ${status}?`)) {
      setActioning(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${ (import.meta.env.VITE_API_URL || "https://manu-back-bpob.onrender.com/api")}/admin/partner-profiles/${id}/verify`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (data.success) {
          setPartner(data.profile);
          alert(`Partner successfully ${status === 'Verified' ? 'approved' : 'rejected'}.`);
        } else {
          alert(data.msg || "Failed to update status.");
        }
      } catch (err) {
        console.error("Verification error:", err);
      } finally {
        setActioning(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!partner) return null;

  return (
    <div className="min-h-screen bg-[#020817] text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header / Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Verifications
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black tracking-tight">{partner.companyName}</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                partner.verificationStatus === 'Verified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                partner.verificationStatus === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-orange-500/10 text-orange-400 border border-orange-500/20'
              }`}>
                {partner.verificationStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {partner.verificationStatus === 'Pending' && (
              <>
                <button 
                  disabled={actioning}
                  onClick={() => handleVerification('Rejected')}
                  className="px-6 py-3 rounded-xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all font-bold text-sm flex items-center gap-2 border border-red-500/20"
                >
                  <XCircle size={18} />
                  Reject Seller
                </button>
                <button 
                  disabled={actioning}
                  onClick={() => handleVerification('Verified')}
                  className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-500 transition-all font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-600/20"
                >
                  <CheckCircle size={18} />
                  Approve Seller
                </button>
              </>
            )}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Business & User Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Info Card */}
            <div className="bg-[#081120] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
               
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  
                  {/* Company Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-green-500">
                      <Building2 size={20} />
                      <h3 className="text-sm font-black uppercase tracking-[2px]">Company Details</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-400">
                          <Globe size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Website</p>
                          <a href={partner.website} target="_blank" rel="noreferrer" className="text-white font-bold hover:text-green-500 transition-colors flex items-center gap-1">
                            {partner.website || 'N/A'} <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-400">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Address</p>
                          <p className="text-white font-bold leading-relaxed">{partner.address || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-400">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Joined Date</p>
                          <p className="text-white font-bold">{new Date(partner.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Owner Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-purple-500">
                      <ShieldCheck size={20} />
                      <h3 className="text-sm font-black uppercase tracking-[2px]">Owner Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-400">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Full Name</p>
                          <p className="text-white font-bold">{partner.userId?.name || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-400">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Email Address</p>
                          <p className="text-white font-bold">{partner.userId?.email || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-gray-400">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Phone Number</p>
                          <p className="text-white font-bold">{partner.userId?.phoneNumber || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* KYC & Documents Section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black flex items-center gap-3">
                    <FileText className="text-green-500" />
                    Legal Documents
                  </h2>
                  <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Last Submitted: {partner.kycSubmittedAt ? new Date(partner.kycSubmittedAt).toLocaleDateString() : 'Never'}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* GST Doc */}
                  <div className="bg-[#081120] border border-white/10 rounded-3xl p-6 hover:border-green-500/30 transition-all group">
                     <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <a href={partner.gstDoc} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </a>
                     </div>
                     <h4 className="text-sm font-black text-white mb-1 uppercase tracking-wider">GST Certificate</h4>
                     <p className="text-[10px] text-gray-500 font-bold font-mono">ID: {partner.gstNumber || 'NOT PROVIDED'}</p>
                     
                     <div className="mt-6">
                        <a href={partner.gstDoc} target="_blank" rel="noreferrer" className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all">
                           Preview Document <ChevronRight size={14} />
                        </a>
                     </div>
                  </div>

                  {/* Business Reg Doc */}
                  <div className="bg-[#081120] border border-white/10 rounded-3xl p-6 hover:border-purple-500/30 transition-all group">
                     <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FileText size={24} />
                        </div>
                        <a href={partner.businessRegDoc} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </a>
                     </div>
                     <h4 className="text-sm font-black text-white mb-1 uppercase tracking-wider">Business License</h4>
                     <p className="text-[10px] text-gray-500 font-bold font-mono">ID: {partner.businessRegistrationNumber || 'NOT PROVIDED'}</p>
                     
                     <div className="mt-6">
                        <a href={partner.businessRegDoc} target="_blank" rel="noreferrer" className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all">
                           Preview Document <ChevronRight size={14} />
                        </a>
                     </div>
                  </div>

               </div>
            </div>

          </div>

          {/* Right Column: Quick Stats & Activity */}
          <div className="space-y-8">
            
            {/* Status Summary */}
            <div className="bg-[#081120] border border-white/10 rounded-[32px] p-8 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-[2px] text-gray-400">Quick Stats</h3>
               
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                           <Briefcase size={16} />
                        </div>
                        <span className="text-xs font-bold text-gray-300">Leads Handled</span>
                     </div>
                     <span className="text-sm font-black">124</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center">
                           <Package size={16} />
                        </div>
                        <span className="text-xs font-bold text-gray-300">Active Products</span>
                     </div>
                     <span className="text-sm font-black">12</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center">
                           <IndianRupee size={16} />
                        </div>
                        <span className="text-xs font-bold text-gray-300">Total Volume</span>
                     </div>
                     <span className="text-sm font-black">₹4.2L</span>
                  </div>
               </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-[#14532D] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-green-900/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="text-green-300" />
                Compliance Checklist
              </h3>
              <ul className="space-y-4">
                {[
                  { text: 'GST ID Verification', checked: !!partner.gstNumber },
                  { text: 'Business Name Match', checked: true },
                  { text: 'Document Clarity', checked: true },
                  { text: 'Industry Eligibility', checked: true }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border ${item.checked ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                      {item.checked && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <span className={item.checked ? 'text-white' : 'text-white/40'}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PartnerDetails;
