import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAvatarRoute } from "../api";

// Helper function to get initials (e.g., "John Doe" => "JD")
function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export default function SetProfile() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("chat-app-user");
  const user = userStr ? JSON.parse(userStr) : null;

  // 1. Use ui-avatars.com
  const defaultAvatar = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=0D8ABC&color=fff`
    : "";

  // 2. Handle avatar setting to backend
  const handleSetAvatar = async () => {
    if (!user || !user._id) {
      alert("User-Crated");
      navigate("/login");
      return;
    }
    try {
      const { data } = await axios.post(
        `${setAvatarRoute}/${user._id}`,
        { image: defaultAvatar }
      );
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image || defaultAvatar;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      alert(error?.response?.data?.msg || "Error setting profile image.");
    }
  };

  return (
    <div className="minimal-profile-bg" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    }}>
      <style>{`
        .minimal-profile-bg {
          background: #f7f8fa;
        }
        .minimal-profile-card {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 14px;
          min-width: 340px;
          box-shadow: 0 2px 20px rgba(36,40,55,0.085);
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .minimal-profile-title {
          font-weight: 700;
          font-size: 1.28rem;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
          color: #222c33;
        }
        .minimal-profile-avatar {
          border-radius: 50%;
          border: 3px solid #62b6aa;
          width: 92px;
          height: 92px;
          object-fit: cover;
          display: block;
          margin-bottom: 14px;
        }
        .minimal-profile-username {
          font-size: 1.11rem;
          color: #264356;
          font-weight: 500;
          letter-spacing: 0.015rem;
          margin-bottom: 30px;
        }
        .minimal-profile-btn {
          width: 100%;
          background: #197278;
          color: #fff;
          font-weight: 600;
          padding: 10px 0 11px;
          border-radius: 7px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.17s;
          margin-top: 12px;
        }
        .minimal-profile-btn:hover {
          background: #179090;
        }
      `}</style>
      <div className="minimal-profile-card">
        <div className="minimal-profile-title">Set Profile</div>
        <img
          className="minimal-profile-avatar"
          src={defaultAvatar}
          alt="Avatar"
          width={92}
          height={92}
        />
        <div className="minimal-profile-username">
          {user ? user.username : ""}
        </div>
        <button
          className="minimal-profile-btn"
          onClick={handleSetAvatar}
        >
          Set Profile as Initials
        </button>
      </div>
    </div>
  );
}
