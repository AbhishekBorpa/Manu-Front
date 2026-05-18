import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaFilter, 
  FaThLarge, 
  FaList, 
  FaStar,
  FaCheckCircle,
  FaTimes
} from "react-icons/fa";
import LeadModal from "../components/LeadModal";
import { getServerUrl, getLocalFallback } from "../api/config";


const AllProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "All Categories");
  const [priceRange, setPriceRange] = useState(6000000);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({ industry: [], machine: [] });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync state with URL
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory("All Categories");
    }
  }, [urlCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All Categories") {
      navigate("/all-products");
    } else {
      navigate(`/all-products?category=${cat}`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/categories");
        const data = await res.json();
        if (data.success) {
          const grouped = data.categories.reduce((acc, cat) => {
            const type = cat.type || 'machine';
            if (!acc[type]) acc[type] = [];
            acc[type].push(cat.name);
            return acc;
          }, { industry: [], machine: [] });
          setCategories(grouped);
        }
      } catch (err) {
        console.error("Categories Fetch Error:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch( (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/products");
        const data = await res.json();
        
        if (data.success) {
          console.log("FETCHED PRODUCTS:", data.products);
          let filtered = data.products;
          
          // Apply Category Filter from State
          const catToFilter = selectedCategory;
          if (catToFilter && catToFilter !== "All Categories") {
            const lowerCat = catToFilter.toLowerCase();
            filtered = filtered.filter(p => 
              p.category?.toLowerCase() === lowerCat || 
              p.title.toLowerCase().includes(lowerCat) ||
              p.desc?.toLowerCase().includes(lowerCat)
            );
          }

          // Apply Search Filter
          if (search) {
            filtered = filtered.filter(p => 
              p.title.toLowerCase().includes(search.toLowerCase()) ||
              p.desc?.toLowerCase().includes(search.toLowerCase())
            );
          }

          // Apply Price Filter
          filtered = filtered.filter(p => (p.price || 0) <= priceRange);

          setProducts(filtered);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, selectedCategory, priceRange]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      
      {/* 🔥 PREMIUM HERO HEADER */}
      <div className="bg-[#14532D] pt-12 md:pt-24 pb-6 md:pb-12 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight mb-1 md:mb-4">
                Industrial <span className="text-green-400">Marketplace</span>
              </h1>
              <p className="text-green-100/70 font-medium max-w-xl text-xs md:text-base">
                Explore the world's largest collection of manufacturing machinery and industrial supplies.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 md:gap-4 text-white/60 text-[10px] md:text-sm font-bold bg-black/20 backdrop-blur-md px-3 md:px-6 py-1.5 md:py-3 rounded-xl md:rounded-2xl border border-white/10 w-fit">
              <span>{products.length} Products Found</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 FILTER & SEARCH STRIP */}
      <div className="sticky top-[72px] md:top-[88px] z-[100] bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-4 flex items-center justify-between gap-2 md:gap-4">
          
          {/* Search */}
          <div className="flex-1 min-w-0 relative group">
            <FaSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14532D] transition-colors text-xs md:text-sm" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-8 md:pl-12 pr-3 py-1.5 md:py-3 bg-slate-100 border-none rounded-lg md:rounded-2xl text-[11px] md:text-sm font-medium focus:ring-2 focus:ring-[#14532D]/20 focus:bg-white transition-all outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 md:gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 md:px-5 py-1.5 md:py-3 bg-white border border-slate-200 rounded-lg md:rounded-2xl text-[11px] md:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
            >
              <FaFilter className="text-[#14532D] text-[10px] md:text-sm" />
              <span>Filters</span>
            </button>
            <div className="h-6 md:h-10 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
            <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg md:rounded-xl">
              <button className="p-1.5 md:p-2 bg-white shadow-sm text-[#14532D] rounded-md md:rounded-lg"><FaThLarge className="text-xs md:text-base" /></button>
              <button className="p-1.5 md:p-2 text-slate-400"><FaList className="text-xs md:text-base" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE FILTER DRAWER */}
      {showFilters && (
        <div className="fixed inset-0 z-[2000]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-[300px] bg-white p-6 md:p-8 shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <h3 className="text-xl font-black text-slate-900">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-slate-100 rounded-full">
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* All Categories Reset */}
              <button
                onClick={() => {
                  handleCategorySelect("All Categories");
                  setShowFilters(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  selectedCategory === "All Categories" 
                    ? 'bg-[#14532D] text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                All Categories
              </button>

              {/* Industries */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Industries & Materials</h4>
                <div className="space-y-2">
                  {categories.industry.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#14532D] text-white shadow-lg' 
                          : 'bg-slate-50 text-slate-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Machine Types */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Machine Types</h4>
                <div className="space-y-2">
                  {categories.machine.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#14532D] text-white shadow-lg' 
                          : 'bg-slate-50 text-slate-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Price Range</h4>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="6000000" 
                    step="50000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full accent-[#14532D]" 
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-black text-slate-400 uppercase">
                    <span>₹0</span>
                    <span>Up to ₹{(priceRange/100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-6 md:gap-10">
        
        {/* 🔥 SIDEBAR FILTERS (Desktop Only) */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-[180px] space-y-10">
            
            {/* All Categories Reset */}
            <button
              onClick={() => handleCategorySelect("All Categories")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === "All Categories" 
                  ? 'bg-[#14532D] text-white shadow-lg shadow-green-900/20' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              All Categories
            </button>

            {/* Industry Filter */}
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Industries</h4>
              <div className="space-y-2">
                {categories.industry.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#14532D] text-white shadow-lg shadow-green-900/20' 
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Machine Filter */}
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Machine Types</h4>
              <div className="space-y-2">
                {categories.machine.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#14532D] text-white shadow-lg shadow-green-900/20' 
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Price Range</h4>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="6000000" 
                  step="50000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-[#14532D]" 
                />
                <div className="flex justify-between mt-2 text-[10px] font-black text-slate-400 uppercase">
                  <span>₹0</span>
                  <span>Up to ₹{(priceRange/100000).toFixed(1)}L</span>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl p-6 text-white text-center">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <FaStar className="text-yellow-400" />
              </div>
              <h5 className="font-bold mb-2 text-sm">Partner with Experts</h5>
              <p className="text-[10px] text-white/50 leading-relaxed mb-4">Connect with verified manufacturers for custom engineering solutions.</p>
              <button className="w-full py-2.5 bg-green-500 text-[#14532D] rounded-xl text-xs font-black hover:bg-green-400 transition-colors">Apply as Partner</button>
            </div>
          </div>
        </aside>

        {/* 🔥 MAIN GRID */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-[32px] p-4 h-[350px] md:h-[400px] animate-pulse border border-slate-100">
                  <div className="w-full h-40 md:h-48 bg-slate-100 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-2/3 mb-4"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
              {products.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate("/product-details", { state: item })}
                  className="group bg-white rounded-[32px] md:rounded-[40px] p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative"
                >
                  {/* Verified Badge */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center gap-1.5 border border-slate-100">
                    <FaCheckCircle className="text-green-500 text-[8px] md:text-[10px]" />
                    <span className="text-[8px] md:text-[9px] font-black text-slate-800 uppercase tracking-wider">Verified</span>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] aspect-[4/3] mb-4 md:mb-6">
                    <img
                      src={getServerUrl(item.image || item.img) || getLocalFallback(item.title, item.category)}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = getLocalFallback(item.title, item.category);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="px-1 md:px-2 pb-2">
                    <div className="flex items-center gap-2 mb-1.5 md:mb-2 text-[#14532D] text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                      <span>{item.category || 'Industrial'}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span className="text-slate-400">New Arrival</span>
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-slate-800 mb-1.5 md:mb-2 group-hover:text-[#14532D] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 line-clamp-2 mb-4 md:mb-6 font-medium leading-relaxed">
                      {item.desc || 'High-performance industrial machinery designed for precision and durability.'}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <FaMapMarkerAlt className="text-slate-400 text-[10px] md:text-xs" />
                        <span className="text-[10px] md:text-xs font-bold text-slate-600">{item.location || 'New Delhi'}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5 md:mb-1">Wholesale Price</p>
                        <p className="text-lg md:text-xl font-black text-slate-900 leading-none">
                          ₹{item.price >= 100000 ? `${(item.price/100000).toFixed(1)}L` : item.price?.toLocaleString()} 
                          <span className="text-xs text-slate-400 font-bold ml-1">*</span>
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                        setSelectedProduct(item);
                      }}
                      className="mt-4 md:mt-6 w-full py-3 md:py-4 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold text-xs md:text-sm shadow-xl shadow-slate-900/10 hover:bg-[#14532D] hover:shadow-green-900/20 transition-all active:scale-95"
                    >
                      Contact Supplier
                    </button>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center bg-white rounded-[32px] md:rounded-[48px] border border-dashed border-slate-200">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <FaTimes className="text-slate-200 text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">No Matching Machines</h3>
              <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mb-6 md:mb-8 px-4">We couldn't find any products matching your current filters. Try adjusting your search or category.</p>
              <button 
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All Categories");
                  setPriceRange(6000000);
                  navigate("/all-products");
                }}
                className="px-6 md:px-8 py-2.5 md:py-3 bg-[#14532D] text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-green-900/20 active:scale-95 text-xs md:text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
        partnerId={selectedProduct?.partnerId}
      />
    </div>
  );
};


export default AllProductsPage;