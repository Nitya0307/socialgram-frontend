import axiosClient from "./axiosClient";

export const loginApi =
  async (data) => {

    return await axiosClient.post(
      "/auth/login",
      data
    );
};

export const signupApi =
  async (data) => {

    return await axiosClient.post(
      "/auth/signup",
      data
    );
};

export const getGoogleUserApi =
  async (email) => {

    return await axiosClient.get(
      `/auth/google-user?email=${email}`
    );
};

export const googleSignupApi =
  async (data) => {

    return await axiosClient.post(
      "/auth/google-signup",
      data
    );
};