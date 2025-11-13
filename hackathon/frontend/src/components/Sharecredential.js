import React, { useState } from "react";

function ShareCredential({ cid }) {
  const [token, setToken] = useState(null);

  async function generateToken() {
    const res = await fetch(`http://localhost:5000/share_credential/${cid}`);
    const data = await res.json();
    setToken(data.share_token);
  }

  return (
    <div>
      <h2>Share Credential</h2>
      <button onClick={generateToken}>Generate Share Link</button>

      {token && (
        <p>
          Share this link:  
          <br />
          <strong>http://localhost:5000/shared/{token}</strong>
        </p>
      )}
    </div>
  );
}

export default ShareCredential;
