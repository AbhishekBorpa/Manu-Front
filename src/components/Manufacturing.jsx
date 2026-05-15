import {
  useEffect,
  useState,
} from "react";

import {
  FaStar,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

const Manufacturing = () => {

  const navigate =
    useNavigate();

  const [
    manufacturingData,
    setManufacturingData,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH DATA */
  useEffect(() => {

    const fetchManufacturing =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/manufacturing"
            );

          const data =
            await res.json();

          setManufacturingData(
            data.manufacturing ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchManufacturing();

  }, []);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="bg-white py-16">

        <p className="text-center text-gray-500 animate-pulse">

          Loading manufacturing...

        </p>

      </section>
    );
  }




  /* ❌ NO DATA */
  if (
    !manufacturingData ||
    manufacturingData.length === 0
  ) {
    return null;
  }




  return (
    <section className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 HEADER */}
        <div className="mb-10">

          <h2 className="text-4xl font-bold text-gray-900">

            Choose Your Manufacturing

          </h2>



          <p className="text-gray-500 mt-3">

            Explore premium industrial manufacturing solutions

          </p>

        </div>



        {/* 🔥 GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {manufacturingData.map(
            (item) => (

              <div
                key={item._id}
                onClick={() =>
                  navigate(
                    `/search?q=${item.category}`
                  )
                }
                className="cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >

                {/* 🔥 IMAGE */}
                <div className="relative overflow-hidden">

                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 object-cover transition duration-500 group-hover:scale-110"
                  />



                  {/* 🔥 TAG */}
                  <span className="absolute top-3 left-3 bg-[#14532D] text-white text-[11px] px-3 py-1 rounded-full shadow">

                    {item.tag}

                  </span>



                  {/* 🔥 RATING */}
                  <span className="absolute bottom-3 right-3 bg-white text-black text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow">

                    <FaStar className="text-yellow-500 text-[11px]" />

                    {item.rating}

                  </span>

                </div>



                {/* 🔥 CONTENT */}
                <div className="p-4">

                  <h3 className="text-[14px] font-semibold text-gray-800 leading-6 min-h-[55px] group-hover:text-[#14532D] transition">

                    {item.title}

                  </h3>



                  <p className="text-sm font-bold text-[#14532D] mt-2">

                    {item.price}

                  </p>



                  {/* 🔥 LINE */}
                  <div className="mt-4 w-10 h-[4px] bg-[#14532D] rounded-full group-hover:w-20 transition-all duration-300"></div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default Manufacturing;