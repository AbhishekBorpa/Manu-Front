import {
  useEffect,
  useState,
} from "react";

const Testimonials = () => {

  const [
    testimonials,
    setTestimonials,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH */
  useEffect(() => {

    const fetchTestimonials =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-bpob.onrender.com/api") + "/testimonials"
            );

          const data =
            await res.json();

          setTestimonials(
            data.testimonials ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchTestimonials();

  }, []);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <section className="py-14 bg-[#f5f7f6]">

        <p className="text-center text-gray-500 animate-pulse">

          Loading testimonials...

        </p>

      </section>
    );
  }




  /* ❌ NO DATA */
  if (
    !testimonials ||
    testimonials.length === 0
  ) {
    return null;
  }




  return (
    <section className="py-10 md:py-14 bg-[#f5f7f6]">

      {/* 🔥 HEADING */}
      <div className="text-center mb-8 md:mb-10 px-4">

        <p className="text-green-700 tracking-[2px] md:tracking-[3px] text-[10px] md:text-xs font-semibold mb-1 md:mb-2">

          TESTIMONIALS

        </p>



        <h2 className="text-2xl md:text-5xl font-extrabold leading-tight">

          Testimonials{" "}

          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">

            Real Voices.

          </span>

        </h2>



        <div className="w-12 md:w-16 h-[2px] md:h-[3px] bg-green-600 mx-auto mt-3 md:mt-4 rounded-full"></div>

      </div>



      {/* 🔥 CARDS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {testimonials.map(
            (item) => (

              <div
                key={item._id}
                className="relative bg-white rounded-2xl md:rounded-[26px] p-5 md:p-6 shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 min-h-[260px] md:min-h-[300px]"
              >

                {/* 🔥 ICON */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] md:border-[4px] border-teal-500 flex items-center justify-center mb-3 md:mb-4">

                  <div className="w-5 h-5 md:w-6 md:h-6 bg-teal-500 rounded-full"></div>

                </div>



                {/* 🔥 QUOTE TOP */}
                <div
                  className={`absolute top-4 right-5 text-xl md:text-2xl font-bold ${
                    item.color === "green"
                      ? "text-green-300"
                      : "text-purple-300"
                  }`}
                >

                  ❝

                </div>



                {/* 🔥 TEXT */}
                <p className="text-gray-700 text-[13px] md:text-[14px] leading-relaxed md:leading-7 mb-3 md:mb-4 italic">

                  "{item.text}"

                </p>



                {/* 🔥 DOTS */}
                <div className="flex gap-1.5 md:gap-2 mb-3">

                  {[1, 2, 3, 4, 5].map(
                    (dot) => (

                      <span
                        key={dot}
                        className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gray-300 rounded-full"
                      ></span>
                    )
                  )}

                </div>



                {/* 🔥 NAME */}
                <h3
                  className={`text-[15px] md:text-[16px] font-bold leading-tight ${
                    item.color === "green"
                      ? "text-green-700"
                      : "text-purple-700"
                  }`}
                >

                  {item.name}

                </h3>



                {/* 🔥 LOCATION */}
                <p className="text-gray-600 text-[12px] md:text-[14px] mt-1">

                  📍 {item.location}

                </p>



                {/* 🔥 CURVE */}
                <div
                  className={`absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 rounded-tl-full ${
                    item.color === "green"
                      ? "bg-green-700"
                      : "bg-purple-700"
                  }`}
                ></div>



                {/* 🔥 BOTTOM QUOTE */}
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 text-white text-lg md:text-xl font-bold">

                  ❞

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;