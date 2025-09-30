import React, { useRef, useEffect } from "react";

const ChatMessages = ({ messages, currentUser }) => {
  const endRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="minimal-chatmsg-list">
      <style>{`
        .minimal-chatmsg-list {
          flex: 1;
          overflow-y: auto;
          padding: 24px 0 16px 0;
          display: flex;
          flex-direction: column;
        }
        .minimal-chatmsg-bubble {
          max-width: 67%;
          padding: 10px 16px;
          font-size: 1.04rem;
          border-radius: 17px;
          box-shadow: 0 1px 5px #26324a0a;
          margin-bottom: 13px;
          word-break: break-word;
          line-height: 1.45;
        }
        .minimal-chatmsg-self {
          align-self: flex-end;
          background: #197278;
          color: #fff;
          border-bottom-right-radius: 6px;
        }
        .minimal-chatmsg-other {
          align-self: flex-start;
          background: #f2f6fa;
          color: #23272f;
          border-bottom-left-radius: 6px;
        }
      `}</style>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={
            `minimal-chatmsg-bubble ` +
            (msg.fromSelf ? 'minimal-chatmsg-self' : 'minimal-chatmsg-other')
          }
        >
          {msg.message}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;
