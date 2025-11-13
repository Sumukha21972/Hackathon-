import React, { useEffect, useState } from "react";

function ViewCredential({ cid }) {
  const [cred, setCred] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/credential/${cid}`)
      .then((res) => res.json())
      .then((data) => setCred(data));
  }, [cid]);

  if (!cred) return <p>Loading...</p>;

  return (
    <div>
      <h2>View Credential</h2>
      <pre>{JSON.stringify(cred, null, 2)}</pre>
    </div>
  );
}

export default ViewCredential;
