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
    <section className="relative h-[90vh] w-full overflow-hidden">

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

      {/* 🔥 ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 bg-white/20 p-3 rounded-full text-white"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-white/20 p-3 rounded-full text-white"
      >
        <FaChevronRight />
      </button>

      {/* 🔥 LEFT FLOAT ICONS */}
      <div className="fixed left-5 bottom-10 z-50 flex flex-col gap-4">

        <div className="relative">
          <div className={`absolute inset-0 bg-blue-500 opacity-30 rounded-full ${pulse ? "scale-150" : "scale-100"} transition`} />
          <div className="bg-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-white">
            <FaPhoneAlt />
          </div>
        </div>

        <div className="relative">
          <div className={`absolute inset-0 bg-green-500 opacity-30 rounded-full ${pulse ? "scale-150" : "scale-100"} transition`} />
          <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white">
            <FaWhatsapp />
          </div>
        </div>

      </div>

      {/* 🔥 RIGHT ICONS */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">

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

            <div className="bg-white p-3 rounded-full shadow cursor-pointer hover:scale-110 transition">
              <span className={`text-xl ${s.color}`}>{s.icon}</span>
            </div>
          </div>
        ))}

      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center justify-center">

        <div className="max-w-3xl text-white text-center space-y-6">

          {/* STEP 1 */}
          <p className={`text-green-400 transition-all duration-700 ${
            step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {slides[current].subtitle}
          </p>

          {/* STEP 2 */}
          <h1 className={`text-5xl font-bold transition-all duration-700 ${
            step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            Your Trusted Partner in <br />
            <span className="text-green-500">{slides[current].title}</span>
          </h1>

          {/* STEP 3 */}
          <p className={`text-gray-200 transition-all duration-700 ${
            step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {slides[current].desc}
          </p>

          {/* 🔥 SEARCH */}
          <div className="flex bg-white rounded-lg overflow-hidden shadow-lg max-w-xl mx-auto">

            <select className="px-4 py-3 bg-gray-100 text-black border-r">
              <option>All Categories</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-3 text-black outline-none"
            />

            <button className="bg-[#14532D] px-6 text-white">
              Search
            </button>

          </div>

          {/* 🔥 BADGES */}
          <div className="flex gap-6 justify-center pt-4">

            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-green-500" />
              Verified
            </div>

            <div className="flex items-center gap-2">
              <FaBoxOpen className="text-green-500" />
              Best Price
            </div>

            <div className="flex items-center gap-2">
              <FaBolt className="text-green-500" />
              Fast Response
            </div>

          </div>
          {/* 🔥 SUPPORTED BY (INSIDE HERO) */}
<div className="flex items-center justify-center gap-4 mt-6">

  {/* LEFT LINE */}
  <div className="h-[2px] w-20 bg-orange-400"></div>

  {/* TEXT */}
  <div className="bg-[#14532D] text-white px-6 py-2 rounded-full tracking-[5px] text-xs font-semibold whitespace-nowrap">
    SUPPORTED BY
  </div>

  {/* RIGHT LINE */}
  <div className="h-[2px] w-20 bg-orange-400"></div>

</div>

        </div>
      </div>
  
    </section>
  );
};

export default Hero;