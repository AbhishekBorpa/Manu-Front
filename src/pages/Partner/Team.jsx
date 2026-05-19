import React, { useState } from 'react';
import { FaUserPlus, FaEnvelope, FaShieldAlt, FaEllipsisV, FaTimesCircle, FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

const Team = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Sandeep Varma', role: 'Sales Manager', email: 'sandeep@factory.com', status: 'Active', avatar: 'SV' },
    { id: 2, name: 'Pooja Negi', role: 'Inventory Lead', email: 'pooja@factory.com', status: 'Active', avatar: 'PN' },
    { id: 3, name: 'Rahul Chawla', role: 'Technical Expert', email: 'rahul@factory.com', status: 'Away', avatar: 'RC' },
    { id: 4, name: 'Amit Saxena', role: 'Support Agent', email: 'amit@factory.com', status: 'Inactive', avatar: 'AS' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Sales Manager',
    email: '',
    status: 'Active'
  });

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        email: member.email,
        status: member.status
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: 'Sales Manager',
        email: '',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData, avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase() } : m));
    } else {
      const newMember = {
        id: Date.now(),
        ...formData,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      setMembers([...members, newMember]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      setMembers(members.filter(m => m.id !== id));
      setActiveMenu(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Team Management</h1>
          <p className="text-slate-500 text-sm">Add and manage sub-users for your manufacturing portal.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#14532D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#166534] transition-all flex items-center gap-2"
        >
          <FaUserPlus /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all relative group">
            <button 
              onClick={() => setActiveMenu(activeMenu === member.id ? null : member.id)}
              className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"
            >
              <FaEllipsisV />
            </button>

            {activeMenu === member.id && (
              <div className="absolute right-10 top-10 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                <button onClick={() => handleOpenModal(member)} className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">Edit Member</button>
                <button onClick={() => handleDelete(member.id)} className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 border-t border-slate-50 flex items-center gap-2"><FaTrashAlt className="text-[10px]" /> Remove</button>
              </div>
            )}
            
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
              <button 
                onClick={() => handleOpenModal(member)}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Edit Role
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Card UI */}
        <div 
          onClick={() => handleOpenModal()}
          className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:border-green-400 transition-all cursor-pointer"
        >
          <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-50 group-hover:text-green-500 transition-all">
            <FaUserPlus className="text-xl" />
          </div>
          <h4 className="text-sm font-bold text-slate-500 group-hover:text-green-600 transition-all">Invite New Partner</h4>
          <p className="text-[10px] text-slate-400 mt-1 max-w-[150px]">Grant access to your sales and inventory teams.</p>
        </div>
      </div>

      {/* Invite/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-[#14532D] p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingMember ? 'Edit Member' : 'Invite New Member'}</h3>
              <button onClick={() => setIsModalOpen(false)}><FaTimesCircle className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Full Name</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
                <input 
                  required 
                  type="email"
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" 
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Role</label>
                  <select 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20 appearance-none"
                  >
                    <option>Sales Manager</option>
                    <option>Inventory Lead</option>
                    <option>Technical Expert</option>
                    <option>Support Agent</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20 appearance-none"
                  >
                    <option>Active</option>
                    <option>Away</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#14532D] text-white rounded-xl font-bold hover:bg-[#166534] transition-all flex items-center justify-center gap-2">
                  <FaCheckCircle /> {editingMember ? 'Update Member' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
