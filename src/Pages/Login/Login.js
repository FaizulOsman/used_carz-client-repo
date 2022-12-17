import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import PrimaryButton from "../../components/PrimaryButton";
import { AuthContext } from "../../contexts/AuthProvider";
import CarToRight from "../../assets/images/carToRight.png";
import carBG from "../../assets/images/carBG.png";
import carBG2 from "../../assets/images/carBG2.png";

const Login = () => {
  const {
    logIn,
    loading,
    setLoading,
    googleSignIn,
    resetPassword,
    githubSignIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState();

  const from = location.state?.from?.pathname || "/";

  const { data: databaseUsers = [] } = useQuery({
    queryKey: ["databaseUsers"],
    queryFn: async () => {
      const res = await fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/users`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Log In With Email and Password
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        const currentUser = { email: user.email };

        // set JWT token
        fetch(
          "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // set token in local storage
            localStorage.setItem("accessToken", data.token);
            toast.success("Successfully logged in");
            navigate(from, { replace: true });
            form.reset();
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
        setLoading(false);
      });
  };

  // Save user in database
  const saveUser = ({ name, email, image, acting }) => {
    const user = { name, email, image, acting };
    fetch(
      "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/users",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // Google Log In
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const currentUser = { email: user.email };
        const userDetails = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          acting: "buyer",
        };

        // set JWT token
        fetch(
          "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const filter = databaseUsers.filter(
              (databaseUser) => databaseUser?.email === user?.email
            );
            if (!filter) {
              saveUser(userDetails);
            }

            // set token in local storage
            localStorage.setItem("accessToken", data.token);
            toast.success("Successfully signed in with google");
            navigate(from, { replace: true });
          });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
        setLoading(false);
      });
  };

  // Github Sign In
  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => {
        const user = result.user;
        const currentUser = { email: user.email };
        const userDetails = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          acting: "buyer",
        };

        // set JWT token
        fetch(
          "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            const filter = databaseUsers.filter(
              (databaseUser) => databaseUser?.email === user?.email
            );
            if (!filter) {
              saveUser(userDetails);
            }

            // set token in local storage
            localStorage.setItem("accessToken", data.token);
            toast.success("Successfully signed in with github");
            navigate(from, { replace: true });
          });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
        setLoading(false);
      });
  };

  // Reset Password
  const handleResetPassword = () => {
    resetPassword(userEmail)
      .then(() => {
        toast.success("Please check your email to reset password");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg z-10 shadow-2xl">
        {/* <div className="flex justify-center items-center px-5">
          <img className="w-full max-w-lg my-10 h-40" src={CarToRight} alt="" />
        </div> */}
        <div
          className="flex w-0 md:w-full h-0 md:h-full justify-center items-center px-5"
          style={{
            background: `url(${carBG2})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img className="w-full max-w-sm my-10 h-40" src={CarToRight} alt="" />
        </div>
        <div
          style={{
            background: `url(${carBG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="flex flex-col p-6 sm:p-10 text-gray-900"
        >
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold text-secondary">Login</h1>
            <p className="text-sm text-gray-400">
              Log in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  onBlur={(e) => setUserEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <PrimaryButton
                type="submit"
                classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
              >
                {loading ? (
                  <div className="h-5 mt-1 mx-auto">
                    <PropagateLoader color="#36d7b7" />
                  </div>
                ) : (
                  "Log In"
                )}
              </PrimaryButton>
            </div>
          </form>
          <div className="space-y-1">
            <button
              onClick={handleResetPassword}
              className="text-xs hover:underline text-gray-400"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-20 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">Social Login</p>
            <div className="flex-1 h-px sm:w-20 dark:bg-gray-700"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGoogleSignIn}
              aria-label="Log in with Google"
              className="p-3 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>

            <button
              onClick={handleGithubSignIn}
              aria-label="Log in with GitHub"
              className="p-3 rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
          </div>
          <p className="px-6 text-sm text-center text-black">
            Don't have an account?{" "}
            <Link to="/register" className="hover:underline text-secondary">
              Register
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
