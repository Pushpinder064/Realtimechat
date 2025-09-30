import React from "react";

// Helper to get the first initial in uppercase
function getInitial(name) {
  if (!name) return "";
  return name.trim().charAt(0).toUpperCase();
}

const Contacts = ({ contacts, currentUser, onSelect, currentChat }) => {
  return (
    <div className="minimal-contacts-sidebar">
      <style>{`
        .minimal-contacts-sidebar {
          width: 320px;
          background: #fff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          height: 100vh;
          min-width: 240px;
          font-family: Inter, Segoe UI, Arial, sans-serif;
        }
        .minimal-contacts-header {
          padding: 20px 27px;
          font-weight: 700;
          font-size: 1.18rem;
          color: #197278;
          border-bottom: 1px solid #e5e7eb;
          letter-spacing: -0.3px;
          background: #fafcff;
        }
        .minimal-contacts-list {
          flex: 1;
          overflow-y: auto;
        }
        .minimal-contacts-list::-webkit-scrollbar {
          width: 7px;
          background: #fff;
        }
        .minimal-contacts-list::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 8px;
        }
        .minimal-contacts-row {
          display: flex;
          align-items: center;
          padding: 14px 26px;
          cursor: pointer;
          border-radius: 7px;
          transition: background 0.13s;
        }
        .minimal-contacts-row:hover {
          background: #e7f9fa;
        }
        .minimal-contacts-row.selected {
          background: #b8e7e9;
        }
        .minimal-contacts-avatar {
          width: 40px;
          height: 40px;
          margin-right: 17px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #197278;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          border: 2px solid #e0e0e0;
          flex-shrink: 0;
          user-select: none;
        }
        .minimal-contacts-username {
          color: #23272f;
          font-weight: 500;
          font-size: 1.02rem;
          letter-spacing: 0.02em;
        }
        .minimal-contacts-empty {
          color: #98a5b3;
          padding: 22px 26px;
        }
      `}</style>
      <div className="minimal-contacts-header">Contacts</div>
      <div className="minimal-contacts-list">
        {/* Show yourself (current user) at top */}
        {currentUser && (
          <div
            key={currentUser.id || "me"}
            className={`minimal-contacts-row${!currentChat ? " selected" : ""}`}
            style={{ opacity: 0.88 }}
            // Don't select yourself, or do: onClick={() => onSelect(currentUser)}
          >
            <div className="minimal-contacts-avatar">
              {getInitial(currentUser.username)}
            </div>
            <div className="minimal-contacts-username">
              {currentUser.username} <span style={{
                fontWeight: 400,
                color: "#b0b9c5",
                fontSize: "0.87em",
                marginLeft: 9
              }}>(You)</span>
            </div>
          </div>
        )}

        {/* Other contacts */}
        {contacts.length === 0 && (
          <div className="minimal-contacts-empty">No contacts found.</div>
        )}
        {contacts.map((contact) => {
          const selected = currentChat?.id === contact.id;
          return (
            <div
              key={contact.id}
              onClick={() => onSelect(contact)}
              className={
                "minimal-contacts-row" + (selected ? " selected" : "")
              }
            >
              <div className="minimal-contacts-avatar">
                {getInitial(contact.username)}
              </div>
              <div className="minimal-contacts-username">{contact.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;
