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




  /* 🔥 FETCH PRODUCTS */
  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const res =
            await fetch(
              import.meta.env.VITE_API_URL + "/products/featured"
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
    <section className="py-16 bg-[#f5f7f6]">

      {/* 🔥 TOP */}
      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-[#14532D]">

          Featured Machines & Products

        </h2>

      </div>



      {/* 🔥 GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map(
          (item) => (

            <div
              key={item._id}
              onClick={() =>
                navigate("/products")
              }
              className="group bg-white rounded-[22px] border border-gray-200 shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
            >

              {/* 🔥 IMAGE AREA */}
              <div className="relative h-[165px] overflow-hidden">

                {/* 🔥 IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />



                {/* 🔥 CURVE */}
                <div className="absolute bottom-0 left-0 w-[110px] h-[85px] bg-white rounded-tr-[90px]"></div>



                {/* 🔥 ICON */}
                <div className="absolute bottom-5 left-5 w-[74px] h-[74px] rounded-full bg-[#2E9635] border-[5px] border-white flex items-center justify-center text-white text-3xl shadow-lg">

                  {iconMap[item.icon]}

                </div>

              </div>



              {/* 🔥 CONTENT */}
              <div className="px-5 pt-4 pb-5">

                {/* 🔥 TITLE */}
                <h3 className="text-[18px] font-extrabold text-[#14532D] uppercase leading-6">

                  {item.title}

                </h3>



                {/* 🔥 DESC */}
                <p className="text-gray-700 mt-3 text-[15px] leading-7 min-h-[95px]">

                  {item.desc}

                </p>



                {/* 🔥 HOVER LINE */}
                <div className="mt-5 w-12 group-hover:w-24 h-[5px] bg-[#14532D] rounded-full transition-all duration-300"></div>

              </div>

            </div>
          )
        )}

      </div>



      {/* 🔥 BUTTON */}
      <div className="text-center mt-12">

        <button
          onClick={() =>
            navigate("/products")
          }
          className="bg-[#14532D] hover:bg-[#166534] text-white px-8 py-3 rounded-xl font-semibold transition"
        >

          View All Products

        </button>

      </div>

    </section>
  );
};

export default FeaturedProducts;