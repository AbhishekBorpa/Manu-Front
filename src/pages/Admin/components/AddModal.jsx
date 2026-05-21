import { X } from "lucide-react";

const AddModal = ({
  isOpen,
  onClose,
  activeMenu,
  formData,
  setFormData,
  setImageFile,
  onSubmit,
  categories = []
}) => {
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
          {/* CATEGORY NAME */}
          {activeMenu === "Categories" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Category Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Subcategories (comma separated)</label>
                <input type="text" placeholder="e.g. Sub1, Sub2, Sub3" value={formData.subcategories} onChange={(e) => setFormData({...formData, subcategories: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
              </div>
            </div>
          )}

          {/* PRODUCT / SERVICE FIELDS */}
          {(activeMenu === "Products" || activeMenu === "Services") && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ""})} 
                    className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
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
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Price (₹)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-green-500 outline-none transition-all min-h-[100px]" required />
              </div>
            </div>
          )}

          {activeMenu === "Users" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b1220] border border-white/10 rounded-xl h-[45px] px-4 text-sm text-white focus:border-green-500 outline-none transition-all" required />
              </div>
            </div>
          )}

          {/* Image Upload */}
          {["Products", "Categories", "Services"].includes(activeMenu) && (
            <div className="space-y-2 pb-4">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">{activeMenu === "Categories" ? "Category Icon" : "Product Image"}</label>
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
