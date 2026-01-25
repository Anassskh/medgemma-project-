import React, { useState } from 'react';
import NoteInput from '../components/NoteInput';
import ReportOutput from '../components/ReportOutput';
import Loader from '../components/Loader';

function Home() {
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyNotification, setCopyNotification] = useState('');

  const API_ENDPOINT = '/generate_report';

  const handleGenerateReport = async () => {
    if (!clinicalNotes.trim()) {
      setError('Please enter clinical notes before generating a report.');
      return;
    }

    setLoading(true);
    setError('');
    setReport('');
    setCopyNotification('');

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clinical_notes: clinicalNotes
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.report) {
        setReport(data.report);
      } else {
        throw new Error('No report generated from the server.');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setError(err.message || 'Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    setCopyNotification('Report copied to clipboard!');
    setTimeout(() => setCopyNotification(''), 3000);
  };

  const handleClear = () => {
    setClinicalNotes('');
    setReport('');
    setError('');
    setCopyNotification('');
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <NoteInput 
          value={clinicalNotes}
          onChange={setClinicalNotes}
          disabled={loading}
        />
        
        <ReportOutput 
          report={report}
          error={error}
          onCopy={handleCopy}
        />
      </div>

      <div className="controls-section">
        <button 
          className="btn generate-btn"
          onClick={handleGenerateReport}
          disabled={loading || !clinicalNotes.trim()}
        >
          {loading ? (
            <>
              <span className="spinner-mini"></span>
              Generating...
            </>
          ) : (
            <>
              📄 Generate Medical Report
            </>
          )}
        </button>
        
        <button 
          className="btn clear-btn"
          onClick={handleClear}
          disabled={loading || (!clinicalNotes && !report && !error)}
        >
          🗑️ Clear All
        </button>
      </div>

      {copyNotification && (
        <div className="notification">
          {copyNotification}
        </div>
      )}

      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      <div className="instructions">
        <h3>How to use:</h3>
        <ol>
          <li>Enter clinical notes in the left panel (symptoms, examination findings, patient history)</li>
          <li>Click "Generate Medical Report" to create an AI-powered structured report</li>
          <li>Review and copy the generated report from the right panel</li>
          <li>Edit the notes and regenerate as needed</li>
        </ol>
        <div className="api-info">
          <strong>API Endpoint:</strong> POST {API_ENDPOINT}
          <br />
          <strong>Backend:</strong> Ensure backend server is running on port 8000
        </div>
      </div>
    </div>
  );
}

export default Home;