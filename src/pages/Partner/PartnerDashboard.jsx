import React, { useState, useEffect } from 'react';
import { 
  FaBoxOpen, 
  FaChartLine, 
  FaUsers, 
  FaWallet, 
  FaArrowUp, 
  FaBell, 
  FaEllipsisV,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {trend && (
        <p className={`text-xs mt-2 flex items-center ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          <FaArrowUp className={`mr-1 ${trend.startsWith('+') ? '' : 'rotate-180'}`} />
          {trend} from last month
        </p>
      )}
    </div>
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-current/10`}>
      <Icon />
    </div>
  </div>
);

const PartnerDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeOrders: 0,
    successRate: 0,
    totalRevenue: '₹0'
  });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch Stats
        const statsRes = await fetch(import.meta.env.VITE_API_URL + '/partner/stats', { headers });
        const statsData = await statsRes.json();

        // Fetch Leads
        const leadsRes = await fetch(import.meta.env.VITE_API_URL + '/partner/leads', { headers });
        const leadsData = await leadsRes.json();

        if (statsRes.ok) setStats(statsData);
        if (leadsRes.ok) setLeads(leadsData.slice(0, 5)); // Only show recent 5
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Leads', value: stats.totalLeads, icon: FaUsers, trend: '+12.5%', color: 'bg-blue-500' },
    { title: 'Active Orders', value: stats.activeOrders, icon: FaBoxOpen, trend: '+5.2%', color: 'bg-green-500' },
    { title: 'Total Revenue', value: stats.totalRevenue, icon: FaWallet, trend: stats.revenueTrend || '+8.1%', color: 'bg-orange-500' },
    { title: 'Success Rate', value: `${stats.successRate}%`, icon: FaChartLine, trend: '+2.4%', color: 'bg-purple-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Partner Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's what's happening with your manufacturing leads.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
            <FaBell />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="bg-[#14532D] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-900/10 hover:bg-[#166534] transition-all active:scale-95">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Leads Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Manufacturing Leads</h3>
            <button 
              onClick={() => navigate('/partner/leads')}
              className="text-[#14532D] text-sm font-bold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{lead.name}</p>
                          <p className="text-[11px] text-slate-400">{lead.location}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">{lead.project}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          lead.status === 'New' ? 'bg-blue-100 text-blue-600' :
                          lead.status === 'In Progress' ? 'bg-orange-100 text-orange-600' :
                          lead.status === 'Converted' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                          <FaEllipsisV />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-sm">
                      No recent leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-6">Partner Updates</h3>
          <div className="space-y-6">
            {[
              { icon: FaCheckCircle, color: 'text-green-500', bg: 'bg-green-50', title: 'Payment Received', desc: '₹45,000 processed for Order #234', time: '2h ago' },
              { icon: FaClock, color: 'text-blue-500', bg: 'bg-blue-50', title: 'New Lead Assigned', desc: 'Custom Paper Bag machine inquiry', time: '4h ago' },
              { icon: FaTimesCircle, color: 'text-red-500', bg: 'bg-red-50', title: 'Lead Rejected', desc: 'Client budget mismatch for Project #88', time: 'Yesterday' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex-shrink-0 flex items-center justify-center text-lg`}>
                  <item.icon />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="bg-[#14532D]/5 rounded-2xl p-4 border border-[#14532D]/10 text-center">
              <h4 className="text-[#14532D] font-extrabold text-sm mb-1">Upgrade Your Reach</h4>
              <p className="text-[#14532D]/70 text-[11px] mb-3 leading-tight">Get 3x more premium leads with our Featured Partner plan.</p>
              <button className="w-full bg-[#14532D] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#166534] transition-all">Explore Plans</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PartnerDashboard;
