import React from 'react';
import { FaUserPlus, FaEnvelope, FaShieldAlt, FaEllipsisV } from 'react-icons/fa';

const Team = () => {
  const members = [
    { id: 1, name: 'Sandeep Varma', role: 'Sales Manager', email: 'sandeep@factory.com', status: 'Active', avatar: 'SV' },
    { id: 2, name: 'Pooja Negi', role: 'Inventory Lead', email: 'pooja@factory.com', status: 'Active', avatar: 'PN' },
    { id: 3, name: 'Rahul Chawla', role: 'Technical Expert', email: 'rahul@factory.com', status: 'Away', avatar: 'RC' },
    { id: 4, name: 'Amit Saxena', role: 'Support Agent', email: 'amit@factory.com', status: 'Inactive', avatar: 'AS' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Team Management</h1>
          <p className="text-slate-500 text-sm">Add and manage sub-users for your manufacturing portal.</p>
        </div>
        <button className="bg-[#14532D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#166534] transition-all flex items-center gap-2">
          <FaUserPlus /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all relative group">
            <button className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors">
              <FaEllipsisV />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-green-500/20">
                {member.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 leading-tight">{member.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{member.role}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <FaEnvelope className="text-slate-300" />
                {member.email}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <FaShieldAlt className="text-slate-300" />
                Full Portal Access
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                member.status === 'Active' ? 'bg-green-100 text-green-700' :
                member.status === 'Away' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {member.status}
              </span>
              <button className="text-xs font-bold text-blue-600 hover:underline">Edit Role</button>
            </div>
          </div>
        ))}
        
        {/* Add New Card UI */}
        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:border-green-400 transition-all cursor-pointer">
          <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-50 group-hover:text-green-500 transition-all">
            <FaUserPlus className="text-xl" />
          </div>
          <h4 className="text-sm font-bold text-slate-500 group-hover:text-green-600 transition-all">Invite New Partner</h4>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[150px]">Grant access to your sales and inventory teams.</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
