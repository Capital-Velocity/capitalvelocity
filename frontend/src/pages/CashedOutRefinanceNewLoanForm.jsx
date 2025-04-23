import React, { useEffect, useState, useRef } from "react";
import CashedOutRefinanceLoanForm from "../loanCheckout/CashedOutRefinanceLoanForm";
import { useLocation } from "react-router-dom"; // at the top
import Cookies from "js-cookie";
import axios from "axios";
import { Helmet } from "react-helmet";
function CashedOutRefinanceNewLoanForm() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [componentKey, setComponentKey] = useState(0); // 👈 Force re-mount
  const location = useLocation(); // ✅ get current path

  const headingRef = useRef(null);

  const hasSentNotification = useRef(false); // ✅ Fix: initialize ref

  const emailCookie = Cookies.get("email");

  const sendNotification = async (userEmail, purpose = "general") => {
    try {
      await axios.post(
        "https://52.165.80.134:4000/api/users/send-notification",
        {
          email: userEmail,
          page: window.location.pathname,
          purpose,
        }
      );
      console.log(
        "Notification email sent (or skipped if already recently sent)"
      );
    } catch (error) {
      console.error(
        "Failed to send notification:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const emailCookie = Cookies.get("email");

    if (emailCookie && !hasSentNotification.current) {
      sendNotification(emailCookie, "loanform");
      hasSentNotification.current = true;
    }
  }, [location.pathname]); // ✅ will re-run when path changes

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
    <>
      <Helmet>
        <title>Cashed-Out Refinance Loan | Capital Velocity</title>
        <meta
          name="description"
          content="Unlock home or investment equity with a Cashed-Out Refinance Loan from Capital Velocity. Access capital while keeping your real estate."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/loan-form-realestate-cashedoutrefinance"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Cashed-Out Refinance Loan",
      "url": "https://www.capitalvelocity.com/loan-form-realestate-cashedoutrefinance",
      "description": "Apply for a Cashed-Out Refinance Loan with Capital Velocity to access equity from your real estate while maintaining ownership. Ideal for renovations, investments, or financial flexibility.",
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
      <div
        ref={headingRef}
        key={componentKey} // 👈 Ensures React re-renders on refresh
        className={`text-center`}
      >
        {/* <RentalPortfolioLoanForm /> */}
        <CashedOutRefinanceLoanForm />
      </div>
    </>
  );
}

export default CashedOutRefinanceNewLoanForm;
