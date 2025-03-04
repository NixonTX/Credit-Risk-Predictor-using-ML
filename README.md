# Credit-Risk-Predictor-using-ML
A web app built with React and Flask to predict loan approval using machine learning. Evaluates user inputs (income, loan amount, CIBIL score) and provides predictions, probability scores, and feature importance.


## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Frontend Integration](#frontend-integration)
8. [Contributing](#contributing)

---

## Project Overview
This project is a **Machine Learning-based Loan Approval Prediction System**. It predicts whether a loan application should be approved or rejected based on various features such as income, loan amount, CIBIL score, and asset values. The system consists of:
- A **Flask backend** that serves the machine learning model and provides a REST API.
- A **React frontend** that allows users to input data and view the prediction results.

---

## Features
- **Loan Approval Prediction**: Predicts whether a loan application will be approved or rejected.
- **Probability Score**: Provides the probability of loan approval.
- **Feature Importance**: Displays the importance of each feature in the prediction.
- **User-Friendly Interface**: A React-based frontend for easy interaction.
- **REST API**: A Flask-based backend that serves predictions via API.

---

## Technologies Used
### Backend
- **Python**: Primary programming language.
- **Flask**: Web framework for building the REST API.
- **XGBoost**: Machine learning model for loan approval prediction.
- **Pandas**: Data manipulation and preprocessing.
- **Joblib**: For saving and loading the trained model.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **Recharts**: For visualizing feature importance and probability.
- 
---

## Installation
### Prerequisites
- Python 3.8+
- Node.js 16+
- Flask
- React

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/NixonTX/Credit-Risk-Predictor-using-ML.git
   cd Credit-Risk-Predictor-using-ML/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask app:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

---

## Usage
1. **Backend**:
   - The Flask backend runs on `http://127.0.0.1:5000`.
   - Use the `/predict` endpoint to get loan approval predictions.

2. **Frontend**:
   - The React frontend runs on `http://localhost:3000`.
   - Fill in the form with the required details and click **Predict** to see the results.

---

## API Endpoints
### `POST /predict`
- **Description**: Predicts loan approval based on input data.
- **Request Body**:
  ```json
  {
      "no_of_dependents": 2,
      "education": 1,
      "self_employed": 0,
      "income_annum": 9600000,
      "loan_amount": 29900000,
      "loan_term": 12,
      "cibil_score": 778,
      "residential_assets_value": 2400000,
      "commercial_assets_value": 17600000,
      "luxury_assets_value": 22700000,
      "bank_asset_value": 8000000
  }
  ```
- **Response**:
  ```json
  {
      "prediction": "Approved",
      "probability": 0.99909866,
      "feature_importance": {
          "no_of_dependents": 0.012247798,
          "education": 0.013926751,
          "self_employed": 0.011063362,
          "income_annum": 0.023593476,
          "loan_amount": 0.025837155,
          "loan_term": 0.15287666,
          "cibil_score": 0.703851,
          "residential_assets_value": 0.016562847,
          "commercial_assets_value": 0.013460946,
          "luxury_assets_value": 0.008908062,
          "bank_asset_value": 0.017671902
      }
  }
  ```

## Frontend Integration
The React frontend interacts with the Flask backend to:
1. Collect user inputs via a form.
2. Send the data to the `/predict` endpoint.
3. Display the prediction, probability, and feature importance.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---
