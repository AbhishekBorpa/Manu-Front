import React from 'react';
import { FaSearch, FaFilter, FaDownload, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const MyLeads = () => {
  const leads = [
    { id: 1, name: 'Arun Pachauri', company: 'Pachauri Solutions', project: 'Automatic Paper Cup Machine', budget: '₹15L - 20L', status: 'High Intent', location: 'Ahmedabad' },
    { id: 2, name: 'Megha Gupta', company: 'Eco Pack', project: 'Biodegradable Plate Maker', budget: '₹5L - 8L', status: 'Negotiation', location: 'Pune' },
    { id: 3, name: 'Rajesh Khanna', company: 'Industrial Gear', project: 'Heavy Duty Molding', budget: '₹50L+', status: 'Converted', location: 'Indore' },
    { id: 4, name: 'Priya Verma', company: 'Clean Tech', project: 'Water Bottle Plant', budget: '₹25L', status: 'Nurturing', location: 'Lucknow' },
    { id: 5, name: 'Sanjay Dutt', company: 'Dutt Manufacturing', project: 'Paper Cup Machine', budget: '₹12L', status: 'Lost', location: 'Mumbai' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'High Intent': return 'bg-blue-100 text-blue-700';
      case 'Negotiation': return 'bg-orange-100 text-orange-700';
      case 'Converted': return 'bg-green-100 text-green-700';
      case 'Nurturing': return 'bg-purple-100 text-purple-700';
      case 'Lost': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

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
          { label: 'New Inquiries', count: '12', color: 'bg-blue-500' },
          { label: 'Active Negotiations', count: '28', color: 'bg-orange-500' },
          { label: 'Closed Deals', count: '145', color: 'bg-green-500' },
          { label: 'Conversion Rate', count: '12%', color: 'bg-purple-500' },
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
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-green-500 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600">
            <FaFilter /> Status
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600">
            Date Range
          </button>
        </div>
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-1 gap-4">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-green-500/30 transition-all group">
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
                  <p className="text-sm text-slate-500 font-medium">{lead.company} • {lead.project}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><FaMapMarkerAlt /> {lead.location}</span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-600">Budget: {lead.budget}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex-1 lg:flex-none p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Call">
                  <FaPhone />
                </button>
                <button className="flex-1 lg:flex-none p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors" title="Email">
                  <FaEnvelope />
                </button>
                <button className="flex-1 lg:flex-none px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLeads;
