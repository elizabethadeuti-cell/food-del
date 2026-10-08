import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const { login, signup, googleLogin } = useAuth();

  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = isSignup
      ? await signup(form.name, form.email, form.password)
      : await login(form.email, form.password);

    if (!result.success) {
      setError(result.error);
    }

    setIsSubmitting(false);
  };

  // The Google function lives HERE, above the return
  const handleGoogle = async () => {
    setError("");
    const result = await googleLogin();
    if (!result.success) {
      setError(result.error);
    }
  };
  
 return (
    <div className="login-page">
      {/* Background blobs */}
      <div className="login-blob blob-1"></div>
      <div className="login-blob blob-2"></div>
      <div className="login-blob blob-3"></div>
      <div className="login-blob blob-4"></div>
      <div className="login-blob blob-5"></div>

      {/* Card */}
      <div className="login-card">
        <div className="login-tabs">
          <button
            type="button"
            className={`login-tab ${isSignup ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
          <button
            type="button"
            className={`login-tab ${!isSignup ? "active" : ""}`}
            onClick={() => setMode("signin")}
          >
            Sign in
          </button>
        </div>

        <h1 className="login-title">
          {isSignup ? "Create account" : "Welcome back"}
        </h1>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label className="login-field">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </label>
          )}

          <label className="login-field">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="login-field">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {!isSignup && (
            <div className="login-row">
              <label className="login-remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button className="login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : isSignup ? "Sign up" : "Sign in"}
          </button>
        </form>

        <div className="login-divider">OR CONTINUE WITH</div>

        <div className="login-social">
          <button type="button" className="login-social-btn" onClick={handleGoogle}>
            <svg viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
              <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
              <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
            </svg>
            Google
          </button>

          <button type="button" className="login-social-btn" onClick={handleGoogle}>
            <svg viewBox="0 0 24 24" fill="#fff">
              <path d="M16.4 12.6c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.5 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.4-.9-2.4-3.6zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.6 2.8-1.4z" />
            </svg>
            Apple
          </button>
        </div>

        <p className="login-footer">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMode(isSignup ? "signin" : "signup");
            }}
          >
            {isSignup ? "Sign in" : "Sign up"}
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login;
