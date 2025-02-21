import React, { useEffect, useState, useRef } from "react";
import ProjectEpic99LoanForm from "../loanCheckout/ProjectEpic99LoanForm";

function ProjectEpic99NewLoanForm() {
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
      className={`text-center`}
    >
      <ProjectEpic99LoanForm />
    </div>
  );
}

export default ProjectEpic99NewLoanForm;
