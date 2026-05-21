import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "../supabase";

export default function Login() {

  const navigate = useNavigate();

  const [showPw, setShowPw] = useState(false);

  // UPDATED FORM DATA
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // HANDLE GOOGLE SESSION
  useEffect(() => {

  const syncGoogleUser = async () => {

    const {
      data: { user: googleUser },
    } = await supabase.auth.getUser();

    // NO GOOGLE USER
    if (!googleUser) return;

    try {

      // CHECK EXISTING USER
      const response = await axios.get(
        `http://localhost:5000/auth/google-user?email=${googleUser.email}`
      );

      let existingUser = response.data.user;

      // CREATE USER IF NOT EXISTS
      if (!existingUser) {

        const createResponse = await axios.post(
          "http://localhost:5000/auth/google-signup",
          {
            username:
              googleUser.user_metadata.full_name ||
              googleUser.email,

            email: googleUser.email,

            mobile: "",

            profile_pic:
              googleUser.user_metadata.avatar_url || "",
          }
        );

        existingUser = createResponse.data.user;
      }

      // SAVE NORMAL DATABASE USER
      localStorage.setItem(
        "user",
        JSON.stringify(existingUser)
      );

      navigate("/home");

    } catch (error) {

      console.log(error);
    }
  };

  syncGoogleUser();

}, [navigate]);

  // HANDLE INPUTS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN FUNCTION
  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );

      alert(response.data.message);

      console.log(response.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // REDIRECT
      navigate("/home");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/",
        },
      });

    if (error) {
      console.log(error);
      alert("Google login failed");
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
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* PURPLE GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px]" />

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
              Share your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                moments.
              </span>
            </h2>

            {/* TEXT */}
            <p className="text-zinc-400 text-2xl leading-relaxed max-w-lg">
              Connect with friends, share your world, and discover stories from people you care about.
            </p>

            {/* STATS */}
            <div className="flex gap-10 mt-16 pt-10 border-t border-white/10">

              <div>
                <h3 className="text-4xl font-bold">2M+</h3>
                <p className="text-zinc-500 mt-1">Users</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">50M+</h3>
                <p className="text-zinc-500 mt-1">Posts</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">99.9%</h3>
                <p className="text-zinc-500 mt-1">Uptime</p>
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

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40 p-8">

              <h3 className="text-5xl font-bold mb-3">
                Welcome back
              </h3>

              <p className="text-zinc-500 text-lg mb-10">
                Sign in to continue to Socialgram
              </p>

              {/* EMAIL / USERNAME / PHONE */}
              <div className="mb-5">
                <input
                  type="text"
                  name="identifier"
                  onChange={handleChange}
                  placeholder="Email, username or phone number"
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 outline-none focus:border-violet-500 text-lg"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative mb-3">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 outline-none focus:border-violet-500 text-lg"
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* FORGOT */}
              <div className="flex justify-end mb-8">
                <button className="text-violet-400 text-sm hover:text-violet-300">
                  Forgot password?
                </button>
              </div>

              {/* BUTTON */}
              <button
                onClick={handleLogin}
                className="w-full py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 transition shadow-lg shadow-violet-500/20"
              >
                Sign in
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-zinc-600 text-sm">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* GOOGLE */}
              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition flex items-center justify-center gap-3 text-lg"
              >
                <FcGoogle size={22} />
                Google
              </button>

              {/* FOOTER */}
              <p className="text-center text-zinc-500 mt-8">
                New to Socialgram?{" "}
                <Link
                  to="/signup"
                  className="text-violet-400 hover:text-violet-300 font-medium"
                >
                  Create account
                </Link>
              </p>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}