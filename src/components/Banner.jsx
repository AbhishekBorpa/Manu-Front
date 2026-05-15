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
              import.meta.env.VITE_API_URL + "/app-banner"
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
    <section className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-[#14532D] rounded-2xl px-8 py-6 flex items-center justify-between gap-8 shadow-xl">

          {/* 🔥 IMAGE */}
          <div className="flex items-center gap-4">

            <img
              src={data.image}
              alt="App"
              className="w-[140px] object-contain"
            />

          </div>



          {/* 🔥 TEXT */}
          <div className="flex-1 text-white">

            <h2 className="text-2xl font-bold">
              {data.title}
            </h2>

            <p className="text-green-100 text-sm mt-1">
              {data.description}
            </p>

          </div>



          {/* 🔥 BUTTONS */}
          <div className="flex items-center gap-4">

            <a
              href={data.playStoreLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-white text-[#14532D] px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition"
            >
              <FaGooglePlay className="text-lg" />

              Google Play
            </a>



            <a
              href={data.appStoreLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-white text-[#14532D] px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition"
            >
              <FaApple className="text-lg" />

              App Store
            </a>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AppBanner;