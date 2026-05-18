import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaArrowLeft, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import LeadModal from "../components/LeadModal";
import { API_BASE_URL, getServerUrl } from "../api/config";

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const product = state;

  useEffect(() => {
    if (!product) return;

    const fetchRelatedProducts = async () => {
      try {
        setLoadingRelated(true);
        const res = await fetch(`${API_BASE_URL}/products`);
        const data = await res.json();
        if (data.success) {
          // Filter related products by category and exclude current product
          const filtered = data.products.filter(
            (item) =>
              item.category === product.category &&
              item._id !== product._id
          );
          
          // Fallback if no same category products found
          if (filtered.length === 0) {
            setRelatedProducts(data.products.filter(item => item._id !== product._id).slice(0, 6));
          } else {
            setRelatedProducts(filtered.slice(0, 6));
          }
        }
      } catch (err) {
        console.error("Related Products Fetch Error:", err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No product data found</h2>
        <button 
          onClick={() => navigate("/all-products")}
          className="bg-[#14532D] text-white px-6 py-2 rounded-lg font-bold"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  return (
    <section className="bg-[#f5f7f6] min-h-screen py-4 md:py-10 px-4 md:px-6">
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-4 md:mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#14532D] font-bold text-xs md:text-sm transition-colors"
        >
          <FaArrowLeft size={10} /> Back
        </button>
      </div>

      {/* MAIN PRODUCT */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl md:rounded-[32px] shadow-sm overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="relative h-[250px] sm:h-[350px] md:h-[500px]">
             <img
              src={getServerUrl(product.image || product.img) || "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg"}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg";
              }}
            />
            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-md px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-black text-[#14532D] uppercase tracking-widest shadow-lg">
              {product.category || 'Industrial'}
            </div>
          </div>

          <div className="p-5 md:p-10 flex flex-col justify-center">
            <h2 className="text-xl md:text-4xl font-black text-[#14532D] leading-tight mb-3 md:mb-4">
              {product.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs md:text-sm">
                <FaMapMarkerAlt className="text-red-500" /> New Delhi, India
              </div>
              <div className="hidden sm:block h-4 w-[1px] bg-gray-200"></div>
              <div className="text-green-600 font-bold text-xs md:text-sm">In Stock</div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-xs md:text-base">
              {product.desc || "Experience top-tier industrial performance with this advanced machinery. Engineered for precision, high output, and long-term durability in demanding manufacturing environments."}
            </p>

            <div className="bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-slate-100">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Wholesale Price</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl md:text-4xl font-black text-slate-900 leading-none">₹{product.price?.toLocaleString() || '8,40,000'}</span>
                <span className="text-[10px] md:text-sm font-bold text-slate-400 pb-0.5 md:pb-1">* Excl. GST</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-[#14532D] hover:bg-[#166534] text-white py-3 md:py-4 rounded-xl font-bold shadow-lg shadow-green-900/10 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <FaEnvelope /> Contact Supplier
              </button>
              <button 
                className="flex-1 bg-white border-2 border-slate-200 text-slate-800 py-3 md:py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <FaPhoneAlt size={12} /> Call Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product}
        partnerId={product.partnerId}
      />


      {/* RELATED PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-10 md:mt-20">

        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className="text-lg md:text-2xl font-black text-slate-900">
            Similar <span className="text-[#14532D]">Machinery</span>
          </h3>
          <button onClick={() => navigate("/all-products")} className="text-[10px] md:text-xs font-black text-[#14532D] hover:underline uppercase tracking-widest">
            View All
          </button>
        </div>

        {loadingRelated ? (
          <div className="text-center py-10">
            <div className="w-8 h-8 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-500 text-xs animate-pulse">Loading similar machines...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate("/product-details", { state: item })
                }
                className="group bg-white rounded-xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-2 md:p-4 border border-gray-100 cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg md:rounded-xl h-32 md:h-44 mb-3 md:mb-4">
                  <img
                    src={getServerUrl(item.image || item.img) || "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = "https://res.cloudinary.com/djsxaigna/image/upload/v1778687629/manufacturing_b2b/tiwud4hv6wtvt4cbgozz.jpg";
                    }}
                  />
                </div>

                <div className="px-1">
                  <h4 className="text-[#14532D] font-extrabold text-[12px] md:text-base mb-1 group-hover:text-green-600 line-clamp-1">
                    {item.title}
                  </h4>

                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-1 md:mt-3 gap-1">
                    <p className="text-[14px] md:text-lg font-black text-slate-900 leading-none">
                      ₹ {item.price?.toLocaleString() || "8,40,000"}
                    </p>
                    <p className="text-[9px] md:text-xs text-gray-500 flex items-center gap-1 font-bold">
                      <FaMapMarkerAlt className="text-red-500 text-[8px] md:text-[10px]" /> {item.location || "New Delhi"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default ProductDetails;