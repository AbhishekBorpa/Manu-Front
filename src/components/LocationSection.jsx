import {
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  useState,
  useEffect,
} from "react";

const LocationSection = () => {

  const [cities, setCities] =
    useState([]);

  const [showAll, setShowAll] =
    useState(false);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH FROM BACKEND */
  useEffect(() => {

    const fetchCities =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/cities"
            );

          const data =
            await res.json();

          setCities(
            data.cities ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchCities();

  }, []);




  /* 🔥 SHOW DATA */
  const visibleCities =
    showAll
      ? cities
      : cities.slice(0, 20);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="bg-gray-50 py-16 text-center">

        <p className="text-gray-500 animate-pulse">

          Loading cities...

        </p>

      </section>
    );
  }




  /* ❌ NO DATA */
  if (
    !cities ||
    cities.length === 0
  ) {
    return null;
  }




  return (
    <section className="bg-gray-50 py-16">

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* 🔥 TOP TAG */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-[#14532D] px-4 py-2 rounded-full text-sm mb-4">

          <FaMapMarkerAlt />

          Service Locations

        </div>



        {/* 🔥 HEADING */}
        <h2 className="text-4xl font-bold text-gray-900 mb-3">

          Available in{" "}

          <span className="text-[#14532D]">

            {cities.length}+ Cities

          </span>

        </h2>



        <p className="text-gray-600 mb-10">

          Experience our premium home services across India

        </p>



        {/* 🔥 GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-8 text-left justify-center">

          {visibleCities.map(
            (city) => (

              <div
                key={city._id}
                className="flex items-center gap-2 text-gray-700"
              >

                <FaMapMarkerAlt className="text-[#14532D] text-sm" />

                {city.name}

              </div>
            )
          )}

        </div>



        {/* 🔥 BUTTON */}
        <button
          onClick={() =>
            setShowAll(
              !showAll
            )
          }
          className="mt-10 bg-[#14532D] hover:bg-[#166534] text-white px-6 py-3 rounded-lg font-medium transition"
        >

          {showAll
            ? "Show Less"
            : `View All ${cities.length} Cities`}

        </button>

      </div>

    </section>
  );
};

export default LocationSection;