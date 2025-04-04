import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/bgRealEstate.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://52.165.80.134:4000/api/users/send-password-reset",
        {
          email,
        }
      );

      if (response.status === 200) {
        toast.success(
          "Password reset email sent! Please check your inbox for further instructions."
        );
      }
    } catch (err) {
      toast.error("Unable to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white pt-8 pb-8 relative">
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
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your email to receive a reset link.
            </p>

            <hr className="border-t border-gray-300 mb-6" />

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-700 to-green-600 hover:from-teal-800 hover:to-green-700 text-white py-2 rounded-lg transition mt-4 disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-teal-600 font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex w-full md:w-1/2 h-full">
          <img
            src={logo}
            alt="Futuristic visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
