import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import futureImage from "../assets/bgRealEstate.jpg";
import { Helmet } from "react-helmet";
const Login = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://52.165.80.134:4000/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        const { resFirst, resLast, resEmail, resID, resAdmin } = response.data;

        Cookies.set("firstName", resFirst);
        Cookies.set("lastName", resLast);
        Cookies.set("email", resEmail);
        Cookies.set("_id", resID);
        Cookies.set("isAdmin", resAdmin);

        setTimeout(() => {
          window.location.href = redirect;
        }, 100);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Invalid email or password. Please try again.");
      });
  };

  return (
    <>
      <Helmet>
        <title>Login to Your Account | Capital Velocity</title>
        <meta
          name="description"
          content="Log in to your Capital Velocity account to access personalized real estate loan calculators, funding tools, and investment resources."
        />
        <link rel="canonical" href="https://www.capitalvelocity.com/login" />
        <meta name="robots" content="index, follow" />

        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Login",
      "url": "https://www.capitalvelocity.com/login",
      "description": "Access your Capital Velocity dashboard to manage real estate deals, run funding projections, and connect with lenders.",
      "publisher": {
        "@type": "Organization",
        "name": "Capital Velocity",
        "url": "https://www.capitalvelocity.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.capitalvelocity.com/assets/cvlogo-BWrm997-.png"
        }
      }
    }
    `}
        </script>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white pt-8 pb-8">
        <ToastContainer />

        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-7xl min-h-screen md:h-screen items-stretch">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-12">
            <div className="max-w-lg w-full">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-green-700 rounded-xl p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm0 0c0 1.104.896 2 2 2s2-.896 2-2-.896-2-2-2-2 .896-2 2z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Log in to your Capital Velocity account
              </p>

              <hr className="border-t border-gray-300 mb-6" />

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-700 to-green-600 hover:from-teal-800 hover:to-green-700 text-white py-2 rounded-lg transition mt-4"
                >
                  Log in
                </button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-6">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-teal-600 font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
              <p className="text-sm text-gray-500 text-center mt-6">
                Don't remember your password?{" "}
                <a
                  href="/forgot-password"
                  className="text-teal-600 font-medium hover:underline"
                >
                  Reset here
                </a>
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:flex w-full md:w-1/2 h-full">
            <img
              src={futureImage}
              alt="Futuristic visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
