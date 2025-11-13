import React, { useState } from "react";

export default function CreateDID({ onCreated }) {
  const [did, setDid] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createDID() {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/create_did", { method: "POST" });
      const data = await res.json();
      setDid(data.did);
      if (onCreated) onCreated(data.did);
    } catch (err) {
      alert("Failed to create DID: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card small">
      <h3>Your DID</h3>
      {did ? <div className="did-box">{did}</div> : <div className="muted">No DID yet</div>}
      <div style={{ marginTop: 10 }}>
        <button className="btn" onClick={createDID} disabled={loading}>
          {loading ? "Creating..." : did ? "Regenerate DID" : "Create DID"}
        </button>
      </div>
    </div>
  );
}
