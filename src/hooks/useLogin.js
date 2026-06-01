// IMPORTS REACT HOOKS FROM REACT LIBRARY
// useState -> stores state values
// useEffect -> runs side effects after render
import {
  useState,
  useEffect,
} from "react";


// IMPORTS NAVIGATION FUNCTION FROM REACT ROUTER
// used to change pages programmatically
import { useNavigate }
  from "react-router-dom";


// IMPORTS SUPABASE CLIENT CONFIGURATION
// used for Google OAuth authentication
import { supabase }
  from "../supabase";


// IMPORTS CUSTOM AUTH CONTEXT HOOK
// gives access to global auth functions like login()
import { useAuth }
  from "../context/AuthContext";


// IMPORTS USECASES FROM DI CONTAINER
// these are business layer actions
import {
  loginUserUseCase,
  googleLoginUserUseCase,
} from "../di/container";


// IMPORTS APP CONFIG VALUES
// contains reusable frontend config like URL
import {
  APP_CONFIG,
} from "../core/config/apiConfig";


// EXPORTS CUSTOM REACT HOOK
// this hook controls login page behavior
export default function useLogin() {

  // CREATES NAVIGATION FUNCTION
  // navigate("/home") changes route/page
  const navigate = useNavigate();

  // GETS login() FUNCTION FROM AUTH CONTEXT
  // used to store logged-in user globally
  const { login } = useAuth();



  // PASSWORD VISIBILITY STATE
  // showPw stores true/false
  // false means hidden password initially
  const [showPw, setShowPw] =
    useState(false);



  // LOADING STATE
  // controls loading spinner/button text
  // initially false because no login running
  const [loading, setLoading] =
    useState(false);



  // ERROR STATE
  // stores login error messages
  // empty initially because no error yet
  const [error, setError] =
    useState("");



  // FORM INPUT STATE
  // stores email/username + password
  // initial values are empty strings
  const [formData, setFormData] =
    useState({

      // stores email/username/mobile input
      identifier: "",

      // stores password input
      password: "",
    });



  // useEffect RUNS AFTER COMPONENT RENDERS
  // dependency array means:
  // rerun only if navigate or login changes
  useEffect(() => {



    // CREATES ASYNC FUNCTION
    // async needed because API/auth calls use await
    const syncGoogleUser =
      async () => {

        try {

          // CHECKS IF GOOGLE USER ALREADY EXISTS
          // supabase.auth.getUser() checks current session
          const {

            // RESPONSE CONTAINS data OBJECT
            // destructuring extracts user directly
            data: { user: googleUser },

          } =

            // waits for Supabase response
            await supabase.auth.getUser();



          // IF NO GOOGLE USER EXISTS
          // stop function immediately
          if (!googleUser) return;



          // EXECUTES GOOGLE LOGIN USECASE
          // delegates business login flow to domain layer
          const existingUser =

            await googleLoginUserUseCase
              .execute(googleUser);



          // SAVES USER INSIDE AUTH CONTEXT
          // stores user globally in app
          login(

            // user object from backend/domain
            existingUser,

            // fake token label for Google auth
            "google-auth"
          );



          // REDIRECT USER TO HOME PAGE
          navigate("/home");



        } catch (err) {

          // PRINTS ERROR IN BROWSER CONSOLE
          console.log(err);
        }
      };



    // EXECUTES syncGoogleUser FUNCTION
    // without this line function would never run
    syncGoogleUser();



  // DEPENDENCY ARRAY
  // reruns effect if navigate/login changes
  }, [navigate, login]);



  // INPUT CHANGE HANDLER FUNCTION
  // runs whenever user types in input
  const handleChange = (e) => {



    // UPDATES formData STATE
    setFormData({



      // COPIES OLD formData VALUES
      // prevents overwriting entire object
      ...formData,



      // DYNAMICALLY SETS INPUT FIELD
      // e.target.name = input name
      // e.target.value = typed value
      [e.target.name]:

        e.target.value,
    });
  };



  // LOGIN HANDLER FUNCTION
  // runs when user clicks Sign In button
  const handleLogin =
    async () => {

      try {

        // START LOADING STATE
        // triggers rerender
        // button becomes "Signing in..."
        setLoading(true);



        // CLEARS PREVIOUS ERROR MESSAGE
        setError("");



        // EXECUTES LOGIN USECASE
        // delegates business login action
        const response =

          await loginUserUseCase
            .execute(formData);



        // SAVES USER + TOKEN GLOBALLY
        // updates AuthContext state
        login(

          // backend user object
          response.user,

          // JWT/auth token
          response.token
        );



        // REDIRECTS TO HOME PAGE
        navigate("/home");



      } catch (err) {

        // PRINT ERROR IN CONSOLE
        console.log(err);



        // SHOW ERROR MESSAGE IN UI
        setError(


          // backend error message if exists
          err.response?.data
            ?.message ||


          // generic JS error message
          err.message ||


          // fallback message
          "Login failed"
        );



      } finally {

        // ALWAYS RUNS
        // success OR failure

        // STOPS LOADING STATE
        setLoading(false);
      }
    };



  // GOOGLE LOGIN HANDLER
  // runs when user clicks Google button
  const handleGoogleLogin =
    async () => {

      try {

        // STARTS GOOGLE OAUTH FLOW
        const { error } =

          await supabase.auth
            .signInWithOAuth({



              // AUTH PROVIDER
              provider: "google",



              // EXTRA OPTIONS
              options: {



                // WHERE USER RETURNS AFTER LOGIN
                redirectTo:
                  APP_CONFIG.FRONTEND_URL,
              },
            });



        // IF SUPABASE RETURNS ERROR
        if (error) {

          // manually throw error
          throw error;
        }



      } catch (err) {

        // PRINT ERROR IN CONSOLE
        console.log(err);



        // SHOW ERROR MESSAGE IN UI
        setError(
          "Google login failed"
        );
      }
    };



  // RETURNS VALUES/FUNCTIONS
  // exposes them to Login.jsx
  return {



    // current form values
    formData,



    // password visibility boolean
    showPw,



    // function to update password visibility
    setShowPw,



    // input change function
    handleChange,



    // login button function
    handleLogin,



    // Google login function
    handleGoogleLogin,



    // loading state
    loading,



    // error state
    error,
  };
}