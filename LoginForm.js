import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For signup
  const [isSignup, setIsSignup] = useState(false); // Toggle between login/signup
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // Hook to navigate to the gallery

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    if (isSignup) {
      // Sign up logic: Save user data in localStorage
      if (!username || !password || !email) {
        setError("All fields are required.");
        return;
      }

      const user = {
        username,
        email,
        password,
      };

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess(true);
      navigate("/gallery"); // Redirect to gallery after successful signup

    } else {
      // Login logic: Validate user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      setSuccess(true);
      navigate("/gallery"); // Redirect to gallery after successful login
    }
  };

  return (
    <div className="login-form">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success ? (
        <p style={{ color: "green" }}>
          {isSignup ? "Sign-up" : "Login"} successful! Welcome, {username}.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {isSignup && (
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
      )}
      <div>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
