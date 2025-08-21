from flask import Flask, request, jsonify
from model import predict

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict_route():
    try:
        data = request.json.get("input", [])
        result = predict(data)
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
