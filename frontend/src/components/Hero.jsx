import glacierParkImg from "../assets/glacier-park.jpg";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
      <img
        alt="Glacier Park"
        loading="lazy"
        decoding="async"
        className="-z-10 object-cover absolute inset-0 w-full h-full"
        src={glacierParkImg}
      />
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
                className={`max-w-[600px] text-white md:text-xl pt-6 fade-in ${
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
              className={`flex gap-4 fade-in
                              ${
                                isParagraphVisible
                                  ? "fade-in-show paragraph-fade-in-show-extra"
                                  : "fade-in-hide"
                              }`}
            >
              <button
                onClick={handleScrollToBottom} // Attach scroll handler
                className={`flex items-center justify-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br
      focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800
      shadow-md shadow-green-500/50 dark:shadow-md dark:shadow-green-800/80 
      rounded-md px-3 h-10 text-center font-semibold
      }`}
                style={{ fontSize: "14px" }} // Apply font size
                type="button"
              >
                Explore Real Estate Loans
              </button>

              <Link to="/loan-form-business-loans">
                <button
                  className="flex items-center justify-center text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br
      focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
      shadow-md shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 
      rounded-md px-3 h-10 text-center font-semibold"
                  style={{ fontSize: "14px" }} // Apply font size
                  type="button"
                >
                  Explore Business Loans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
