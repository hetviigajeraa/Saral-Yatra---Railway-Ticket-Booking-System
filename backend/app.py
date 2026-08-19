"""
SaralYatra Python Flask Backend API
Provides endpoints for train search, AI recommendations, stations, and health checks.
"""

from flask import Flask, request, jsonify
from trains_data import TRAINS, STATIONS
from recommendation_engine import evaluate_train_recommendations

app = Flask(__name__)

# Manual CORS Headers for maximum compatibility
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

# Root & Health Check Endpoint
@app.route('/', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "SaralYatra Python Flask API",
        "version": "1.0.0",
        "endpoints": [
            "/api/health",
            "/api/recommend [POST]",
            "/api/trains [GET]",
            "/api/stations [GET]"
        ]
    }), 200

# AI Train Recommendation Endpoint
@app.route('/api/recommend', methods=['POST', 'OPTIONS'])
def recommend_trains():
    if request.method == 'OPTIONS':
        return '', 204

    data = request.get_json(silent=True) or {}
    from_code = data.get('from_code', 'BCT')
    to_code = data.get('to_code', 'ADI')
    priorities = data.get('priorities', ['lower_price', 'shorter_journey'])
    preferred_time = data.get('preferred_time', None)

    # Filter matching route trains or fallback to all
    candidate_trains = [t for t in TRAINS if t['fromCode'] == from_code and t['toCode'] == to_code]
    if not candidate_trains:
        candidate_trains = TRAINS

    # Process through AI scoring engine
    recommendations = evaluate_train_recommendations(
        trains_list=candidate_trains,
        priorities=priorities,
        preferred_time=preferred_time
    )

    top_recommended = recommendations[0] if recommendations else None

    return jsonify({
        "success": True,
        "count": len(recommendations),
        "from_code": from_code,
        "to_code": to_code,
        "priorities": priorities,
        "top_recommendation": top_recommended,
        "trains": recommendations
    }), 200

# Get All Trains / Route Search Endpoint
@app.route('/api/trains', methods=['GET'])
def get_trains():
    from_code = request.args.get('from')
    to_code = request.args.get('to')

    if from_code and to_code:
        filtered = [t for t in TRAINS if t['fromCode'] == from_code and t['toCode'] == to_code]
        results = filtered if filtered else TRAINS
    else:
        results = TRAINS

    return jsonify({
        "success": True,
        "count": len(results),
        "trains": results
    }), 200

# Get Stations Endpoint
@app.route('/api/stations', methods=['GET'])
def get_stations():
    return jsonify({
        "success": True,
        "count": len(STATIONS),
        "stations": STATIONS
    }), 200

if __name__ == '__main__':
    print("SaralYatra Flask API running on http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
