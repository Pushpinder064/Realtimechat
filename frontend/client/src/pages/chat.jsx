import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import ChatBox from "../components/ChatBox";
import axios from "axios";
import { allUsersRoute } from "../api";
import { io } from "socket.io-client";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("chat-app-user");
    if (!userString) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(userString));
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const token = localStorage.getItem("chat-app-token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${allUsersRoute}/${currentUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error fetching contacts:", err));

    const socketInstance = io("http://localhost:5000", {
      transports: ["websocket"],
      autoConnect: false,
    });

    socketInstance.connect();

    socketInstance.on("connect", () => {
      console.log("Socket connected with id:", socketInstance.id);
      socketInstance.emit("add-user", currentUser.id);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [currentUser, navigate]);

  return (
    <div className="flex h-screen minimal-ui-root" style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}>
      {/* Minimalist Professional UI CSS */}
      <style>{`
        .minimal-ui-root {
          background: #f7f8fa !important;
          color: #23272f;
        }
        .minimal-sidebar {
          min-width: 320px;
          max-width: 360px;
          width: 26vw;
          height: 100vh;
          background: #fff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 0 #0000;
          overflow-y: auto;
        }
        .minimal-chatbox {
          flex: 1;
          height: 100vh;
          background: #f7f8fa;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow-y: auto;
        }
        /* Sidebar contact entry styling (recommended: add .contact to each contact row in Contacts) */
        .minimal-sidebar .contact {
          padding: 12px 20px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.14s;
        }
        .minimal-sidebar .contact:hover,
        .minimal-sidebar .contact.selected {
          background: #f2f6fa;
        }
        /* Custom slim scrollbar */
        .minimal-sidebar::-webkit-scrollbar,
        .minimal-chatbox::-webkit-scrollbar {
          width: 7px;
          background: #fff;
        }
        .minimal-sidebar::-webkit-scrollbar-thumb,
        .minimal-chatbox::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 8px;
        }
        /* Responsive support */
        @media (max-width: 700px) {
          .minimal-sidebar { min-width: 88vw; width: 100vw; }
          .minimal-chatbox { display: none; }
        }
      `}</style>

      {/* Contacts Sidebar */}
      <div className="minimal-sidebar">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          onSelect={setCurrentChat}
          currentChat={currentChat}
        />
      </div>
      {/* ChatBox area */}
      <div className="minimal-chatbox">
        <ChatBox
          socket={socket}
          currentUser={currentUser}
          currentChat={currentChat}
        />
      </div>
    </div>
  );
};

export default Chat;
