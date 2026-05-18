import {
  useEffect,
  useState,
} from "react";

import {
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const AppBanner = () => {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchBanner =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/app-banner"
            );

          const resData =
            await res.json();

          /* 🔥 SET DATA */
          setData(
            resData.banner ||
            resData
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchBanner();

  }, []);




  /* 🔄 LOADING */
  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }



  /* ❌ NO DATA */
  if (!data) {
    return null;
  }




  return (
    <section className="bg-white py-8 md:py-16">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="bg-[#14532D] rounded-2xl px-6 md:px-8 py-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-xl text-center md:text-left">

          {/* 🔥 IMAGE */}
          <div className="flex items-center justify-center">

            <img
              src={data.image}
              alt="App"
              className="w-[100px] md:w-[140px] object-contain"
            />

          </div>



          {/* 🔥 TEXT */}
          <div className="flex-1 text-white">

            <h2 className="text-xl md:text-2xl font-bold">
              {data.title}
            </h2>

            <p className="text-green-100 text-xs md:text-sm mt-2 md:mt-1">
              {data.description}
            </p>

          </div>



          {/* 🔥 BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full md:w-auto">

            <a
              href={data.playStoreLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-[#14532D] w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold hover:scale-105 transition shadow-lg"
            >
              <FaGooglePlay className="text-base md:text-lg" />

              Google Play
            </a>



            <a
              href={data.appStoreLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-[#14532D] w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold hover:scale-105 transition shadow-lg"
            >
              <FaApple className="text-base md:text-lg" />

              App Store
            </a>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AppBanner;