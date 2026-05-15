import React, { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaExclamationCircle, FaSearch, FaChevronRight } from 'react-icons/fa';

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMyQueries = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch((import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/leads/my-queries", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setQueries(data.leads);
        }
      } catch (err) {
        console.error("Fetch queries error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyQueries();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Converted': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Negotiation': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredQueries = queries.filter(q => 
    q.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Queries</h1>
            <p className="text-slate-500 font-medium">Track your product inquiries and supplier conversations.</p>
          </div>
          
          <div className="relative group min-w-[300px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14532D] transition-colors" />
            <input 
              type="text" 
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#14532D]/20 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : filteredQueries.length > 0 ? (
          <div className="grid gap-6">
            {filteredQueries.map((query) => (
              <div key={query._id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#14532D]/5 rounded-2xl flex items-center justify-center text-[#14532D] text-xl group-hover:bg-[#14532D] group-hover:text-white transition-all duration-500">
                      <FaClock className="animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-black text-slate-900">{query.project}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(query.status)}`}>
                          {query.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span>{query.location}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span>Sent on {new Date(query.createdAt).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span>Budget: {query.budget}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Inquiry ID</p>
                      <p className="text-xs font-mono font-bold text-slate-500">#{query._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 hover:bg-[#14532D] text-slate-700 hover:text-white rounded-2xl font-bold transition-all duration-300">
                      View Details
                      <FaChevronRight className="text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[48px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationCircle className="text-slate-200 text-3xl" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">No inquiries found</h3>
            <p className="text-slate-500 font-medium">You haven't sent any product inquiries yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyQueries;
