import React, { useState } from "react";
import axios from "axios";
import { loginRoute } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setValues((vals) => ({ ...vals, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(loginRoute, values);

      if (!data.status) {
        setError(data.msg || "Login failed.");
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        localStorage.setItem("chat-app-token", data.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login error.");
    }
  };

  return (
    <div className="minimal-login-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}>
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
            color: #2a323c;
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
        <div className="minimal-login-title">Login</div>
        {error && <div className="minimal-login-error">{error}</div>}
        <input
          name="username"
          type="text"
          className="minimal-login-input"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          autoFocus
          required
        />
        <input
          name="password"
          type="password"
          className="minimal-login-input"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <button className="minimal-login-btn">Login</button>
        <div style={{ fontSize: '0.95rem', marginTop: 16, color: "#566064" }}>
          No account?{" "}
          <Link to="/register" className="minimal-login-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
