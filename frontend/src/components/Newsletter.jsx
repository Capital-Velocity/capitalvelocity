import Button from "@mui/material/Button";
import axios from "axios";
import typography from "@mui/system/typography";
import { useState, useEffect, useRef, React } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Email before setEmail:", email);

    try {
      // Access the input value directly
      const emailValue = document.getElementById("search").value;
      setEmail(emailValue); // Update state
      // console.log("Email value:", emailValue);

      const data = await axios.post(
        "https://52.165.80.134:4000/api/emailRouter/newsletter",
        {
          email: emailValue, // Use the input value directly for the request
        }
      );

      alert("You have been subscribed to our newsletter!", data);
    } catch (err) {
      if (err.response && err.response.data) {
        // Show the specific error message returned from the backend
        alert(
          err.response.data.error ||
            "You are already subscribed to the newsletter."
        );
      } else {
        alert(
          "There was an error subscribing to the newsletter. Please use the Contact Us form to communicate this issue with us."
        );
      }
    }
  };

  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries, observer, setVisibility) => {
      const entry = entries[0];
      setVisibility(entry.isIntersecting);
    };

    const headingObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, headingObserver, setIsHeadingVisible),
      { threshold: 0.8 } // Trigger when 20% of the element is visible
    );

    const paragraphObserver = new IntersectionObserver(
      (entries) =>
        handleIntersection(entries, paragraphObserver, setIsParagraphVisible),
      { threshold: 0.8 }
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current)
        paragraphObserver.unobserve(paragraphRef.current);
    };
  }, []);

  return (
    <div className="bg-white py-24 pt-10 pb-0 sm:py-32">
      <div className="mx-auto px-6 lg:px-8 w-3/4">
        <div className="mx-auto text-center w-full pb-6">
          {/* Heading */}
          {/* <h2
            ref={headingRef}
            className={`text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-6xl fade-in ${
              isHeadingVisible ? "fade-in-show" : "fade-in-hide"
            }`}
          >
            Stay Updated on{" "}
            <span className="bg-gradient-to-r from-[rgb(62,141,238)] to-[rgb(119,238,250)] text-transparent bg-clip-text">
              Funding Opportunities{" "}
            </span>{" "}
          </h2> */}

          {/* Paragraph */}
          <p
            ref={paragraphRef}
            className={`mx-auto mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 fade-in ${
              isParagraphVisible
                ? "fade-in-show paragraph-fade-in-show"
                : "fade-in-hide"
            }`}
          >
            Sign up for our newsletter here!
          </p>
        </div>
        <form
          onSubmit={submitHandler} // Use the submit event on the form
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        >
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Enter your email
          </label>
          <div className="flex flex-col sm:relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="email"
              id="search"
              className="block w-full pl-10 sm:pr-40 pr-4 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              required
            />

            <button
              type="submit"
              className="text-white sm:absolute sm:right-2.5 sm:bottom-2.5 mt-2 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join Us!
            </button>
          </div>
        </form>
      </div>
    </div>

    // <div className="pb-8">
    //   <div className="text-center">
    //     <h1 className="text-5xl text-blue-600 font-bold pb-5 pt-10">
    //       Stay Updated on Funding Opportunities
    //     </h1>
    //     <h1 className="text-2xl text-blue-800 font-bold pb-5">
    //       Subscribe for the latest grants and funding tips!
    //     </h1>
    //   </div>
    //   <form className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <label
    //       htmlFor="search"
    //       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    //     >
    //       Enter your email
    //     </label>
    //     <div className="relative w-full">
    //       <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    //         <svg
    //           className="w-4 h-4 text-gray-500 dark:text-gray-400"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 20 20"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    //           />
    //         </svg>
    //       </div>
    //       <input
    //         type="email"
    //         id="search"
    //         className="block w-full pl-10 pr-12 py-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         placeholder="Enter your email"
    //         required
    //       />
    //       <button
    //         type="submit"
    //         onClick={submitHandler}
    //         className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Join Us!
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
}
