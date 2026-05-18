import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload, FaPhone, FaEnvelope, FaMapMarkerAlt, FaExclamationCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../../api/config';

const MyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/partner/leads`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) {
          setLeads(data);
        }
      } catch (err) {
        console.error("Fetch leads error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-orange-100 text-orange-700';
      case 'Converted': return 'bg-green-100 text-green-700';
      case 'Nurturing': return 'bg-purple-100 text-purple-700';
      case 'Lost': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Leads</h1>
          <p className="text-slate-500 font-medium">Manage and track your manufacturing inquiries</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <FaFilter className="text-xs text-[#14532D]" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#14532D] text-white rounded-xl font-bold hover:bg-[#166534] transition-all shadow-lg shadow-green-900/10">
            <FaDownload className="text-xs" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Inquiries', count: leads.length, color: 'bg-blue-500' },
          { label: 'Active Negotiations', count: leads.filter(l => l.status === 'In Progress').length, color: 'bg-orange-500' },
          { label: 'Closed Deals', count: leads.filter(l => l.status === 'Converted').length, color: 'bg-green-500' },
          { label: 'Conversion Rate', count: leads.length > 0 ? `${Math.round((leads.filter(l => l.status === 'Converted').length / leads.length) * 100)}%` : '0%', color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-800">{stat.count}</h3>
            <div className={`h-1 w-8 ${stat.color} rounded-full mt-3`}></div>
          </div>
        ))}
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads by name, company or project..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-green-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div key={lead._id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-green-500/30 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-xl font-bold group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                    {lead.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {lead.name}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{lead.project}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><FaMapMarkerAlt /> {lead.location}</span>
                      <span className="flex items-center gap-1.5 font-bold text-slate-600">Budget: {lead.budget}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href={`tel:${lead.phone}`} className="flex-1 lg:flex-none p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Call">
                    <FaPhone />
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex-1 lg:flex-none p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors" title="Email">
                    <FaEnvelope />
                  </a>
                  <button className="flex-1 lg:flex-none px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <FaExclamationCircle className="text-4xl text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">No leads found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLeads;
