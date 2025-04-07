import Checkout from "../loanCheckout/Checkout";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function FixAndFlipNewForm() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [componentKey, setComponentKey] = useState(0); // 👈 Force re-mount
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
    if (emailCookie && !hasSentNotification.current) {
      console.log("Triggering send-notification for", emailCookie);
      sendNotification(emailCookie, "loanform");
      hasSentNotification.current = true; // ✅ Prevent future triggers
    }
  }, [emailCookie]);

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
    <div ref={headingRef} key={componentKey} className="text-center">
      <Checkout />
    </div>
  );
}

export default FixAndFlipNewForm;
