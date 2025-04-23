import React, { useEffect, useState, useRef } from "react";
import GroundUpLoanForm from "../loanCheckout/GroundUpLoanForm";
import { useLocation } from "react-router-dom"; // at the top
import Cookies from "js-cookie";
import axios from "axios";
import { Helmet } from "react-helmet";
function SinglePropertyRentalNewLoanForm() {
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
        <title>Ground-Up Construction Loan | Capital Velocity</title>
        <meta
          name="description"
          content="Secure financing for new real estate development with Capital Velocity's Ground-Up Construction Loan. Build from scratch with flexible terms and expert support."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/loan-form-realestate-groundup"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Ground-Up Construction Loan",
      "url": "https://www.capitalvelocity.com/loan-form-realestate-groundup",
      "description": "Apply for a Ground-Up Construction Loan through Capital Velocity and get funding for new construction projects with fast approvals and builder-friendly terms.",
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
        <GroundUpLoanForm />
      </div>
    </>
  );
}

export default SinglePropertyRentalNewLoanForm;
