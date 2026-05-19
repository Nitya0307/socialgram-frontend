import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 p-8 rounded-xl w-96">
        <h1 className="text-white text-3xl mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <button className="w-full bg-green-600 text-white p-3 rounded mb-4">
          Signup
        </button>

        <p className="text-zinc-400 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-green-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;