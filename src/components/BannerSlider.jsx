import {
  useState,
  useEffect,
} from "react";

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* 🔥 LOCAL IMAGES */
import slide1 from "../assets/slide-img1.jpg";
import slide2 from "../assets/slide-img2.jpg";
import slide3 from "../assets/slide-img3.jpg";
import slide4 from "../assets/slide-img4.jpg";

/* 🔥 IMAGE MAP */
const imageMap = {
  "slide-img1.jpg": slide1,
  "slide-img2.jpg": slide2,
  "slide-img3.jpg": slide3,
  "slide-img4.jpg": slide4,
};

const BannerSlider = () => {

  const [slides, setSlides] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  const [loading, setLoading] =
    useState(true);



  /* 🔥 FETCH SLIDERS */
  useEffect(() => {

    const fetchSlides =
      async () => {

        try {

          const res =
            await fetch(
              import.meta.env.VITE_API_URL + "/sliders"
            );

          const data =
            await res.json();

          setSlides(
            data.sliders ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchSlides();

  }, []);




  /* 🔥 AUTO SLIDE */
  useEffect(() => {

    if (
      slides.length === 0
    ) return;

    const interval =
      setInterval(() => {

        setCurrent(
          (prev) =>
            (prev + 1) %
            slides.length
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, [slides]);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="py-10 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="h-[300px] flex items-center justify-center bg-white rounded-2xl shadow">

            <p className="text-gray-500 text-lg animate-pulse">
              Loading banners...
            </p>

          </div>

        </div>

      </section>
    );
  }




  /* ❌ NO DATA */
  if (
    !slides ||
    slides.length === 0
  ) {
    return null;
  }




  /* 🔥 PREV */
  const prevSlide = () => {

    setCurrent(
      current === 0
        ? slides.length - 1
        : current - 1
    );
  };



  /* 🔥 NEXT */
  const nextSlide = () => {

    setCurrent(
      (current + 1) %
      slides.length
    );
  };




  return (
    <section className="py-10 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">

          <div
            className="flex transition-transform duration-700"
            style={{
              transform:
                `translateX(-${current * 100}%)`,
            }}
          >

            {slides.map(
              (
                slide,
                index
              ) => (

                <div
                  key={index}
                  className="min-w-full grid md:grid-cols-2 items-center"
                >

                  {/* 🔥 LEFT */}
                  <div className="p-8 space-y-5">

                    <h2 className="text-4xl font-bold leading-tight">

                      {slide.title}

                      <br />

                      <span className="text-[#14532D]">
                        {slide.highlight}
                      </span>

                    </h2>

                    <p className="text-gray-500 text-lg">
                      {slide.desc}
                    </p>



                    {/* 🔥 BUTTON */}
                    <div className="flex items-center gap-4 pt-2">

                      <button className="bg-[#14532D] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
                        Explore More
                      </button>

                      <p className="text-sm text-gray-400">
                        Trusted by 500+ Manufacturers
                      </p>

                    </div>

                  </div>



                  {/* 🔥 IMAGE */}
                  <img
                    src={
                      imageMap[
                        slide.image
                      ]
                    }
                    className="w-full h-[300px] object-cover"
                    alt={slide.title}
                  />

                </div>
              )
            )}

          </div>



          {/* 🔥 LEFT BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow w-10 h-10 rounded-full flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>



          {/* 🔥 RIGHT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow w-10 h-10 rounded-full flex items-center justify-center"
          >
            <FaChevronRight />
          </button>

        </div>

      </div>

    </section>
  );
};

export default BannerSlider;