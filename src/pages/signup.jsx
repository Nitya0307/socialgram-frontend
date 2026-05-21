import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { supabase } from "../supabase";

export default function Signup() {

  const [showPw, setShowPw] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    password: "",
  });

  // HANDLE INPUTS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SIGNUP FUNCTION
  const handleSignup = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );

      alert(response.data.message);

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
    }
  };

  // GOOGLE SIGNUP
  const handleGoogleSignup = async () => {

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/home",
        },
      });

    if (error) {
      console.log(error);
      alert("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">

        {/* CONTAINER */}
        <div className="w-full max-w-7xl flex items-center justify-between gap-16">

          {/* LEFT */}
          <div className="max-w-xl">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-white text-xl">👥</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight">
                Socialgram
              </h1>
            </div>

            {/* HEADING */}
            <h2 className="text-7xl font-bold leading-[1.02] tracking-tight mb-8">
              Your story
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                starts here.
              </span>
            </h2>

            {/* TEXT */}
            <p className="text-zinc-400 text-2xl leading-relaxed max-w-lg">
              Join millions of people sharing their world. Create, connect,
              and be discovered.
            </p>

            {/* FEATURES */}
            <div className="mt-14 space-y-6">

              <div className="flex items-center gap-4 text-zinc-400 text-lg">
                📸 <span>Share photos & videos instantly</span>
              </div>

              <div className="flex items-center gap-4 text-zinc-400 text-lg">
                ❤️ <span>Like and comment on posts</span>
              </div>

              <div className="flex items-center gap-4 text-zinc-400 text-lg">
                🔗 <span>Share with anyone, anywhere</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >

            {/* CARD */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40 p-6">

              <h3 className="text-4xl font-bold mb-2">
                Create your account
              </h3>

              <p className="text-zinc-500 text-base mb-8">
                It’s free and only takes a minute
              </p>

              {/* USERNAME */}
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 outline-none focus:border-indigo-500 text-base"
                />
              </div>

              {/* PHONE */}
              <div className="mb-4">
                <input
                  type="tel"
                  name="mobile"
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 outline-none focus:border-indigo-500 text-base"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 outline-none focus:border-indigo-500 text-base"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative mb-6">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 outline-none focus:border-indigo-500 text-base"
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSignup}
                className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 transition shadow-lg shadow-indigo-500/20"
              >
                Create account
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-zinc-600 text-sm">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* GOOGLE */}
              <button
                onClick={handleGoogleSignup}
                className="w-full py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition flex items-center justify-center gap-3 text-base"
              >
                <FcGoogle size={22} />
                Google
              </button>

              {/* TERMS */}
              <p className="text-zinc-600 text-sm text-center mt-5 leading-relaxed">
                By signing up you agree to our Terms and Privacy Policy.
              </p>

              {/* FOOTER */}
              <p className="text-center text-zinc-500 mt-5">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Sign in
                </Link>
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}