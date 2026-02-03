from flask import Flask, jsonify, request
from flask_cors import CORS
from DatabaseWrapper import DatabaseWrapper

app = Flask(__name__)
CORS(app)

db = DatabaseWrapper()

@app.route('/deliveries', methods=['GET'])
def get_deliveries():
    try:
        results = db.get_all_deliveries()
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/deliveries', methods=['POST'])
def create_delivery():
    data = request.json
    if not data or 'tracking_code' not in data or 'recipient_name' not in data:
        return jsonify({"error": "Dati mancanti"}), 400

    try:
        tracking = data['tracking_code']
        recipient = data['recipient_name']
        address = data.get('address', '')
        time_slot = data.get('time_slot', '')
        priority = data.get('priority', 'LOW')

        db.create_delivery(tracking, recipient, address, time_slot, priority)
        return jsonify({"message": "Consegna creata"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- NUOVA ROTTA PER COMMIT 6 ---
@app.route('/deliveries/<int:id>/status', methods=['PUT'])
def update_delivery_status(id):
    data = request.json
    new_status = data.get('status')
    
    valid_statuses = ['READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED']
    if new_status not in valid_statuses:
        return jsonify({"error": "Stato non valido"}), 400

    try:
        db.update_status(id, new_status)
        return jsonify({"message": "Stato aggiornato"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)