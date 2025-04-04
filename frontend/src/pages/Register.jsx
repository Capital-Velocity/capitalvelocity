import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import futureImage from "../assets/bgRealEstate3.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    const dataToSend = {
      firstName,
      lastName,
      phone: phoneNumber, // 🔥 fix here
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://172.202.105.140:5000/api/users/register",
        dataToSend
      );

      const { resFirst, resLast, resEmail, resID, resAdmin } = response.data;

      Cookies.set("firstName", resFirst);
      Cookies.set("lastName", resLast);
      Cookies.set("email", resEmail);
      Cookies.set("_id", resID);
      Cookies.set("isAdmin", resAdmin);

      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "Email is already registered.") {
          toast.error(
            "The email address is already registered. Please visit the login page to access your account."
          );
        } else {
          toast.error(errorMessage || "An error occurred.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Trigger fade-in by adding opacity-100 after a tick
  useEffect(() => {
    if (showThankYou) {
      setTimeout(() => {
        const el = document.querySelector(".animate-fade-in-manual");
        if (el) el.classList.add("opacity-100");
      }, 50);
    }
  }, [showThankYou]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white pt-8 pb-8 relative">
      <ToastContainer />

      {/* Thank You Overlay */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-100 to-white transition-opacity duration-700 opacity-0 animate-fade-in-manual">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l4-4m-4 4l4 4"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Thank you for registering!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              To comply with national standards, you will be put on a waitlist
              and notified when your account is ready for use. Please be on the
              lookout for an email regarding the status of your application!
            </p>
            <a
              href="/"
              className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition font-medium mb-2"
            >
              Back to Home
            </a>
            <p className="text-sm text-gray-500">
              Didn’t mean to sign up?{" "}
              <a href="/login" className="text-green-600 hover:underline">
                Return to login
              </a>
            </p>
          </div>
        </div>
      )}

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
              Get Started
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Welcome to Capital Velocity — Let’s create your account
            </p>

            <hr className="border-t border-gray-300 mb-6" />

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "firstName", label: "First Name", type: "text" },
                { name: "lastName", label: "Last Name", type: "text" },
                { name: "phoneNumber", label: "Phone Number", type: "tel" },
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-teal-700 to-green-600 hover:from-teal-800 hover:to-green-700 text-white py-2 rounded-lg transition mt-4"
              >
                {submitting ? "Registering..." : "Sign up"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-teal-600 font-medium hover:underline"
              >
                Log in
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
  );
};

export default Register;
