import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    onSend(msg.trim());
    setMsg("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center minimal-chatinput-bar"
      style={{ background: "#fff" }}
    >
      <style>{`
        .minimal-chatinput-bar {
          border-top: 1px solid #f0f1f4;
          padding: 13px 14px;
          border-radius: 0 0 14px 14px;
        }
        .minimal-chatinput-input {
          flex: 1;
          border: 1.2px solid #dde2e9;
          border-radius: 6px;
          padding: 9px 15px;
          font-size: 1.04rem;
          transition: border 0.14s, box-shadow 0.10s;
          background: #f7f8fa;
          color: #2a323c;
        }
        .minimal-chatinput-input:focus {
          outline: none;
          border: 1.5px solid #62b6aa;
          background: #fff;
          box-shadow: 0 1px 4px #13787210;
        }
        .minimal-chatinput-btn {
          margin-left: 13px;
          background: #197278;
          color: #fff;
          padding: 9px 22px 10px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          font-size: 1.02rem;
          cursor: pointer;
          transition: background 0.13s;
          box-shadow: 0 1.2px 6px #1d5c4650;
        }
        .minimal-chatinput-btn:hover, .minimal-chatinput-btn:focus {
          background: #179090;
        }
      `}</style>
      <input
        className="minimal-chatinput-input"
        placeholder="Type a message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="minimal-chatinput-btn"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
