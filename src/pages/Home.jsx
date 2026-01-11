import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Home() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tab === "signup") {
        const res = await api.post("/auth/signup", {
          email,
          password,
        });

        if (res.data.message) {
          setTab("login");
          setError("Signup successful. Please login.");
        }
      } else {
        const res = await api.post("/auth/login", {
          email,
          password,
        });

        const token = res.data.access_token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;

        if (status === 409) setError("Email already registered.");
        else if (status === 401) setError("Invalid email or password.");
        else if (data?.detail) setError(data.detail);
        else setError("Something went wrong.");
      } else if (err.request) {
        setError("Backend is unreachable. Please try again.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4">Kanban Job Tracker</h3>

        {/* Tabs */}
        <ul className="nav nav-pills nav-fill mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "login" ? "active" : ""}`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "signup" ? "active" : ""}`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </li>
        </ul>

        {/* Messages */}
        {error && (
          <div
            className={`alert ${
              error.includes("successful")
                ? "alert-success"
                : "alert-danger"
            } py-2`}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Guest Login */}
          {tab === "login" && (
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="guestLogin"
                checked={isGuest}
                onChange={(e) => {
                  setIsGuest(e.target.checked);
                  if (e.target.checked) {
                    setEmail("user1@example.com");
                    setPassword("secret123");
                  } else {
                    setEmail("");
                    setPassword("");
                  }
                }}
              />
              <label className="form-check-label" htmlFor="guestLogin">
                Login as Test User
              </label>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : tab === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-3">
          <p className="mb-1">
            <a href="/about" className="text-decoration-none">
              Know about this project
            </a>
          </p>
          <p className="mb-0">
            <a href="/about_me" className="text-decoration-none">
              Know about me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
