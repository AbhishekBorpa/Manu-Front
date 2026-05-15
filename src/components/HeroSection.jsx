import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShieldAlt,
  FaBolt,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

// 🔥 IMAGES (ADD THESE)
import img1 from "../assets/manufacturing.jpg";
import img2 from "../assets/services.jpg";
import img3 from "../assets/papercup.jpg";
import img4 from "../assets/doctor.jpg";

const slides = [
  {
    img: img1,
    subtitle: "Find. Connect. Grow.",
    title: "Manufacturing Success",
    desc: "Discover verified manufacturers, bulk suppliers, industrial partners, and trusted exporters. Expand your production capabilities and grow your business faster with reliable B2B connections.",
  },
  {
    img: img2,
    subtitle: "Professional Solutions",
    title: "Expert Services",
    desc: "Connect with experienced service providers, consultants, and professionals. From logistics to digital services, streamline your operations and maximize efficiency.",
  },
  {
    img: img3,
    subtitle: "Smart Machinery",
    title: "Paper Cup Machines",
    desc: "Explore high-performance paper cup machines and automatic production units. Get the best deals and boost your manufacturing output efficiently.",
  },
  {
    img: img4,
    subtitle: "Healthcare Network",
    title: "Doctor & Medical Services",
    desc: "Find trusted doctors, clinics, and healthcare professionals. Access reliable medical services and expert consultations easily.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [hovered, setHovered] = useState(null);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  // 🔥 TEXT ANIMATION (SLOW)
  useEffect(() => {
    setStep(0);

    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 900);
    const t3 = setTimeout(() => setStep(3), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [current]);

  // 🔥 PULSE ICON
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulse((p) => !p);
    }, 1000);
    return () => clearInterval(pulseInterval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // 🔥 SOCIAL ICONS
  const socials = [
    { icon: <FaInstagram />, name: "Instagram", color: "text-pink-500" },
    { icon: <FaTwitter />, name: "Twitter", color: "text-black" },
    { icon: <FaYoutube />, name: "YouTube", color: "text-red-600" },
    { icon: <FaLinkedin />, name: "LinkedIn", color: "text-blue-600" },
  ];

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">

      {/* 🔥 SLIDES */}
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.img}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* 🔥 OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* 🔥 ARROWS (Hidden on very small screens) */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/20 p-3 rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/20 p-3 rounded-full text-white hover:bg-white/40 transition-colors"
      >
        <FaChevronRight />
      </button>

      {/* 🔥 LEFT FLOAT ICONS - Hidden on small mobile */}
      <div className="hidden md:flex fixed left-5 bottom-10 z-50 flex flex-col gap-4">

        <div className="relative">
          <div className={`absolute inset-0 bg-blue-500 opacity-30 rounded-full ${pulse ? "scale-150" : "scale-100"} transition`} />
          <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg">
            <FaPhoneAlt />
          </div>
        </div>

        <div className="relative">
          <div className={`absolute inset-0 bg-green-500 opacity-30 rounded-full ${pulse ? "scale-150" : "scale-100"} transition`} />
          <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg">
            <FaWhatsapp />
          </div>
        </div>

      </div>

      {/* 🔥 RIGHT ICONS - Hidden on mobile */}
      <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">

        {socials.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex items-center"
          >
            {hovered === i && (
              <span className="absolute right-12 bg-[#14532D] text-white px-3 py-1 rounded-md text-sm">
                {s.name}
              </span>
            )}

            <div className="bg-white p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition">
              <span className={`text-xl ${s.color}`}>{s.icon}</span>
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center justify-center">

        <div className="max-w-3xl text-white text-center space-y-4 md:space-y-6">

          {/* STEP 1 */}
          <p className={`text-green-400 text-sm md:text-base font-semibold transition-all duration-700 ${
            step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {slides[current].subtitle}
          </p>

          {/* STEP 2 */}
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold transition-all duration-700 leading-tight ${
            step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            Your Trusted Partner in <br />
            <span className="text-green-500">{slides[current].title}</span>
          </h1>

          {/* STEP 3 */}
          <p className={`text-gray-200 text-xs md:text-base lg:text-lg transition-all duration-700 max-w-2xl mx-auto ${
            step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {slides[current].desc}
          </p>

          {/* 🔥 SEARCH - Responsive stack */}
          <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-2xl max-w-xl mx-auto w-full border border-gray-100">

            <select className="px-4 py-3 bg-gray-50 text-black border-b sm:border-b-0 sm:border-r text-sm focus:outline-none">
              <option>All Categories</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>

            <input
              type="text"
              placeholder="Search products or services..."
              className="flex-1 px-4 py-3 text-black outline-none text-sm"
            />

            <button className="bg-[#14532D] hover:bg-[#166534] transition-colors px-8 py-3 text-white font-bold text-sm">
              Search
            </button>

          </div>

          {/* 🔥 BADGES - Hidden or scaled on small screens */}
          <div className="hidden sm:flex flex-wrap gap-4 md:gap-8 justify-center pt-2 md:pt-4 text-xs md:text-sm font-medium">

            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-green-500 text-lg" />
              <span>Verified Manufacturers</span>
            </div>

            <div className="flex items-center gap-2">
              <FaBoxOpen className="text-green-500 text-lg" />
              <span>Best Industry Prices</span>
            </div>

            <div className="flex items-center gap-2">
              <FaBolt className="text-green-500 text-lg" />
              <span>Fast Lead Response</span>
            </div>

          </div>

          {/* 🔥 SUPPORTED BY */}
          <div className="flex items-center justify-center gap-3 mt-4 md:mt-8 scale-75 md:scale-100">
            <div className="h-[1px] w-12 md:w-20 bg-orange-400"></div>
            <div className="bg-[#14532D] text-white px-5 py-1.5 rounded-full tracking-[3px] md:tracking-[5px] text-[10px] font-bold whitespace-nowrap">
              SUPPORTED BY
            </div>
            <div className="h-[1px] w-12 md:w-20 bg-orange-400"></div>
          </div>

        </div>
      </div>
  
    </section>
  );
};

export default Hero;