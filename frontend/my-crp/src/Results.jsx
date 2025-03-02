import React from 'react';
import './Results.css'; 

const Results = ({ prediction, probability, featureImportance }) => {
  return (
    <div className="results-container">
      <div className="prediction-result">
        <h2>
          Prediction:{" "}
          <span
            style={{
              color: prediction === "Approved" ? "#4CAF50" : "#F44336",
              fontWeight: "bold",
            }}
          >
            {prediction}
          </span>
        </h2>
      </div>

     <div className="probability-score">
        <h3>Probability Score: {probability ? `${(probability * 100).toFixed(2)}%` : 'N/A'}</h3>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: probability ? `${probability * 100}%` : '0%' }}
          ></div>
        </div>
      </div>

      <div className="feature-importance">
        <h3>Feature Importance</h3>
        <div className="bar-chart">
          {featureImportance &&
            Object.entries(featureImportance).map(([feature, importance]) => (
              <div key={feature} className="bar">
                <div className="bar-label">{feature}</div>
                <div
                  className="bar-value"
                  style={{ width: `${importance * 100}%` }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Results;