import AuthRepository
  from "../../domain/repositories/AuthRepository";

import {
  loginApi,
  signupApi,
  getGoogleUserApi,
  googleSignupApi,
} from "../datasources/api/authApi";

export default class AuthRepositoryImpl
  extends AuthRepository {

  async login(data) {

    const response =
      await loginApi(data);

    return response.data;
  }

  async signup(data) {

    const response =
      await signupApi(data);

    return response.data;
  }

  async logout() {

    return true;
  }

  async getGoogleUser(email) {

    const response =
      await getGoogleUserApi(email);

    return response.data;
  }

  async googleSignup(data) {

    const response =
      await googleSignupApi(data);

    return response.data;
  }
}