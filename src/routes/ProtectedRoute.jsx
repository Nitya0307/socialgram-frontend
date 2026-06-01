import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {

  const {
    user,
    isLoading,
  } = useAuth();

  console.log({
    user,
    isLoading,
  });

  if (isLoading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        Loading...
      </div>
    );
  }

  if (!user) {

    return (
      <Navigate to="/login" />
    );
  }

  return children;
}