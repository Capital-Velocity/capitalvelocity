import MultiFamilyBridgeLoanForm from "../loanCheckout/MultiFamilyBridgeLoanForm";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"; // at the top
import Cookies from "js-cookie";
import axios from "axios";

function MultiFamilyBridgeNewLoanForm() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [componentKey, setComponentKey] = useState(0); // 👈 Force re-mount
  const location = useLocation(); // ✅ get current path

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
      <MultiFamilyBridgeLoanForm />
    </div>
  );
}

export default MultiFamilyBridgeNewLoanForm;
