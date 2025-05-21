import glacierParkImg from "../assets/glacier-park.jpg";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bgVidRealEstate1 from "../assets/bgvidRealEstate1.mp4";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  const handleScrollToBottom = (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    // Scroll to the bottom of the page
    window.scrollTo({
      top: document.documentElement.scrollHeight, // Scroll to the bottom
      behavior: "smooth", // Smooth scroll animation
    });
  };

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
    <section className="w-full py-12 md:py-24 lg:py-32 relative h-screen">
      {/* <img
        alt="Glacier Park"
        loading="lazy"
        decoding="async"
        className="-z-10 object-cover absolute inset-0 w-full h-full"
        src={glacierParkImg}
      /> */}
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVidRealEstate1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="space-y-6">
            <div>
              <p
                ref={headingRef}
                className={`text-white tracking-tighter text-6xl fade-in ${
                  isHeadingVisible ? "fade-in-show" : "fade-in-hide"
                }`}
              >
                Capital Velocity
              </p>
              <p
                ref={paragraphRef}
                className={`max-w-[600px] text-white md:text-2xl pt-6 fade-in ${
                  isParagraphVisible
                    ? "fade-in-show paragraph-fade-in-show"
                    : "fade-in-hide"
                }`}
              >
                Connecting visionaries with opportunities. <br />
                Discover, Invest, and Grow.
              </p>
            </div>
            <div
              ref={paragraphRef}
              className={`fade-in ${
                isParagraphVisible
                  ? "fade-in-show paragraph-fade-in-show-extra"
                  : "fade-in-hide"
              }`}
            >
              {/* Top Row - Original Two Buttons */}
              <div className="flex flex-wrap gap-4 mb-4">
                <Link to="/loan-form-realestate">
                  <button
                    className="flex items-center justify-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br
        focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800
        shadow-md shadow-green-500/50 dark:shadow-md dark:shadow-green-800/80 
        rounded-md px-6 py-3 text-center text-lg font-semibold"
                    type="button"
                  >
                    Explore Real Estate Loans
                  </button>
                </Link>

                <Link to="/loan-form-business-loans">
                  <button
                    className="flex items-center justify-center text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br
        focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
        shadow-md shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 
        rounded-md px-6 py-3 text-center text-lg font-semibold"
                    type="button"
                  >
                    Explore Business Loans
                  </button>
                </Link>
              </div>

              {/* Bottom Row - New Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/fix-and-flip-calculator">
                  <button
                    className="flex items-center justify-center text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br
        focus:ring-2 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800
        shadow-md shadow-yellow-500/50 dark:shadow-md dark:shadow-yellow-800/80 
        rounded-md px-6 py-3 text-center text-lg font-semibold"
                    type="button"
                  >
                    Fix and Flip Calculator
                  </button>
                </Link>

                <Link to="/dscr-calculator">
                  <button
                    className="flex items-center justify-center text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br
        focus:ring-2 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800
        shadow-md shadow-purple-500/50 dark:shadow-md dark:shadow-purple-800/80 
        rounded-md px-6 py-3 text-center text-lg font-semibold"
                    type="button"
                  >
                    Rental DSCR Calculator
                  </button>
                </Link>

                <Link to="/dscr-optimizer-calculator">
                  <button
                    className="flex items-center justify-center text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br
        focus:ring-2 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800
        shadow-md shadow-pink-500/50 dark:shadow-md dark:shadow-pink-800/80 
        rounded-md px-6 py-3 text-center text-lg font-semibold"
                    type="button"
                  >
                    Rental DSCR Optimizer
                  </button>
                </Link>
                <Link to="/become-partner">
                  <button
                    className="flex items-center justify-center text-white bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br
      focus:ring-2 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800
      shadow-md shadow-indigo-500/50 dark:shadow-md dark:shadow-indigo-800/80 
      rounded-md px-6 py-3 text-center text-lg font-semibold"
                    type="button"
                  >
                    Affiliate Program
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
