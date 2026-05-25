import { useEffect, useState } from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { API_BASE_URL, getServerUrl } from "../api/config";
import appImage from "../../Image.jpeg";

const DEFAULT_APP_BANNER = {
  title: "Get the Ultraclap Mobile App",
  description:
    "Source industrial machinery, contact verified suppliers, and manage B2B leads — all from your phone.",
  image: appImage,
  playStoreLink: "https://play.google.com/store",
  appStoreLink: "https://www.apple.com/app-store/",
};

const AppBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/app-banner`);
        const resData = await res.json();

        if (res.ok && resData.banner) {
          setData(resData.banner);
        } else if (res.ok && resData.title) {
          setData(resData);
        } else {
          setData(DEFAULT_APP_BANNER);
        }
      } catch (err) {
        console.error("App banner fetch error:", err);
        setData(DEFAULT_APP_BANNER);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const banner = data || DEFAULT_APP_BANNER;
  const imageSrc = banner.image?.startsWith("http")
    ? banner.image
    : getServerUrl(banner.image) || DEFAULT_APP_BANNER.image;

  if (loading) {
    return (
      <section className="bg-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-56 md:h-72 bg-gray-100 rounded-3xl animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden bg-[#14532D] rounded-3xl shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-10 p-5 md:p-8 lg:p-10">
            {/* App preview image */}
            <div className="w-full lg:w-[42%] flex justify-center shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full scale-110" />
                <div className="relative bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-[2rem] border border-white/20 shadow-2xl">
                  <img
                    src={imageSrc}
                    alt="Ultraclap mobile app"
                    className="w-[180px] sm:w-[220px] md:w-[260px] h-[280px] sm:h-[320px] md:h-[360px] object-cover rounded-[1.5rem] border-4 border-white/30"
                    onError={(e) => {
                      e.target.src = DEFAULT_APP_BANNER.image;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Text + store buttons */}
            <div className="flex-1 text-center lg:text-left text-white">
              <p className="text-green-200 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Download Now
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                {banner.title}
              </h2>
              <p className="text-green-100/90 text-sm md:text-base mt-3 md:mt-4 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {banner.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 mt-6 md:mt-8">
                <a
                  href={banner.playStoreLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-white text-[#14532D] w-full sm:w-auto min-w-[180px] px-5 py-3 rounded-xl text-sm font-bold hover:scale-105 transition shadow-lg"
                >
                  <FaGooglePlay className="text-lg" />
                  Google Play
                </a>
                <a
                  href={banner.appStoreLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-white/10 border border-white/30 text-white w-full sm:w-auto min-w-[180px] px-5 py-3 rounded-xl text-sm font-bold hover:bg-white/20 transition"
                >
                  <FaApple className="text-lg" />
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
