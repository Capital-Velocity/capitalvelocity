import React, { useEffect, useRef, useState } from "react";
import * as WebChat from "botframework-webchat";
import axios from "axios";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatBot = () => {
  const chatRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(true); // Control arrow visibility

  useEffect(() => {
    const loadBot = async () => {
      try {
        const response = await axios.get(
          "https://52.165.80.134:4000/api/users/token"
        );
        const { token } = response.data;

        if (chatRef.current) {
          WebChat.renderWebChat(
            {
              directLine: WebChat.createDirectLine({ token }),
              userID: "user123",
              styleOptions: {
                botAvatarInitials: "🤖",
                userAvatarInitials: "👤",
                backgroundCol: "#f9f9f9",
                bubbleBackground: "#e0e0e0",
                bubbleFromUserBackground: "#d1e7dd",
                rootHeight: "100%",
                hideUploadButton: true,
              },
            },
            chatRef.current
          );
        }
      } catch (error) {
        console.error("Failed to load bot:", error);
      }
    };

    if (isOpen) loadBot();
    if (isOpen) setShowArrow(false); // Hide arrow when chat is open
  }, [isOpen]);

  return (
    <>
      {/* Arrow above the chat icon */}
      {!isOpen && showArrow && (
        <div
          className="fixed bottom-[100px] right-0 z-50 w-[110px] text-center"
          style={{
            transform: "translateX(50%)", // centers the tooltip above the icon
            animation: "floatArrow 2s ease-in-out infinite",
          }}
        >
          <div className="bg-white border border-blue-300 rounded-md px-3 py-2 shadow-lg text-sm font-medium text-blue-700">
            Use the chatbot to learn about our loan programs and terms
          </div>
          <div style={{ fontSize: "36px", marginTop: "4px", color: "#2563eb" }}>
            ⬇️
          </div>

          <style>
            {`
        @keyframes floatArrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}
          </style>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-[360px] h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div ref={chatRef} style={{ height: "100%", width: "100%" }} />
        </div>
      )}
    </>
  );
};

export default ChatBot;
