import React, { useState } from "react";

function CreateDID() {
  const [did, setDid] = useState(null);

  async function generateDID() {
    const res = await fetch("http://localhost:5000/create_did", {
      method: "POST",
    });
    const data = await res.json();
    setDid(data.did);
  }

  return (
    <div>
      <h2>Create DID</h2>
      <button onClick={generateDID}>Generate New DID</button>
      {did && (
        <p>
          <strong>Your DID:</strong> {did}
        </p>
      )}
    </div>
  );
}

export default CreateDID;
