import useLanding
  from "../hooks/useLanding";

export default function LandingPage() {

  useLanding();

  return (

    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center text-white">

      <h1 className="text-5xl font-bold mb-4">
        SOCIALGRAM
      </h1>

      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />

      <p className="mt-6 text-gray-400">
        Loading...
      </p>

    </div>
  );
}