import React, { useState, useEffect } from "react";

export default function ShareCredentialModal({ cid, onClose }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:5000/share_credential/${cid}`);
      const data = await res.json();
      setToken(data.share_token);
    } catch (err) {
      alert("Failed to create share token");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generate();
  }, [cid]);

  return (
    <div className="modal">
      <div className="modal-card">
        <button className="close" onClick={onClose}>✕</button>
        <h3>Share Credential</h3>

        {loading && <div>Generating token...</div>}

        {token && (
          <div>
            <p>Share this link (verifier can use):</p>
            <div className="share-link">
              <code>http://127.0.0.1:5000/shared/{token}</code>
            </div>
            <p>Or copy just the token: <strong>{token}</strong></p>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button className="btn outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
