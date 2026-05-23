import { X } from "lucide-react";
import { useState } from "react";

const AddModal = ({
  isOpen,
  onClose,
  activeMenu,
  formData,
  setFormData,
  setImageFile,
  onSubmit,
  categories = [],
  mainCategories = []
}) => {
  const [descTab, setDescTab] = useState("short");
  if (!isOpen) return null;

  // Find subcategories for the selected category
  const selectedCategoryData = categories.find(cat => cat.name === formData.category);
  const subcategoryOptions = selectedCategoryData?.subcategories || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#081120] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-white">Add New {activeMenu.slice(0, -1)}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* SUB CATEGORY FIELDS */}
          {activeMenu === "Sub Categories" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Subcategory Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Main Category</label>
                <select 
                  value={formData.parentCategory} 
                  onChange={(e) => setFormData({...formData, parentCategory: e.target.value})} 
                  className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
                  required
                >
                  <option value="">Select Main Category</option>
                  {mainCategories.map((mc) => (
                    <option key={mc._id} value={mc._id}>{mc.title}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* PRODUCT / SERVICE FIELDS */}
          {(activeMenu === "Products" || activeMenu === "Main Category") && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  {activeMenu === "Main Category" ? "Name" : "Title"}
                </label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              
              {activeMenu === "Products" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Category</label>
                      <select 
                        value={formData.category} 
                        onChange={(e) => {
                          setFormData({...formData, category: e.target.value, subcategory: ""});
                        }} 
                        className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Subcategory</label>
                      <select 
                        value={formData.subcategory} 
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})} 
                        className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
                      >
                        <option value="">Select Subcategory</option>
                        {subcategoryOptions.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Mobile Number</label>
                      <input type="text" value={formData.mobileNumber} onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</label>
                      <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
                      <button 
                        type="button"
                        onClick={() => setDescTab("short")}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${descTab === 'short' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      >
                        Short Desc
                      </button>
                      <button 
                        type="button"
                        onClick={() => setDescTab("long")}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${descTab === 'long' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
                      >
                        Long Desc
                      </button>
                    </div>

                    {descTab === "short" ? (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Short Description</label>
                        <textarea value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-green-500 outline-none transition-all min-h-[100px]" required />
                      </div>
                    ) : (
                      <div className="space-y-2 animate-in fade-in duration-300">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Long Description</label>
                        <textarea value={formData.longDescription} onChange={(e) => setFormData({...formData, longDescription: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-green-500 outline-none transition-all min-h-[150px]" required />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeMenu === "Users" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Role</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all">
                  <option value="user">User</option>
                  <option value="partner">Partner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          )}

          {activeMenu === "Leads" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Project Description</label>
                <input type="text" value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Budget</label>
                  <input type="text" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                </div>
              </div>
            </div>
          )}

          {activeMenu === "Orders" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order ID</label>
                  <input type="text" placeholder="e.g. ORD-123" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Amount (₹)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Customer Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all">
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Payment Status</label>
                  <select value={formData.paymentStatus} onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all">
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "Subscribers" && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
            </div>
          )}

          {/* Image Upload */}
          {["Products", "Sub Categories"].includes(activeMenu) && (
            <div className="space-y-2 pb-4">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">{activeMenu === "Sub Categories" ? "Subcategory Icon" : "Image"}</label>
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-400 transition-all cursor-pointer" />
            </div>
          )}
          
          <button type="submit" className="w-full h-[45px] mt-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm transition-all shadow-lg shadow-green-600/20">
            Save {activeMenu.slice(0, -1)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
