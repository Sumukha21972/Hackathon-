from flask import Flask, request, jsonify
from wallet import Wallet

app = Flask(__name__)
wallet = Wallet()

@app.route("/create_did", methods=["POST"])
def create_did():
    return jsonify(wallet.create_did())

@app.route("/credentials", methods=["GET"])
def get_credentials():
    return jsonify(wallet.get_credentials())

@app.route("/add_credential", methods=["POST"])
def add_credential():
    credential = request.json
    wallet.add_credential(credential)
    return jsonify({"message": "Credential added successfully"})

@app.route("/credential/<cid>", methods=["GET"])
def get_credential(cid):
    data = wallet.get_credential(cid)
    if not data:
        return jsonify({"error": "Not Found"}), 404
    return jsonify(data)

@app.route("/share_credential/<cid>", methods=["GET"])
def share_credential(cid):
    token = wallet.generate_share_token(cid)
    return jsonify({"share_token": token})

@app.route("/shared/<token>", methods=["GET"])
def view_shared(token):
    data = wallet.resolve_share_token(token)
    if not data:
        return jsonify({"error": "Invalid token"}), 404
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
