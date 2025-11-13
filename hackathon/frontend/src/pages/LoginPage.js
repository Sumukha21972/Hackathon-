import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      alert("Enter username and password!");
      return;
    }
    localStorage.setItem("user", username);
    navigate("/wallet");
  }

  return (
    <div className="card" style={{ maxWidth: 350, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" style={{ marginTop: 12 }} type="submit">Login</button>
      </form>
    </div>
  );
}
