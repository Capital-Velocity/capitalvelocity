import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Contact() {
  const [isFeatureSelected, setIsFeatureSelected] = useState(false);
  const form = useRef(null);

  const handleFeatureChange = () => {
    setIsFeatureSelected(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const emailParams = {
      first_name: formData.get("first-name") || "",
      last_name: formData.get("last-name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      feature: formData.get("feature") || "Not specified",
      message: formData.get("message") || "No message provided",
    };

    emailjs
      .send(
        "service_uo30nsk",
        "template_q1djrcp",
        emailParams,
        "wNJAWIsfSPmQHJjzl"
      )
      .then(
        () => {
          toast.success("Thank you! We will respond to you shortly.");
          event.target.reset();
          setIsFeatureSelected(false);
        },
        (error) => {
          console.error("EmailJS error:", error);
          toast.error("Error submitting form. Try again later.");
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Capital Velocity</title>
        <meta
          name="description"
          content="Contact Capital Velocity for help with business loans, calculators, or partnerships."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/contactUs"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="relative bg-white">
        <ToastContainer />
        <div className="lg:absolute lg:inset-0 lg:left-1/2">
          <img
            alt="Contact Background"
            src="https://assets.maccarianagency.com/backgrounds/img23.jpg"
            className="w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
          />
        </div>

        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-4xl font-semibold text-gray-900 sm:text-5xl">
                Contact Us
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Have a question or need support? Reach out and we’ll respond
                shortly.
              </p>

              <form ref={form} className="mt-16" onSubmit={handleSubmit}>
                {/* Feature Selection */}
                <fieldset className="sm:col-span-2">
                  <legend className="block text-sm font-semibold text-gray-900">
                    Feature you're experiencing issues with:
                  </legend>
                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    {[
                      "DSCR Calculator",
                      "Fix and Flip Calculator",
                      "Project Epic 99",
                      "Partner",
                      "Fix and Flip Loan",
                      "Ground Up Loan",
                      "Multifamily Bridge Loan",
                      "Cashed Out Refinance Loan",
                      "Rental Portfolio Loan",
                      "Single Property Rental Loan",
                      "SBA Loan",
                    ].map((label) => (
                      <div className="flex gap-x-2.5" key={label}>
                        <input
                          id={label}
                          name="feature"
                          type="radio"
                          value={label}
                          required
                          onChange={handleFeatureChange}
                          className="mt-1 size-4 border-gray-300 checked:border-indigo-600 checked:bg-indigo-600 focus:outline-indigo-600"
                        />
                        <label htmlFor={label}>{label}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {isFeatureSelected && (
                  <>
                    {/* First Name */}
                    <div className="mt-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        First name
                      </label>
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        required
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-indigo-600"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="mt-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Last name
                      </label>
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        required
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-indigo-600"
                      />
                    </div>

                    {/* Email */}
                    <div className="mt-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-indigo-600"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="mt-6">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-indigo-600"
                      />
                    </div>

                    {/* Message */}
                    <div className="mt-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Please describe your problem
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base outline outline-1 outline-gray-300 focus:outline-indigo-600"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="mt-6 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
