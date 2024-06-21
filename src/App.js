// src/App.js
import React from 'react';
import './App.css';
import SurveyForm from './SurveyForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Advanced Survey Form</h1>
      </header>
      <div className="form-container">
        <SurveyForm />
      </div>
    </div>
  );
}

export default App;
