import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import logo from "../assets/bgRealEstate.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://52.165.80.134:4000/api/users/reset-password",
        {
          token,
          password: newPassword,
        }
      );

      if (response.status === 200) {
        setMessage("Password reset successful! You can now log in.");
      }
    } catch (err) {
      setError("Error resetting password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Capital Velocity</title>
        <meta
          name="description"
          content="Securely reset your Capital Velocity account password. Enter and confirm your new password to regain access to your account."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/reset-password"
        />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Reset Password",
      "url": "https://www.capitalvelocity.com/reset-password",
      "description": "Reset your Capital Velocity account password with a secure link. Enter and confirm your new password to continue accessing your services.",
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
                Reset Your Password
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Enter and confirm your new password
              </p>

              <hr className="border-t border-gray-300 mb-6" />

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}
                {message && (
                  <div className="text-green-600 text-sm">{message}</div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-teal-700 to-green-600 hover:from-teal-800 hover:to-green-700 text-white py-2 rounded-lg transition mt-4 disabled:opacity-50"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden md:flex w-full md:w-1/2 h-full">
            <img
              src={logo}
              alt="Reset illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
