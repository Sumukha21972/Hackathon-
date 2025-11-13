import React, { useState } from "react";
import CryptoJS from "crypto-js";

const DEFAULT_PASSPHRASE = "local-dev-passphrase";

export default function AddCredentialForm({ did }) {
  const [type, setType] = useState("StudentID");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [issued, setIssued] = useState("");
  const [passphrase, setPassphrase] = useState(DEFAULT_PASSPHRASE);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        type,
        name,
        institute,
        issued,
        did: did || null,
        createdAt: new Date().toISOString(),
      };

      const plaintext = JSON.stringify(payload);
      const ciphertext = CryptoJS.AES.encrypt(plaintext, passphrase).toString();

      const res = await fetch("http://127.0.0.1:5000/add_credential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encrypted: ciphertext }),
      });

      if (!res.ok) throw new Error("Failed to add credential");

      alert("Credential encrypted & added to wallet");
      setName("");
      setInstitute("");
      setIssued("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h3>Add Credential</h3>
      <form onSubmit={submit}>
        <label>Type</label>
        <input value={type} onChange={(e) => setType(e.target.value)} />

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Institute</label>
        <input value={institute} onChange={(e) => setInstitute(e.target.value)} required />

        <label>Issued</label>
        <input type="date" value={issued} onChange={(e) => setIssued(e.target.value)} />

        <label>Encryption passphrase (local)</label>
        <input value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />

        <div style={{ marginTop: 10 }}>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Credential (encrypt & store)"}
          </button>
        </div>
      </form>
    </div>
  );
}
