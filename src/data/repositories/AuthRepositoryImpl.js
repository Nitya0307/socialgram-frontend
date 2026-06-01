import AuthRepository
  from "../../domain/repositories/AuthRepository";
import { supabase }
  from "../../supabase";

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

  async loginWithGoogle() {

  const { data, error } =
    await supabase.auth
      .signInWithOAuth({

        provider: "google",

        options: {

          redirectTo:
            window.location.origin,
        },
      });

  if (error) {

    throw error;
  }

  return data;
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