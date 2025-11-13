import React, { useState } from "react";

export default function VerifierPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleVerify() {
    setError(null);
    setResult(null);
    if (!token) return setError("Enter a token first");
    try {
      const res = await fetch(`http://127.0.0.1:5000/shared/${token}`);
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error || "Verification failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="verifier card">
      <h2>Verifier Portal</h2>
      <p>Paste a share token (or the token suffix from the shared link) to view credential.</p>

      <div className="form-row">
        <input
          placeholder="token-xxxxxxxx..."
          value={token}
          onChange={(e) => setToken(e.target.value.trim())}
        />
        <button className="btn" onClick={handleVerify}>Verify</button>
      </div>

      {error && <div className="alert error">{error}</div>}

      {result && (
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Verified Credential</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
