import API from "../api/axios";

export const signupUser = async (data) => {
  return API.post("/auth/signup", data);
};

export const loginUser = async (data) => {
  return API.post("/auth/login", data);
};