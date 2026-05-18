import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaCogs,
  FaBox,
  FaIndustry,
  FaTools,
} from "react-icons/fa";
import LeadModal from "./LeadModal";




/* 🔥 ICON MAP */
const iconMap = {
  cogs: <FaCogs />,
  box: <FaBox />,
  industry: <FaIndustry />,
  tools: <FaTools />,
};




const FeaturedProducts = () => {

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);





  /* 🔥 FETCH PRODUCTS */
  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/products/featured"
            );

          const data =
            await res.json();

          setProducts(
            data.products ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchProducts();

  }, []);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="py-16 bg-[#f5f7f6]">

        <p className="text-center text-gray-500 animate-pulse">

          Loading products...

        </p>

      </section>
    );
  }




  /* ❌ NO PRODUCTS */
  if (
    !products ||
    products.length === 0
  ) {
    return null;
  }




  return (
    <section className="py-10 md:py-16 bg-[#f5f7f6]">

      {/* 🔥 TOP */}
      <div className="text-center mb-8 md:mb-12 px-4">

        <h2 className="text-2xl md:text-4xl font-bold text-[#14532D]">

          Featured Machines & Products

        </h2>

      </div>



      {/* 🔥 GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map(
          (item) => (

            <div
              key={item._id}
              onClick={() =>
                navigate(`/all-products?category=${item.category}`)
              }
              className="group bg-white rounded-2xl md:rounded-[22px] border border-gray-200 shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
            >

              {/* 🔥 IMAGE AREA */}
              <div className="relative h-[140px] md:h-[165px] overflow-hidden">

                {/* 🔥 IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />



                {/* 🔥 CURVE */}
                <div className="absolute bottom-0 left-0 w-[80px] md:w-[110px] h-[60px] md:h-[85px] bg-white rounded-tr-[70px] md:rounded-tr-[90px]"></div>



                {/* 🔥 ICON */}
                <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 w-[50px] md:w-[74px] h-[50px] md:h-[74px] rounded-full bg-[#2E9635] border-[3px] md:border-[5px] border-white flex items-center justify-center text-white text-xl md:text-3xl shadow-lg">

                  {iconMap[item.icon]}

                </div>

              </div>



              {/* 🔥 CONTENT */}
              <div className="px-4 md:px-5 pt-3 md:pt-4 pb-4 md:pb-5">

                {/* 🔥 TITLE */}
                <h3 className="text-[16px] md:text-[18px] font-extrabold text-[#14532D] uppercase leading-tight md:leading-6">

                  {item.title}

                </h3>



                {/* 🔥 DESC */}
                <p className="text-gray-700 mt-2 md:mt-3 text-[13px] md:text-[15px] leading-relaxed md:leading-7 min-h-[70px] md:min-h-[95px]">

                  {item.desc}

                </p>



                {/* 🔥 HOVER LINE */}
                <div className="mt-4 md:mt-5 w-10 md:w-12 group-hover:w-16 md:group-hover:w-24 h-[4px] md:h-[5px] bg-[#14532D] rounded-full transition-all duration-300"></div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                    setSelectedProduct(item);
                  }}
                  className="mt-5 md:mt-6 w-full py-2.5 md:py-3 bg-[#14532D] text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-md hover:bg-slate-900 transition-all active:scale-95"
                >
                  Contact Supplier
                </button>
              </div>


            </div>
          )
        )}

      </div>



      {/* 🔥 BUTTON */}
      <div className="text-center mt-10 md:mt-12">

        <button
          onClick={() =>
            navigate("/all-products")
          }
          className="bg-[#14532D] hover:bg-[#166534] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm md:text-base transition"
        >

          View All Products

        </button>

      </div>


      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
        partnerId={selectedProduct?.partnerId}
      />
    </section>
  );
};


export default FeaturedProducts;