import { useState }
  from "react";

import { useNavigate }
  from "react-router-dom";

import {
  signupUserUseCase,
} from "../di/container";

import { supabase }
  from "../supabase";

import {
  APP_CONFIG,
} from "../core/config/apiConfig";

export default function useSignup() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      mobile: "",
      password: "",
    });

  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // SIGNUP
  const handleSignup =
    async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await signupUserUseCase
            .execute(formData);

        alert(response.message);

        navigate("/login");

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data
            ?.message ||
          err.message ||
          "Signup failed"
        );

      } finally {

        setLoading(false);
      }
    };

  // GOOGLE SIGNUP
  const handleGoogleSignup =
    async () => {

      try {

        setError("");

        const { error } =

          await supabase.auth
            .signInWithOAuth({

              provider:
                "google",

              options: {

                redirectTo:
                  APP_CONFIG
                    .FRONTEND_URL,
              },
            });

        if (error) {

          throw error;
        }

      } catch (err) {

        console.log(err);

        setError(
          "Google signup failed"
        );
      }
    };

  return {

    formData,

    handleChange,

    handleSignup,

    handleGoogleSignup,

    loading,

    error,
  };
}