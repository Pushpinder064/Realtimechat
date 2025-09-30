import React, { useState } from "react";
import axios from "axios";
import { registerRoute } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [vals, setVals] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e =>
    setVals(v => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (vals.password !== vals.confirmPassword)
      return setError("Passwords do not match.");
    if (vals.username.length < 3)
      return setError("Username too short.");
    if (!vals.email)
      return setError("Email required.");
    if (vals.password.length < 8)
      return setError("Password must be at least 8 chars.");
    try {
      const { data } = await axios.post(registerRoute, vals);
      if (!data.status) {
        setError(data.msg || "Registration failed.");
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setProfile");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Registration error.");
    }
  };

  return (
    <div className="minimal-login-bg" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    }}>
      <style>
        {`
          .minimal-login-bg {
            background: #f7f8fa;
          }
          .minimal-login-form {
            background: #fff;
            padding: 2.5rem 2rem;
            border-radius: 14px;
            min-width: 340px;
            box-shadow: 0 2px 20px rgba(36,40,55,0.085);
            border: 1px solid #e5e7eb;
          }
          .minimal-login-title {
            font-weight: 700;
            font-size: 1.28rem;
            margin-bottom: 18px;
            letter-spacing: -0.5px;
            color: #222c33;
          }
          .minimal-login-input {
            width: 100%;
            padding: 10px 13px;
            border-radius: 7px;
            border: 1px solid #dde2e9;
            background: #f7f8fa;
            color: #23272f;
            font-size: 1rem;
            margin-bottom: 16px;
            transition: border 0.17s;
          }
          .minimal-login-input:focus {
            outline: none;
            border: 1.8px solid #62b6aa;
            background: #fff;
          }
          .minimal-login-btn {
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
          }
          .minimal-login-btn:hover {
            background: #179090;
          }
          .minimal-login-link {
            color: #197278;
            text-decoration: none;
            font-weight: 500;
          }
          .minimal-login-link:hover {
            text-decoration: underline;
          }
          .minimal-login-error {
            color: #d7263d;
            font-size: 0.98rem;
            margin-bottom: 8px;
          }
        `}
      </style>
      <form onSubmit={handleSubmit} className="minimal-login-form">
        <div className="minimal-login-title">Register</div>
        {error && <div className="minimal-login-error">{error}</div>}
        <input
          name="username"
          type="text"
          className="minimal-login-input"
          placeholder="Username"
          value={vals.username}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          className="minimal-login-input"
          placeholder="Email"
          value={vals.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="minimal-login-input"
          placeholder="Password"
          value={vals.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          className="minimal-login-input"
          placeholder="Confirm Password"
          value={vals.confirmPassword}
          onChange={handleChange}
        />
        <button className="minimal-login-btn">Register</button>
        <div style={{ fontSize: '0.95rem', marginTop: 16, color: "#566064" }}>
          Already have an account?{" "}
          <Link to="/login" className="minimal-login-link">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
