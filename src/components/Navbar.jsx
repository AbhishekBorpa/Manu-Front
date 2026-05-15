import {
  FaSearch,
  FaMapMarkerAlt,
  FaChevronDown,
  FaThLarge,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import SignInModal from "../pages/Sign-in";

import logo from "../assets/logo.jpg";

import {
  useNavigate,
} from "react-router-dom";

const Navbar = ({
  city,
  onOpenLocation,
}) => {

  const [showLogin, setShowLogin] =
    useState(false);

  const [navbar, setNavbar] =
    useState(null);

  const [category, setCategory] =
    useState("All Categories");

  const [openDropdown, setOpenDropdown] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const navigate =
    useNavigate();

  const dropdownRef =
    useRef(null);



  /* 🔥 GET USER */
  const user = JSON.parse(
    localStorage.getItem("user")
  );




  /* 🔥 FETCH NAVBAR */
  useEffect(() => {

    const fetchNavbar =
      async () => {

        try {

          const res =
            await fetch(
               (import.meta.env.VITE_API_URL || "https://manu-back-1.onrender.com/api") + "/navbar"
            );

          const data =
            await res.json();

          const navbarData =
            data.navbar || data;

          setNavbar(
            navbarData
          );



          /* 🔥 DEFAULT CATEGORY */
          if (
            navbarData?.categories
              ?.length > 0
          ) {

            setCategory(
              navbarData
                .categories[0]
            );
          }

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchNavbar();

  }, []);




  /* 🔥 OUTSIDE CLICK */
  useEffect(() => {

    const handleClickOutside =
      (e) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            e.target
          )
        ) {

          setOpenDropdown(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);




  /* 🔄 LOADING */
  if (loading) {
    return null;
  }




  /* ❌ NO DATA */
  if (!navbar) {
    return null;
  }




  return (
    <>

      <div className="w-full bg-[#F3F4F6] fixed top-[40px] z-[999] border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">

          {/* 🔥 LOGO */}
          <div className="flex items-center h-[46px]">

            <img
              src={logo}
              alt="UltraClap Logo"
              className="h-[60px] w-auto object-contain -mt-2"
            />

          </div>



          {/* 🔥 SEARCH */}
          <div className="flex flex-1 items-stretch bg-white border border-gray-300 rounded-full shadow-sm h-[46px]">

            {/* 🔥 DROPDOWN */}
            <div
              ref={dropdownRef}
              className="relative h-full z-[2000]"
            >

              <div
                onClick={() =>
                  setOpenDropdown(
                    (prev) => !prev
                  )
                }
                className="flex items-center gap-2 px-4 bg-gray-100 border-r border-gray-300 cursor-pointer h-full"
              >

                <span className="text-sm text-gray-700 whitespace-nowrap">

                  {category}

                </span>

                <FaChevronDown className="text-xs text-gray-500" />

              </div>



              {openDropdown && (

                <div className="absolute top-[50px] left-0 bg-white border border-gray-200 rounded-xl shadow-lg w-52 z-[3000]">

                  {navbar.categories?.map(
                    (item) => (

                      <div
                        key={item}
                        onClick={() => {

                          setCategory(
                            item
                          );

                          setOpenDropdown(
                            false
                          );
                        }}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-[#14532D] hover:text-white cursor-pointer transition"
                      >

                        {item}

                      </div>
                    )
                  )}

                </div>
              )}

            </div>



            {/* 🔥 INPUT */}
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  search.trim() !== ""
                ) {

                  navigate(
                    `/search?q=${search}`
                  );
                }
              }}
              placeholder={
                navbar.placeholder
              }
              className="flex-1 px-4 text-sm outline-none text-gray-700 h-full"
            />



            {/* 🔥 BUTTON */}
            <button
              onClick={() => {

                if (
                  search.trim() !== ""
                ) {

                  navigate(
                    `/search?q=${search}`
                  );
                }
              }}
              className="bg-[#14532D] hover:bg-[#166534] w-[60px] h-full flex items-center justify-center text-white rounded-r-full"
            >

              <FaSearch />

            </button>

          </div>



          {/* 🔥 RIGHT */}
          <div className="flex items-center gap-4">

            {/* 🔥 LOCATION */}
            <div
              onClick={
                onOpenLocation
              }
              className="flex items-center gap-2 px-4 h-[46px] bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer hover:bg-gray-50"
            >

              <FaMapMarkerAlt className="text-[#14532D]" />

              <span className="text-sm text-gray-700 whitespace-nowrap">

                {city ||
                  navbar.defaultCity}

              </span>

            </div>



            {/* 🔥 PROFILE / SIGN IN */}
            {user ? (
              <div className="relative group">
                <button
                  className="flex items-center gap-3 bg-white border border-gray-300 px-4 h-[46px] rounded-full font-medium shadow-sm hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 bg-[#14532D] text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm text-gray-700 max-w-[100px] truncate">{user.name}</span>
                  <FaChevronDown className="text-[10px] text-gray-400" />
                </button>

                {/* 🔥 DROPDOWN */}
                <div className="absolute top-[52px] right-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[5000] p-2">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                  </div>

                  {/* Seller Dashboard Link */}
                  {(user.role === 'partner' || user.role === 'admin') && (
                    <button
                      onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : '/partner/dashboard')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#14532D] rounded-xl transition-all font-bold"
                    >
                      <div className="w-8 h-8 bg-green-100 text-[#14532D] rounded-lg flex items-center justify-center">
                        <FaThLarge className="text-xs" />
                      </div>
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/my-queries')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all font-medium"
                  >
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <FaSearch className="text-xs" />
                    </div>
                    My Queries
                  </button>

                  <button
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all font-medium"
                  >
                    <div className="w-8 h-8 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center">
                      <FaUser className="text-xs" />
                    </div>
                    My Profile
                  </button>


                  <div className="border-t border-gray-50 mt-1 pt-1">
                    <button
                      onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        window.location.href = '/';
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold"
                    >
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                        <FaSignOutAlt className="text-xs" />
                      </div>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-[#14532D] hover:bg-[#166534] text-white px-6 h-[46px] rounded-full font-medium shadow-sm transition-all active:scale-95"
              >
                {navbar.signInButton}
              </button>
            )}

          </div>

        </div>

      </div>



      {/* 🔥 LOGIN MODAL */}
      {showLogin && (

        <SignInModal
          onClose={() =>
            setShowLogin(
              false
            )
          }
        />
      )}

    </>
  );
};

export default Navbar;