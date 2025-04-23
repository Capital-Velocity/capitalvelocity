import Checkout from "../loanCheckout/Checkout";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom"; // at the top
import { Helmet } from "react-helmet";
function FixAndFlipNewForm() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [componentKey, setComponentKey] = useState(0); // 👈 Force re-mount
  const headingRef = useRef(null);
  const hasSentNotification = useRef(false); // ✅ Fix: initialize ref
  const location = useLocation(); // ✅ get current path

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

  useEffect(() => {
    setComponentKey((prev) => prev + 1); // 👈 Force re-mount on load
  }, []);

  return (
    <>
      <Helmet>
        <title>Fix and Flip Loan | Capital Velocity</title>
        <meta
          name="description"
          content="Apply for Capital Velocity's Fix and Flip Loan. Get fast funding for real estate investment projects with flexible terms and streamlined approvals."
        />
        <link
          rel="canonical"
          href="https://www.capitalvelocity.com/loan-form-realestate-fixandflip"
        />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Fix and Flip Loan",
      "url": "https://www.capitalvelocity.com/loan-form-realestate-fixandflip",
      "description": "Apply for Capital Velocity's Fix and Flip Loan to finance your next real estate investment project. Enjoy quick funding, simple terms, and expert support.",
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
      <div ref={headingRef} key={componentKey} className="text-center">
        <Checkout />
      </div>
    </>
  );
}

export default FixAndFlipNewForm;
