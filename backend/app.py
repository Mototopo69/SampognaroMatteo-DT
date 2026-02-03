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
    
    # Validazione
    if not data or 'tracking_code' not in data or 'recipient_name' not in data:
        return jsonify({"error": "Dati mancanti"}), 400

    try:
        # Estrazione dati con default sicuri
        tracking = data['tracking_code']
        recipient = data['recipient_name']
        address = data.get('address', '')
        time_slot = data.get('time_slot', '')
        priority = data.get('priority', 'LOW')

        # Chiamata al wrapper
        db.create_delivery(tracking, recipient, address, time_slot, priority)
        
        return jsonify({"message": "Consegna creata"}), 201
    except Exception as e:
        # Gestione errori (es. tracking code duplicato)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)