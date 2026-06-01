import { useState }
  from "react";

import { useNavigate }
  from "react-router-dom";

import {
  signupUserUseCase,
} from "../di/container";

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

        navigate("/");

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

  return {

    formData,

    handleChange,

    handleSignup,

    loading,

    error,
  };
}

