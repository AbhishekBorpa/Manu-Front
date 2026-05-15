import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

/* IMAGES */
import steel1 from "../assets/steel.jpg";
import steel2 from "../assets/steel2.jpg";
import plastic1 from "../assets/plastic1.jpg";
import plastic2 from "../assets/plastic2.jpg";
import textile1 from "../assets/textile1.jpg";
import textile2 from "../assets/textile2.jpg";
import furniture1 from "../assets/furniture1.jpg";
import furniture2 from "../assets/furniture2.jpg";
import machine1 from "../assets/machine1.jpg";
import machine2 from "../assets/machine2.jpg";
import electronics1 from "../assets/electronics1.jpg";
import electronics2 from "../assets/electronics2.jpg";
import packaging1 from "../assets/packaging1.jpg";
import packaging2 from "../assets/packaging2.jpg";
import chemical1 from "../assets/chemical1.jpg";
import chemical2 from "../assets/chemical2.jpg";
import auto1 from "../assets/auto1.jpg";
import auto2 from "../assets/auto2.jpg";
import tools1 from "../assets/tools1.jpg";
import tools2 from "../assets/tools2.jpg";

/* 🔥 FULL PRODUCTS DATA */
const allProducts = [
  { title: "Steel Fabrication Machine", category: "steel", price: "₹1,20,000", location: "Delhi", img: steel1 },
  { title: "Industrial Welding Machine", category: "steel", price: "₹90,000", location: "Noida", img: steel2 },

  { title: "Plastic Injection Machine", category: "plastic", price: "₹2,50,000", location: "Delhi", img: plastic1 },
  { title: "Plastic Molding Machine", category: "plastic", price: "₹3,00,000", location: "Gurugram", img: plastic2 },

  { title: "Textile Machine", category: "textile", price: "₹80,000", location: "Delhi", img: textile1 },
  { title: "Garment Machine", category: "textile", price: "₹1,20,000", location: "Surat", img: textile2 },

  { title: "Wood Cutting Machine", category: "furniture", price: "₹70,000", location: "Jaipur", img: furniture1 },
  { title: "Furniture CNC Machine", category: "furniture", price: "₹2,10,000", location: "Delhi", img: furniture2 },

  { title: "Lathe Machine", category: "machinery", price: "₹1,80,000", location: "Pune", img: machine1 },
  { title: "Heavy Machine", category: "machinery", price: "₹3,20,000", location: "Mumbai", img: machine2 },

  { title: "PCB Machine", category: "electronics", price: "₹2,40,000", location: "Delhi", img: electronics1 },
  { title: "Testing Machine", category: "electronics", price: "₹1,60,000", location: "Noida", img: electronics2 },

  { title: "Packaging Machine", category: "packaging", price: "₹1,20,000", location: "Delhi", img: packaging1 },
  { title: "Sealing Machine", category: "packaging", price: "₹95,000", location: "Gurugram", img: packaging2 },

  { title: "Chemical Mixer", category: "chemical", price: "₹3,00,000", location: "Mumbai", img: chemical1 },
  { title: "Reactor Machine", category: "chemical", price: "₹4,20,000", location: "Pune", img: chemical2 },

  { title: "Auto Parts Machine", category: "auto", price: "₹2,80,000", location: "Delhi", img: auto1 },
  { title: "Car Assembly Machine", category: "auto", price: "₹5,50,000", location: "Chennai", img: auto2 },

  { title: "Drill Machine", category: "tools", price: "₹60,000", location: "Delhi", img: tools1 },
  { title: "Cutting Tool Machine", category: "tools", price: "₹85,000", location: "Noida", img: tools2 },
];

const locations = ["Patna", "Delhi", "Noida", "Hajipur", "Vaishali", "Nalanda", "Kolkata"];

const SearchResultsPage = ({ city, setCity }) => {
  const locationHook = useLocation();
  const query = new URLSearchParams(locationHook.search);
  const searchQuery = query.get("q") || "";

  const [search, setSearch] = useState(searchQuery);
  const [products, setProducts] = useState(allProducts);

  const activeLocation = city;

  useEffect(() => {
    if (!search.trim()) {
      setProducts(allProducts);
      return;
    }

    const words = search.toLowerCase().split(" ");

    const filtered = allProducts.filter((item) =>
      words.some((word) =>
        item.title.toLowerCase().includes(word) ||
        item.category.toLowerCase().includes(word)
      )
    );

    setProducts(filtered);
  }, [search]);

  return (
    <section className="bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] min-h-screen">

      {/* HEADER */}
      <div className="bg-white shadow-md  top-[110px] z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">

          <h2 className="text-3xl font-bold text-gray-800 mb-5">
            {search || "All Products"} near 
            <span className="text-[#065f46] ml-2">{activeLocation}</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

            {/* SEARCH */}
            <div className="flex items-center w-full lg:w-[420px] bg-gray-100 rounded-full px-5 py-3 shadow-inner focus-within:ring-2 ring-[#065f46]">
              <FaSearch className="text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search machines..."
                className="ml-3 w-full bg-transparent outline-none text-sm"
              />
            </div>

            {/* LOCATIONS */}
            <div className="flex gap-3 flex-wrap">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setCity(loc)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    activeLocation === loc
                      ? "bg-[#065f46] text-white shadow-md"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500 text-lg">
            No products found
          </p>
        ) : (
          products.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3">
              <img src={item.img} className="w-full h-44 object-cover rounded-xl" />

              <div className="mt-3">
                <h3 className="text-[#065f46] font-semibold text-sm">
                  {item.title}
                </h3>

                <p className="text-lg font-bold mt-1">{item.price}</p>

                <button className="mt-2 w-full bg-[#065f46] hover:bg-[#047857] text-white py-2 rounded-lg">
                  Contact Supplier
                </button>

                <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                  <FaMapMarkerAlt /> {item.location}
                </p>
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
};

export default SearchResultsPage;