import json
import os
import uuid

class Wallet:
    def __init__(self):
        self.storage_path = "storage/credentials.json"
        if not os.path.exists("storage"):
            os.makedirs("storage")
        if not os.path.exists(self.storage_path):
            with open(self.storage_path, "w") as f:
                json.dump({"did": None, "credentials": []}, f)

    def load_data(self):
        with open(self.storage_path, "r") as f:
            return json.load(f)

    def save_data(self, data):
        with open(self.storage_path, "w") as f:
            json.dump(data, f, indent=4)

    # ---------- DID CREATION ----------
    def create_did(self):
        data = self.load_data()
        new_did = f"did:example:{uuid.uuid4().hex}"
        data["did"] = new_did
        self.save_data(data)
        return {"did": new_did}

    # ---------- CREDENTIAL MANAGEMENT ----------
    def add_credential(self, credential):
        data = self.load_data()
        credential["id"] = uuid.uuid4().hex
        data["credentials"].append(credential)
        self.save_data(data)

    def get_credentials(self):
        return self.load_data()["credentials"]

    def get_credential(self, cid):
        creds = self.load_data()["credentials"]
        for c in creds:
            if c["id"] == cid:
                return c
        return None

    # ---------- SHARING ----------
    def generate_share_token(self, cid):
        # Create a token the verifier can use
        token = f"token-{uuid.uuid4().hex}"
        data = self.load_data()
        if "shared" not in data:
            data["shared"] = {}
        data["shared"][token] = self.get_credential(cid)
        self.save_data(data)
        return token

    def resolve_share_token(self, token):
        data = self.load_data()
        shared = data.get("shared", {})
        return shared.get(token)
