import React, { useEffect, useRef, useState } from "react";
import * as WebChat from "botframework-webchat";
import axios from "axios";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatBot = () => {
  const chatRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
                backgroundColor: "#f9f9f9",
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
  }, [isOpen]);

  return (
    <>
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
