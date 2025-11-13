import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export default function ViewCredentialModal({ cid, onClose }) {
  const [cred, setCred] = useState(null);
  const [pass, setPass] = useState("");
  const [decrypted, setDecrypted] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/credential/${cid}`)
      .then((r) => r.json())
      .then((d) => setCred(d))
      .catch((e) => setError(e.message));
  }, [cid]);

  function tryDecrypt() {
    setError(null);
    setDecrypted(null);
    if (!cred || !cred.encrypted) return setError("No encrypted data found");
    try {
      const bytes = CryptoJS.AES.decrypt(cred.encrypted, pass);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      if (!plaintext) throw new Error("Wrong passphrase or empty result");
      setDecrypted(JSON.parse(plaintext));
    } catch (err) {
      setError("Decryption failed: " + err.message);
    }
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <button className="close" onClick={onClose}>✕</button>
        <h3>Credential: {cid}</h3>
        {error && <div className="alert error">{error}</div>}

        {cred ? (
          <>
            <div className="muted">Raw stored object:</div>
            <pre style={{ maxHeight: 150, overflow: "auto" }}>{JSON.stringify(cred, null, 2)}</pre>

            <label>Decryption passphrase</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="enter passphrase" />
            <div style={{ marginTop: 8 }}>
              <button className="btn" onClick={tryDecrypt}>Decrypt</button>
            </div>

            {decrypted && (
              <div className="card small" style={{ marginTop: 12 }}>
                <h4>Decrypted Credential</h4>
                <pre>{JSON.stringify(decrypted, null, 2)}</pre>
              </div>
            )}
          </>
        ) : (
          <div>Loading credential...</div>
        )}
      </div>
    </div>
  );
}
s