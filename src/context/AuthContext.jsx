import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

    console.log("AUTH START");

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
    }

    setIsLoading(false);

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