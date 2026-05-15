import { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";

import loginImg from "../assets/signin-img.jpg";

const SignInModal = ({ onClose }) => {

  const [isLogin, setIsLogin] =
    useState(true);

  /* FORM STATE */
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);




  /* 🔥 HANDLE INPUT */
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };




  /* 🔥 SUBMIT */
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const url =
          isLogin
            ? import.meta.env.VITE_API_URL + "/auth/login"
            : import.meta.env.VITE_API_URL + "/auth/register";



        const response =
          await fetch(url, {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              formData
            ),
          });



        const data =
          await response.json();



        /* ❌ ERROR */
        if (!response.ok) {

          alert(data.msg);

          setLoading(false);

          return;
        }



        /* ✅ SUCCESS */
        alert(data.msg);

        console.log(
          "USER:",
          data.user
        );



        /* 🔥 SAVE TOKEN */
        if (data.token) {

          localStorage.setItem(
            "token",
            data.token
          );
        }



        /* 🔥 SAVE USER */
        if (data.user) {

          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );
        }



        setLoading(false);

        onClose();



        /* 🔥 REFRESH */
        window.location.reload();

      } catch (err) {

        console.error(err);

        alert(
          "Something went wrong ❌"
        );

        setLoading(false);
      }
    };




  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-[9999]">

      {/* 🔥 MODAL */}
      <div className="bg-white w-full max-w-3xl h-[520px] rounded-2xl overflow-hidden shadow-2xl flex">

        {/* 🔥 LEFT IMAGE */}
        <div className="w-2/3 hidden md:flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">

          <img
            src={loginImg}
            alt="login"
            className="max-h-full max-w-full object-contain"
          />

        </div>



        {/* 🔥 RIGHT */}
        <div className="w-full md:w-1/3 p-6 flex flex-col justify-center relative">

          {/* 🔥 CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 text-xl"
          >

            ✕

          </button>



          {/* 🔥 LOGO */}
          <h2 className="text-lg font-bold text-center mb-1">

            <span className="text-[#14532D]">

              ULTRA

            </span>

            CLAP

          </h2>



          <p className="text-center text-gray-500 mb-4 text-xs">

            {isLogin
              ? "Sign in to your account"
              : "Create your account"}

          </p>



          {/* 🔥 FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-3"
          >

            {/* 🔥 NAME */}
            {!isLogin && (
              <>

                <div className="relative">

                  <FaUser className="absolute top-3 left-3 text-gray-400 text-sm" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full pl-9 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#14532D]"
                  />

                </div>



                {/* 🔥 PHONE */}
                <div className="relative">

                  <FaPhone className="absolute top-3 left-3 text-gray-400 text-sm" />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full pl-9 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#14532D]"
                  />

                </div>

              </>
            )}



            {/* 🔥 EMAIL */}
            <div className="relative">

              <FaEnvelope className="absolute top-3 left-3 text-gray-400 text-sm" />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="w-full pl-9 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#14532D]"
              />

            </div>



            {/* 🔥 PASSWORD */}
            <div className="relative">

              <FaLock className="absolute top-3 left-3 text-gray-400 text-sm" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                className="w-full pl-9 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#14532D]"
              />

            </div>



            {/* 🔥 BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#14532D] hover:bg-[#166534] text-white py-2 rounded-lg text-sm font-medium transition"
            >

              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Sign Up"}

            </button>

          </form>



          {/* 🔥 TOGGLE */}
          <p className="text-center text-xs text-gray-600 mt-4">

            {isLogin
              ? "Don't have account?"
              : "Already have account?"}



            <span
              onClick={() =>
                setIsLogin(
                  !isLogin
                )
              }
              className="text-[#14532D] cursor-pointer ml-1 font-medium"
            >

              {isLogin
                ? "Sign Up"
                : "Login"}

            </span>

          </p>

        </div>

      </div>

    </div>
  );
};

export default SignInModal;