import React, { useState, useEffect, useRef } from "react";
import ChatMessages from "./ChatMessage";
import ChatInput from "./ChatInput";

const API_URL = "http://localhost:5000";

const ChatBox = ({ socket, currentUser, currentChat }) => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat history when currentChat or currentUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentChat || !currentUser) return;
      try {
        const token = localStorage.getItem("chat-app-token");
        const response = await fetch(`${API_URL}/api/messages/getmsg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            from: currentUser.id,
            to: currentChat.id,
          }),
        });
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };
    fetchMessages();
  }, [currentChat, currentUser]);

 
  useEffect(() => {
    if (!socket) return;
    const receiveHandler = ({ from, message }) => {
      if (currentChat && from === currentChat.id) {
        setMessages((msgs) => [...msgs, { fromSelf: false, message }]);
      }
    };
    socket.on("msg-recieve", receiveHandler);
    return () => socket.off("msg-recieve", receiveHandler);
  }, [socket, currentChat]);

 
  const handleSend = (msg) => {
    if (!socket || !currentUser || !currentChat) return;
    setMessages((msgs) => [...msgs, { fromSelf: true, message: msg }]);
    socket.emit("send-msg", {
      from: currentUser.id,
      to: currentChat.id,
      message: msg,
    });

    fetch(`${API_URL}/api/messages/addmsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("chat-app-token")}`,
      },
      body: JSON.stringify({
        from: currentUser.id,
        to: currentChat.id,
        message: msg,
      }),
    }).catch((err) => {
      console.error("Failed to save message:", err);
    });
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-xl">
        <style>{`
          .flex-1 {
            background: #f7f8fa;
            border-radius: 0 14px 14px 0;
            color: #818b99;
            font-family: Inter, Segoe UI, Arial, sans-serif;
          }
        `}</style>
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg minimal-chatbox-ui">
      <style>{`
        .minimal-chatbox-ui {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 2px 20px rgba(36,40,55,0.070);
          border: 1px solid #f0f1f4;
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: Inter, Segoe UI, Arial, sans-serif;
        }
        .minimal-chatbox-header {
          padding: 18px 26px 12px 26px;
          border-bottom: 1px solid #ececec;
          font-weight: 600;
          font-size: 1.17rem;
          color: #222c33;
          letter-spacing: -0.011em;
          margin-bottom: 0;
          background: #fafcff;
          border-radius: 14px 14px 0 0;
        }
        .minimal-chatbox-messages {
          flex: 1;
          overflow-y: auto;
          background: #f8fafb;
          padding: 30px 0 14px 0;
        }
        .minimal-chatbox-input {
          border-top: 1px solid #f0f1f4;
          background: #fff;
          border-radius: 0 0 14px 14px;
        }
        /* Slim scrollbar for message list */
        .minimal-chatbox-messages::-webkit-scrollbar { width: 7px; background: #f8fafb; }
        .minimal-chatbox-messages::-webkit-scrollbar-thumb { background: #e7eaf2; border-radius: 8px; }
      `}</style>
      <div className="minimal-chatbox-header">
        Chat with {currentChat.username}
      </div>
      <div className="minimal-chatbox-messages">
        <ChatMessages messages={messages} currentUser={currentUser} />
        <div ref={bottomRef} />
      </div>
      <div className="minimal-chatbox-input">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatBox;
