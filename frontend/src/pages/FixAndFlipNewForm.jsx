import Checkout from "../loanCheckout/Checkout";
import React, { useEffect, useState, useRef } from "react";

function FixAndFlipNewForm() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [componentKey, setComponentKey] = useState(0); // 👈 Force re-mount

  const headingRef = useRef(null);

  useEffect(() => {
    setIsHeadingVisible(false); // Reset visibility on mount

    const handleIntersection = (entries) => {
      const entry = entries[0];
      setIsHeadingVisible(entry.isIntersecting);
    };

    const headingObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (headingRef.current) headingObserver.observe(headingRef.current);

    return () => headingObserver.disconnect();
  }, [componentKey]); // 👈 Re-run effect when componentKey changes

  // 👇 Force re-mount on reload by updating key
  useEffect(() => {
    setComponentKey((prev) => prev + 1);
  }, []);

  return (
    <div
      ref={headingRef}
      key={componentKey} // 👈 Ensures React re-renders on refresh
      className={`text-center fade-in ${
        isHeadingVisible ? "fade-in-show" : "fade-in-hide"
      }`}
    >
      <Checkout />
    </div>
  );
}

export default FixAndFlipNewForm;
