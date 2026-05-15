import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCogs, FaCar, FaBolt, FaTools, FaIndustry, FaBoxes, FaScrewdriver, FaFlask, FaChevronRight
} from "react-icons/fa";

/* 🔥 ICON MAP */
const iconMap = {
  cogs: <FaCogs />,
  car: <FaCar />,
  bolt: <FaBolt />,
  tools: <FaTools />,
  industry: <FaIndustry />,
  boxes: <FaBoxes />,
  screwdriver: <FaScrewdriver />,
  flask: <FaFlask />,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* 🔥 FETCH DATA */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/categories");
        const data = await res.json();
        setCategories(data.categories || data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium animate-pulse">Curating top categories...</p>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-2xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 🔥 HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#14532D] font-bold text-sm tracking-[0.2em] uppercase mb-3 block">Marketplace</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Browse By <span className="text-[#14532D]">Categories</span>
            </h2>
          </div>
          <button 
            onClick={() => navigate('/all-products')}
            className="group flex items-center gap-2 px-6 py-3 bg-slate-50 hover:bg-[#14532D] text-slate-700 hover:text-white rounded-2xl font-bold transition-all duration-300"
          >
            View All Industries
            <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-6">
          {categories.slice(0, 8).map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/all-products?category=${cat.name}`)}
              className="group relative flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* 🔥 ICON CONTAINER */}
              <div className="relative z-10 mb-5 w-16 h-16 bg-slate-50 group-hover:bg-[#14532D] rounded-2xl flex items-center justify-center text-2xl text-slate-600 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 shadow-inner group-hover:shadow-green-900/20">
                {iconMap[cat.icon] || <FaCogs />}
              </div>

              {/* 🔥 TEXT */}
              <p className="relative z-10 text-sm font-extrabold text-slate-700 group-hover:text-slate-900 text-center leading-tight">
                {cat.name}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#14532D] group-hover:w-1/2 transition-all duration-500 rounded-t-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;