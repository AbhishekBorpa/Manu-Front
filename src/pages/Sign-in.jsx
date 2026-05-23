import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";

import loginImg from "../assets/signin-img.jpg";

const SignInModal = ({ onClose, initialMode = "login" }) => {

  const [isLogin, setIsLogin] =
    useState(initialMode === "login");

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
            ?  (import.meta.env.VITE_API_URL || "https://manu-back-bpob.onrender.com/api") + "/auth/login"
            :  (import.meta.env.VITE_API_URL || "https://manu-back-bpob.onrender.com/api") + "/auth/register";



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
    <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-[9999] p-4">

      {/* 🔥 MODAL */}
      <div className="bg-white w-full max-w-3xl md:h-[520px] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">

        {/* 🔥 CLOSE BUTTON (Global for mobile) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl z-50 md:text-gray-400"
        >
          ✕
        </button>

        {/* 🔥 LEFT IMAGE (Hidden on mobile) */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-10">
          <img
            src={loginImg}
            alt="login"
            className="max-h-full max-w-full object-contain drop-shadow-2xl"
          />
        </div>



        {/* 🔥 RIGHT (Form Area) */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">

          {/* 🔥 LOGO */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black tracking-tight">
              <span className="text-[#14532D]">ULTRA</span>CLAP
            </h2>
            <p className="text-gray-500 text-xs mt-1 font-medium uppercase tracking-widest">
              {isLogin
                ? "Sign in to your account"
                : "Create your account"}
            </p>
          </div>



          {/* 🔥 FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >

            {/* 🔥 NAME & PHONE (Registration Only) */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                <div className="relative">
                  <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#14532D]/20 focus:bg-white transition-all"
                  />
                </div>

                <div className="relative">
                  <FaPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#14532D]/20 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}



            {/* 🔥 EMAIL */}
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#14532D]/20 focus:bg-white transition-all"
              />
            </div>



            {/* 🔥 PASSWORD */}
            <div className="relative">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 text-sm" />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#14532D]/20 focus:bg-white transition-all"
              />
            </div>



            {/* 🔥 SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#14532D] hover:bg-[#166534] text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-green-900/10 transition-all active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading
                ? "Authenticating..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>

          </form>



          {/* 🔥 TOGGLE */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 font-medium">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#14532D] hover:underline ml-1.5 font-bold"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SignInModal;