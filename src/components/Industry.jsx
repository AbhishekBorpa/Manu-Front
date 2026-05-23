import {
  useEffect,
  useState,
} from "react";

import {
  FaCar,
  FaFlask,
  FaBuilding,
  FaIndustry,
  FaBoxes,
  FaCogs,
  FaBolt,
  FaMicrochip,
  FaTshirt,
  FaUtensils,
} from "react-icons/fa";

import { API_BASE_URL } from "../api/config";



/* 🔥 ICON MAP */
const iconMap = {
  car: <FaCar />,
  flask: <FaFlask />,
  building: <FaBuilding />,
  industry: <FaIndustry />,
  boxes: <FaBoxes />,
  cogs: <FaCogs />,
  bolt: <FaBolt />,
  microchip: <FaMicrochip />,
  shirt: <FaTshirt />,
  utensils: <FaUtensils />,
};



/* 🔥 TEXT COLOR MAP */
const textColorMap = {
  "bg-red-500": "text-red-600",
  "bg-blue-500": "text-blue-700",
  "bg-yellow-500": "text-yellow-600",
  "bg-green-600": "text-green-700",
  "bg-purple-500": "text-purple-700",
  "bg-indigo-500": "text-indigo-700",
  "bg-orange-500": "text-orange-600",
  "bg-pink-500": "text-pink-600",
  "bg-cyan-500": "text-cyan-700",
  "bg-emerald-500": "text-emerald-700",
};




const IndustriesCards = () => {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH INDUSTRIES */
  useEffect(() => {

    const fetchIndustries =
      async () => {

        try {

          const res =
            await fetch(`${API_BASE_URL}/industries`);

          const result =
            await res.json();

          setData(
            result.industries ||
            result
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchIndustries();

  }, []);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="py-16 bg-[#f7f7f7]">

        <p className="text-center text-gray-500 animate-pulse">

          Loading industries...

        </p>

      </section>
    );
  }




  /* ❌ NO DATA */
  if (
    !data ||
    data.length === 0
  ) {
    return null;
  }




  return (
    <section className="py-12 md:py-16 bg-[#f7f7f7]">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* 🔥 TOP */}
        <div className="text-center mb-10 md:mb-14 px-4">

          <h2 className="text-2xl md:text-4xl font-bold text-[#14532D]">

            Industries We Serve

          </h2>



          <p className="text-gray-500 mt-2 md:mt-3 text-sm md:text-lg">

            Providing smart industrial solutions across multiple sectors

          </p>

        </div>



        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-7 pt-6 md:pt-0">

          {data.map(
            (
              item,
              index
            ) => (

              <div
                key={item._id}
                className="relative bg-white rounded-[24px] md:rounded-[34px] border-[2px] md:border-[3px] border-gray-200 px-5 md:px-6 pt-16 md:pt-20 pb-10 md:pb-12 min-h-[300px] md:min-h-[360px] shadow-sm hover:shadow-xl transition duration-300"
              >

                {/* 🔥 ICON */}
                <div
                  className={`absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full ${item.color} flex items-center justify-center text-white text-2xl md:text-3xl border-[4px] md:border-[5px] border-white shadow-md`}
                >

                  {iconMap[item.icon]}

                </div>



                {/* 🔥 TITLE */}
                <h3
                  className={`text-center font-extrabold text-[18px] md:text-[20px] leading-tight md:leading-7 mt-2 md:mt-3 ${
                    textColorMap[
                      item.color
                    ]
                  }`}
                >

                  {item.title}

                </h3>



                {/* 🔥 DESC */}
                <p className="text-center text-gray-700 text-[14px] md:text-[16px] leading-relaxed md:leading-8 mt-4 md:mt-6">

                  {item.desc}

                </p>



                {/* 🔥 NUMBER */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">

                  <div
                    className={`${item.color} text-white px-5 md:px-7 py-1.5 md:py-2 rounded-t-[10px] md:rounded-t-[14px] text-xs md:text-sm font-bold tracking-[2px] md:tracking-[3px] shadow`}
                  >

                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default IndustriesCards;