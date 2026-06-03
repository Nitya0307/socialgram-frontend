import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase }
  from "../supabase";

import {
  googleLoginUserUseCase,
} from "../di/container";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {

  const [isLoading,
    setIsLoading] =
    useState(true);

  const [user,
    setUser] =
    useState(null);

  const [token,
    setToken] =
    useState(null);

  useEffect(() => {

    const restoreSession =
      async () => {

        try {

          console.log(
            "AUTH START"
          );

          const storedUser =
            localStorage.getItem(
              "user"
            );

          const storedToken =
            localStorage.getItem(
              "token"
            );

          console.log(
            "storedUser:",
            storedUser
          );

          console.log(
            "storedToken:",
            storedToken
          );

          // NORMAL LOGIN SESSION
          if (
            storedUser &&
            storedToken
          ) {

            console.log(
              "RESTORING USER"
            );

            setUser(
              JSON.parse(
                storedUser
              )
            );

            setToken(
              storedToken
            );

            setIsLoading(
              false
            );

            return;
          }

          // GOOGLE SESSION
          const {

            data: {
              user:
                googleUser,
            },

          } =

            await supabase
              .auth
              .getUser();

          if (
            googleUser
          ) {

            console.log(
              "RESTORING GOOGLE USER"
            );

            const existingUser =

              await googleLoginUserUseCase
                .execute(
                  googleUser
                );

            localStorage.setItem(
              "user",

              JSON.stringify(
                existingUser
              )
            );

            localStorage.setItem(
              "token",
              "google-auth"
            );

            setUser(
              existingUser
            );

            setToken(
              "google-auth"
            );
          }

        } catch (err) {

          console.log(
            err
          );

        } finally {

          setIsLoading(
            false
          );
        }
      };

    restoreSession();

  }, []);

  const login = (
    userData,
    userToken
  ) => {

    localStorage.setItem(
      "user",

      JSON.stringify(
        userData
      )
    );

    localStorage.setItem(
      "token",
      userToken
    );

    setUser(
      userData
    );

    setToken(
      userToken
    );
  };

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    // GOOGLE LOGOUT
    supabase.auth.signOut();

    setUser(null);

    setToken(null);
  };

  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        isLoading,

        login,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(
    AuthContext
  );
}