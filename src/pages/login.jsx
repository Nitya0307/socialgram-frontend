import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 p-8 rounded-xl w-96">
        <h1 className="text-white text-3xl mb-6 text-center">
          Login
        </h1>

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

        <button className="w-full bg-blue-600 text-white p-3 rounded mb-4">
          Login
        </button>

        <p className="text-zinc-400 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;