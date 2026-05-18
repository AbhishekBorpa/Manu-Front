import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaBox, FaEdit, FaTrashAlt, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { API_BASE_URL } from '../../api/config';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    stock: 0,
    price: '',
    description: ''
  });

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/partner/inventory`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    } catch (err) {
      console.error("Fetch inventory error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = isEditMode 
        ? `${API_BASE_URL}/partner/inventory/${editingItemId}`
        : `${API_BASE_URL}/partner/inventory`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingItemId(null);
        setFormData({ name: '', category: '', sku: '', stock: 0, price: '', description: '' });
        fetchInventory();
      } else {
        const data = await res.json();
        alert(data.msg || "Operation failed");
      }
    } catch (err) {
      console.error("Inventory error:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      sku: item.sku,
      stock: item.stock,
      price: item.price,
      description: item.description || ''
    });
    setEditingItemId(item._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/partner/inventory/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          fetchInventory();
        } else {
          alert("Failed to delete item");
        }
      } catch (err) {
        console.error("Delete inventory error:", err);
      }
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
          <p className="text-slate-500 text-sm">Update your machinery stock and listing prices.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#14532D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#166534] transition-all flex items-center gap-2"
        >
          <FaPlus /> Add New Item
        </button>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by SKU or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-green-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                        <FaBox />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{item.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.stock === 0 ? 'w-0' : item.stock < 5 ? 'w-1/3 bg-orange-500' : 'w-3/4 bg-green-500'}`}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{item.stock} Units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${
                      item.status === 'In Stock' ? 'text-green-600' :
                      item.status === 'Low Stock' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {(item.status === 'In Stock' || item.stock > 5) && <FaCheckCircle />}
                      {(item.status === 'Low Stock' || (item.stock > 0 && item.stock <= 5)) && <FaExclamationTriangle />}
                      {(item.status === 'Out of Stock' || item.stock === 0) && <FaExclamationTriangle />}
                      {item.stock === 0 ? 'Out of Stock' : item.stock <= 5 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-[#14532D] p-6 text-white flex items-center justify-between">
              <h3 className="text-xl font-bold">{isEditMode ? 'Edit Machine' : 'Add New Machine'}</h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingItemId(null);
                  setFormData({ name: '', category: '', sku: '', stock: 0, price: '', description: '' });
                }}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Machine Name</label>
                  <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">SKU ID</label>
                  <input required value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Category</label>
                  <input required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" placeholder="e.g. Paper Cup" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Price</label>
                  <input required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" placeholder="e.g. ₹4.5L" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Stock Quantity</label>
                <input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500/20" />
              </div>
              <button type="submit" className="w-full py-3 bg-[#14532D] text-white rounded-xl font-bold hover:bg-slate-900 transition-all">
                {isEditMode ? 'Update Machine' : 'Save to Inventory'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
