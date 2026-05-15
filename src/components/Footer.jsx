import {
  useEffect,
  useState,
} from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";



const Footer = () => {

  const [footer, setFooter] =
    useState(null);

  const [loading, setLoading] =
    useState(true);




  /* 🔥 FETCH FOOTER */
  useEffect(() => {

    const fetchFooter =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/footer"
            );

          const data =
            await res.json();

          setFooter(
            data.footer ||
            data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchFooter();

  }, []);




  /* 🔄 LOADING */
  if (loading) {

    return (
      <footer className="bg-[#f5f5f5] py-10 text-center">

        <p className="text-gray-500 animate-pulse">

          Loading footer...

        </p>

      </footer>
    );
  }




  /* ❌ NO FOOTER */
  if (!footer) {
    return null;
  }




  return (
    <footer className="bg-[#f5f5f5] mt-16">

      {/* 🔥 TOP LINE */}
      <div className="h-1 bg-[#14532D] w-full"></div>



      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-center md:text-left">

        {/* 🔥 LEFT */}
        <div className="lg:col-span-2 flex flex-col items-center md:items-start">

          <h2 className="text-3xl font-bold mb-5">

            <span className="text-[#14532D]">

              ULTRA

            </span>

            CLAP

          </h2>



          <p className="text-gray-600 text-[15px] leading-8 max-w-md">

            {footer.about}

          </p>



          {/* 🔥 SOCIAL */}
          <div className="flex items-center gap-4 mt-7">

            <a
              href={footer.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#14532D] hover:text-white transition"
            >
              <FaFacebookF />
            </a>



            <a
              href={footer.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#14532D] hover:text-white transition"
            >
              <FaInstagram />
            </a>



            <a
              href={footer.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#14532D] hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>



            <a
              href={footer.youtube}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#14532D] hover:text-white transition"
            >
              <FaYoutube />
            </a>

          </div>

        </div>



        {/* 🔥 MANUFACTURING */}
        <div>

          <h3 className="font-bold text-xl mb-5 text-gray-900">

            {footer.manufacturingHeading}

          </h3>



          <ul className="space-y-3 text-gray-600 text-sm">

            {footer.manufacturingLinks?.map(
              (
                item,
                index
              ) => (

                <li
                  key={index}
                  className="hover:text-[#14532D] cursor-pointer transition"
                >

                  {item}

                </li>
              )
            )}

          </ul>

        </div>



        {/* 🔥 PROJECTS */}
        <div>

          <h3 className="font-bold text-xl mb-5 text-gray-900">

            {footer.projectHeading}

          </h3>



          <ul className="space-y-3 text-gray-600 text-sm">

            {footer.projectLinks?.map(
              (
                item,
                index
              ) => (

                <li
                  key={index}
                  className="hover:text-[#14532D] cursor-pointer transition"
                >

                  {item}

                </li>
              )
            )}

          </ul>

        </div>



        {/* 🔥 CONTACT */}
        <div className="flex flex-col items-center md:items-start">

          <h3 className="font-bold text-xl mb-5 text-gray-900">

            Contact Us

          </h3>



          <div className="space-y-4 text-gray-600 text-sm">

            <div className="flex items-center justify-center md:justify-start gap-3">

              <FaClock className="text-[#14532D]" />

              <span>
                {footer.timing}
              </span>

            </div>



            <div className="flex items-center justify-center md:justify-start gap-3">

              <FaPhoneAlt className="text-[#14532D]" />

              <span>
                {footer.phone}
              </span>

            </div>



            <div className="flex items-center justify-center md:justify-start gap-3">

              <FaEnvelope className="text-[#14532D]" />

              <span>
                {footer.email}
              </span>

            </div>

          </div>

        </div>

      </div>



      {/* 🔥 BOTTOM */}
      <div className="text-center text-gray-500 text-sm pb-6 border-t border-gray-200 pt-5">

        © {new Date().getFullYear()} Ultraclap.
        All rights reserved.

      </div>

    </footer>
  );
};

export default Footer;