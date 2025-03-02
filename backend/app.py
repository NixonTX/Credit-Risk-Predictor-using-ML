from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os
import numpy as np

model_path = os.path.join(os.path.dirname(__file__), '../ml_model/credit_risk_model.pkl')

model = joblib.load(model_path)

expected_columns = [
    'no_of_dependents', 'education', 'self_employed', 'income_annum',
    'loan_amount', 'loan_term', 'cibil_score', 'residential_assets_value',
    'commercial_assets_value', 'luxury_assets_value', 'bank_asset_value'
]

categorical_mappings = {
    'education': {'Graduate': 1, 'Not Graduate': 0},
    'self_employed': {'Yes': 1, 'No': 0}
}

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/predict', methods=['POST'])
def predict():
    # print("Request Headers:", request.headers)

    # print("Content-Type:", request.content_type)

    if request.content_type != 'application/json':
        return jsonify({'error': 'Unsupported Media Type: Content-Type must be application/json'}), 415

    try:
        input_data = request.json
        # print("Incoming request data:", input_data)
    except Exception as e:
        # print("Error parsing JSON data:", e)
        return jsonify({'error': 'Invalid JSON data'}), 400

    input_df = pd.DataFrame([input_data])

    for col, mapping in categorical_mappings.items():
        input_df[col] = input_df[col].map(mapping)

    input_df = input_df.reindex(columns=expected_columns, fill_value=0)

    # print("Processed input data:", input_df)

    try:
        probability = model.predict_proba(input_df)[0][1]

        prediction = model.predict(input_df)
        result = "Approved" if prediction[0] == 1 else "Rejected"

        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
            feature_importance = {feature: float(importance) for feature, importance in zip(expected_columns, importances)}
        else:
            feature_importance = None

        # print("Prediction:", prediction)
        # print("Probability:", probability)
        # print("Feature Importance:", feature_importance)

        return jsonify({
            'prediction': result,
            'probability': float(probability),
            'feature_importance': feature_importance
        })
    except Exception as e:
        # print("Error during prediction:", e)
        return jsonify({'error': 'An error occurred during prediction'}), 500

if __name__ == '__main__':
    app.run(debug=False)