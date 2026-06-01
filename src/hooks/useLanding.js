import {
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

export default function useLanding() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  useEffect(() => {

    const timer =
      setTimeout(() => {

        if (user) {

          navigate("/home");

        } else {

          navigate("/login");
        }

      }, 5000);

    return () =>
      clearTimeout(timer);

  }, [
    user,
    navigate,
  ]);
}