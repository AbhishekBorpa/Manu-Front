import {
  useEffect,
  useState,
} from "react";

import {
  FaUsers,
  FaMapMarkerAlt,
  FaTools,
} from "react-icons/fa";



/* 🔥 ICON MAP */
const iconMap = {
  users: <FaUsers />,
  location: <FaMapMarkerAlt />,
  tools: <FaTools />,
};




const Stats = () => {

  const [stats, setStats] =
    useState([]);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH DATA */
  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const res =
            await fetch(
              import.meta.env.VITE_API_URL + "/stats"
            );

          const data =
            await res.json();

          setStats(
            data.stats ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchStats();

  }, []);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="bg-white py-10">

        <p className="text-center text-gray-500 animate-pulse">

          Loading stats...

        </p>

      </section>
    );
  }




  /* ❌ NO DATA */
  if (
    !stats ||
    stats.length === 0
  ) {
    return null;
  }




  return (
    <section className="bg-white py-10">

      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 MAIN BOX */}
        <div className="bg-[#f5f5f5] rounded-[24px] px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm border border-gray-100">

          {stats.map(
            (
              item,
              index
            ) => (

              <div
                key={item._id}
                className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start relative"
              >

                {/* 🔥 BORDER */}
                {index !== 0 && (

                  <div className="hidden md:block absolute -left-10 h-12 w-[1px] bg-gray-300"></div>

                )}



                {/* 🔥 ICON */}
                <div className="w-16 h-16 rounded-full bg-[#14532D] text-white flex items-center justify-center text-[26px] shadow-md">

                  {iconMap[item.icon]}

                </div>



                {/* 🔥 TEXT */}
                <div>

                  <h3 className="text-[32px] font-bold text-[#14532D] leading-none">

                    {item.value}

                  </h3>



                  <p className="text-gray-600 text-[15px] mt-2 font-medium">

                    {item.label}

                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default Stats;