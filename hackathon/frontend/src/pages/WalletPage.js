import React, { useState } from "react";
import CreateDID from "../ui/CreateDID";
import AddCredentialForm from "../ui/AddCredentialForm";
import CredentialList from "../ui/CredentialList";
import { connectToBlockchain } from "../utils/blockchain";

export default function WalletPage() {
  const [did, setDid] = useState(null);

  async function handleConnectChain() {
    const res = await connectToBlockchain();
    alert(res.message);
  }

  return (
    <div className="wallet-page">
      <div className="controls-row">
        <CreateDID onCreated={(d) => setDid(d)} />
        <button className="btn outline" onClick={handleConnectChain}>
          Connect to Blockchain (placeholder)
        </button>
      </div>

      <div className="two-col">
        <div style={{ flex: 1 }}>
          <AddCredentialForm did={did} />
        </div>
        <div style={{ width: 420 }}>
          <CredentialList />
        </div>
      </div>
    </div>
  );
}
