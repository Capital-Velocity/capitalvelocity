import React, { useState, useRef } from "react";
import axios from "axios";
// import contactImage from "../imgs/contact-img.jpg";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

export default function Contact() {
  const [isFeatureSelected, setIsFeatureSelected] = useState(false);
  const form = useRef(null);

  const handleFeatureChange = () => {
    setIsFeatureSelected(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const feature = formData.get("feature") || "No feature selected";
    const userMessage = formData.get("message") || "No message provided";
    const firstName = formData.get("first-name") || "";
    const lastName = formData.get("last-name") || "";
    const email = formData.get("email") || "";

    // Ensure we correctly format the message ONCE
    const formattedMessage = `Feature: ${feature}\n\nMessage: ${userMessage}`;

    // Create an object to send to EmailJS
    const emailParams = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: formattedMessage, // Ensuring proper format
    };

    emailjs
      .send(
        "service_93rsoor",
        "template_y8orn3a",
        emailParams,
        "QqP5gpDu3L3j2NB92"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Thank you! We will respond to you shortly.");
          event.target.reset(); // Reset form
          setIsFeatureSelected(false); // Reset feature selection
        },
        (error) => {
          console.error("EmailJS error:", error);
          toast.error("Error submitting form. Try again later.");
        }
      );
  };

  return (
    <div className="relative bg-white">
      <ToastContainer />

      <div className="lg:absolute lg:inset-0 lg:left-1/2">
        <img
          alt=""
          src={"https://assets.maccarianagency.com/backgrounds/img23.jpg"}
          className="w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
        />
      </div>
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Contact Us
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              We’d love to hear from you! Whether you have a question, a project
              idea, or just want to say hello, feel free to reach out. Let’s
              create something amazing together.
            </p>
            <form ref={form} className="mt-16" onSubmit={handleSubmit}>
              <fieldset className="sm:col-span-2">
                <legend className="block text-sm/6 font-semibold text-gray-900">
                  Feature that you are experiencing issues with:
                </legend>
                <div className="mt-4 space-y-4 text-sm/6 text-gray-600">
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Create Organization Profile"
                      id="createOrgProfile"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="createOrgProfile">
                      Create Organization Profile
                    </label>
                  </div>
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Research Package Payment"
                      id="researchPackagePayment"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="researchPackagePayment">
                      Research Package Payment
                    </label>
                  </div>
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Letter Of Intent"
                      id="letterOfIntent"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="letterOfIntent">Letter Of Intent</label>
                  </div>
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Proposal Development"
                      id="proposalDevelopment"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="proposalDevelopment">
                      Proposal Development
                    </label>
                  </div>
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Grant Expert Payment"
                      id="grantExpertPayment"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="grantExpertPayment">
                      Grant Expert Payment
                    </label>
                  </div>
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Grant Expert Tasks"
                      id="grantExpertTasks"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="grantExpertTasks">Grant Expert Tasks</label>
                  </div>
                  <div className="flex gap-x-2.5">
                    <input
                      defaultValue="Submission"
                      id="submission"
                      name="feature"
                      type="radio"
                      onChange={handleFeatureChange}
                      className="relative mt-1 size-4 appearance-none rounded-full border border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label htmlFor="submission">Submission</label>
                  </div>
                </div>
              </fieldset>

              {isFeatureSelected && (
                <>
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
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-indigo-600"
                    />
                  </div>
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
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-indigo-600"
                    />
                  </div>
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
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-indigo-600"
                    />
                  </div>
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
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-indigo-600"
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
  );
}
