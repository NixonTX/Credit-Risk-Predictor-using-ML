import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ResultsPage from './ResultsPage';
import { RingLoader } from 'react-spinners';


function App() {
  const [formData, setFormData] = useState({
    no_of_dependents: '',
    education: 'Graduate',
    self_employed: 'No',
    income_annum: '',
    loan_amount: '',
    loan_term: 12,
    cibil_score: '',
    residential_assets_value: '',
    commercial_assets_value: '',
    luxury_assets_value: '',
    bank_asset_value: '',
  });
  const [prediction, setPrediction] = useState('');
  const [probability, setProbabilityScore] = useState(null);
  const [featureImportance, setFeatureImportance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'education' || name === 'self_employed' ? value : parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log('Sending form data to backend:', formData);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // console.log('Response status:', response.status);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      // console.log('Backend response:', result);

      setPrediction(result.prediction);
      setProbabilityScore(result.probability);
      setFeatureImportance(result.feature_importance);


      setTimeout(() => {
        setLoading(false); // Stop loading
        navigate('/results', {
          state: {
            prediction: result.prediction,
            probability: result.probability,
            featureImportance: result.feature_importance,
          },
        });
      }, 3000);
    } catch (error) {
      // console.error('Error:', error);
      setPrediction('An error occurred. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Credit Risk Predictor</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Number Of Dependents:</label>
            <input
              type="number"
              name="no_of_dependents"
              value={formData.no_of_dependents}
              onChange={handleChange}
              placeholder="Enter how many people are dependent on you"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Education:</label>
            <div className="education-options">
              <div
                className={`education-option ${formData.education === 'Graduate' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, education: 'Graduate' })}
              >
                Graduate
              </div>
              <div
                className={`education-option ${formData.education === 'Not Graduate' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, education: 'Not Graduate' })}
              >
                Not Graduate
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Self Employed:</label>
            <div className="self-employed-options">
              <div
                className={`self-employed-option ${formData.self_employed === 'Yes' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, self_employed: 'Yes' })}
              >
                Yes
              </div>
              <div
                className={`self-employed-option ${formData.self_employed === 'No' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, self_employed: 'No' })}
              >
                No
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>CIBIL Score:</label>
            <input
              type="number"
              name="cibil_score"
              value={formData.cibil_score}
              onChange={handleChange}
              placeholder="Enter your CIBIL score (300-900)"
              min="300"
              max="900"
              required
            />
          </div>

          <div className="form-group">
            <label>Loan Term:</label>
            <div className="loan-term-options">
              <div className="loan-term-column">
                <div className="loan-term-header">Months</div>
                <input
                  type="number"
                  name="loan_term_months"
                  value={formData.loan_term}
                  onChange={(e) => {
                    const months = parseFloat(e.target.value);
                    setFormData({
                      ...formData,
                      loan_term: months,
                    });
                  }}
                  placeholder="Enter loan term in months"
                  min="0"
                  required
                />
              </div>
              <div className="loan-term-column">
                <div className="loan-term-header">Years</div>
                <input
                  type="number"
                  name="loan_term_years"
                  value={(formData.loan_term / 12).toFixed(2)}
                  onChange={(e) => {
                    const years = parseFloat(e.target.value);
                    setFormData({
                      ...formData,
                      loan_term: years * 12,
                    });
                  }}
                  placeholder="Enter loan term in years"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {[
            { key: 'income_annum', label: 'Annual Income', placeholder: 'Enter your annual income' },
            { key: 'loan_amount', label: 'Loan Amount', placeholder: 'Enter the loan amount' },
            { key: 'residential_assets_value', label: 'Residential Assets Value', placeholder: 'Enter value of residential assets' },
            { key: 'commercial_assets_value', label: 'Commercial Assets Value', placeholder: 'Enter value of commercial assets' },
            { key: 'luxury_assets_value', label: 'Luxury Assets Value', placeholder: 'Enter value of luxury assets' },
            { key: 'bank_asset_value', label: 'Bank Asset Value', placeholder: 'Enter value of bank assets' },
          ].map((field) => (
            <div className="form-group" key={field.key}>
              <label>{field.label}:</label>
              <input
                type="number"
                name={field.key}
                value={formData[field.key]}
                onChange={handleChange}
                placeholder={field.placeholder}
                min="0"
                required
              />
            </div>
          ))}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Evaluating...' : 'Predict'}
          </button>
        </form>

        {loading && (
          <div className="loading-overlay">
            <RingLoader color="#2843f5" size={60} />
            <p>Model evaluating data...</p>
          </div>
        )}

      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;