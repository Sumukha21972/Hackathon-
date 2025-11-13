import React, { useEffect, useState } from "react";

function CredentialList() {
  const [credentials, setCredentials] = useState([]);

  async function fetchCreds() {
    const res = await fetch("http://localhost:5000/credentials");
    const data = await res.json();
    setCredentials(data);
  }

  useEffect(() => {
    fetchCreds();
  }, []);

  return (
    <div>
      <h2>My Credentials</h2>
      {credentials.length === 0 ? (
        <p>No credentials available.</p>
      ) : (
        credentials.map((cred) => (
          <div key={cred.id} style={{ marginBottom: "10px" }}>
            <strong>{cred.type}</strong>
            <p>ID: {cred.id}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default CredentialList;
