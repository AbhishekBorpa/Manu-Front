import React from 'react';
import { FaPlus, FaSearch, FaBox, FaEdit, FaTrashAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Inventory = () => {
  const items = [
    { id: 1, name: 'Semi-Auto Paper Cup Machine', category: 'Paper Cup', sku: 'PC-200-SA', stock: 12, price: '₹4.5L', status: 'In Stock' },
    { id: 2, name: 'High-Speed Fully Auto Machine', category: 'Paper Cup', sku: 'PC-500-FA', stock: 3, price: '₹12.8L', status: 'Low Stock' },
    { id: 3, name: 'Paper Bag Making Machine', category: 'Packaging', sku: 'PB-100-WM', stock: 0, price: '₹6.2L', status: 'Out of Stock' },
    { id: 4, name: 'Disposable Plate Hydraulic Press', category: 'Plates', sku: 'DP-HYD-01', stock: 8, price: '₹2.1L', status: 'In Stock' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
          <p className="text-slate-500 text-sm">Update your machinery stock and listing prices.</p>
        </div>
        <button className="bg-[#14532D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#166534] transition-all flex items-center gap-2">
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
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-green-500 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
          {['All Items', 'In Stock', 'Out of Stock'].map((tab, i) => (
            <button key={tab} className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${i === 0 ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
              {tab}
            </button>
          ))}
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
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
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
                      {item.status === 'In Stock' && <FaCheckCircle />}
                      {item.status === 'Low Stock' && <FaExclamationTriangle />}
                      {item.status === 'Out of Stock' && <FaExclamationTriangle />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><FaEdit /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
