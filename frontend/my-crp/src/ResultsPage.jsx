import React from 'react';
import { useLocation } from 'react-router-dom';
import Results from './Results';
import './ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();

  if (!location.state) {
    return (
      <div className="results-page">
        <h1>Results Page</h1>
        <div className="maintenance-message">
          <h2>Under Maintenance</h2>
          <p>No data available. Please submit the form first.</p>
        </div>
      </div>
    );
  }

  const { prediction, probability, featureImportance } = location.state;

  return (
    <div className="results-page">
      <h1>Results Page</h1>
      <Results
        prediction={prediction}
        probability={probability}
        featureImportance={featureImportance}
      />
    </div>
  );
};

export default ResultsPage;