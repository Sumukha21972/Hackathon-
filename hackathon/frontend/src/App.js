import React from "react";
import CreateDID from "./components/CreateDID";
import CredentialList from "./components/CredentialList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Wallet</h1>
      <CreateDID />
      <CredentialList />
    </div>
  );
}

export default App;
