import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

/* ✅ SAME DATA AS AllProductsPage */
import cupImg from "../assets/papercup-product.jpg";
import plateImg from "../assets/paperplate.jpg";
import bagImg from "../assets/bagmachine.jpg";
import packagingImg from "../assets/packaging.jpg";
import cupAutoImg from "../assets/cup-auto.jpg";
import plateHighImg from "../assets/plate-high.jpg";
import bagIndustrialImg from "../assets/bag-industrial.jpg";
import sealingImg from "../assets/sealing.jpg";

/* 🔥 SAME PRODUCTS DATA */
const allProductsData = [
  { id: 1, title: "Paper Cup Machine", category: "cup", price: 150000, location: "Delhi", img: cupImg },
  { id: 2, title: "Paper Plate Machine", category: "plate", price: 55000, location: "Noida", img: plateImg },
  { id: 3, title: "Bag Making Machine", category: "bag", price: 200000, location: "Gurugram", img: bagImg },
  { id: 4, title: "Packaging Machine", category: "packaging", price: 120000, location: "Delhi", img: packagingImg },

  { id: 5, title: "Automatic Cup Machine", category: "cup", price: 250000, location: "Mumbai", img: cupAutoImg },
  { id: 6, title: "High Speed Plate Machine", category: "plate", price: 85000, location: "Pune", img: plateHighImg },
  { id: 7, title: "Industrial Bag Machine", category: "bag", price: 300000, location: "Delhi", img: bagIndustrialImg },
  { id: 8, title: "Sealing Packaging Machine", category: "packaging", price: 95000, location: "Noida", img: sealingImg },
  { id: 9, title: "Sealing Packaging Machine", category: "packaging", price: 95000, location: "Noida", img: sealingImg },
];

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state;

  if (!product) {
    return <h2 className="text-center mt-10">No product data</h2>;
  }

  /* 🔥 RELATED PRODUCTS (FINAL FIX) */
  let relatedProducts = allProductsData.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  // fallback (agar same category kam ho)
  if (relatedProducts.length === 0) {
    relatedProducts = allProductsData
      .filter((item) => item.id !== product.id)
      .slice(0, 6);
  }

  return (
    <section className="bg-[#f5f7f6] min-h-screen py-10 px-6">

      {/* MAIN PRODUCT */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-8">

        <img
          src={product.img}
          alt={product.title}
          className="w-full h-[350px] object-cover rounded-lg"
        />

        <div>
          <h2 className="text-3xl font-bold text-[#14532D]">
            {product.title}
          </h2>

          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <FaMapMarkerAlt /> {product.location}
          </p>

          <p className="text-3xl font-bold mt-4">
            ₹ {product.price.toLocaleString()}
          </p>

          <button className="mt-6 w-full bg-[#14532D] hover:bg-[#166534] text-white py-3 rounded-lg">
            Contact Supplier
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-12">

        <h3 className="text-2xl font-bold text-[#14532D] mb-6">
          Related Products
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {relatedProducts.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate("/product-details", { state: item })
              }
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 cursor-pointer"
            >
              <img
                src={item.img}
                className="w-full h-40 object-cover rounded-lg"
              />

              <div className="mt-3">
                <h4 className="text-[#14532D] font-semibold text-sm">
                  {item.title}
                </h4>

                <p className="text-lg font-bold mt-1">
                  ₹ {item.price.toLocaleString()}
                </p>

                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <FaMapMarkerAlt /> {item.location}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default ProductDetails;