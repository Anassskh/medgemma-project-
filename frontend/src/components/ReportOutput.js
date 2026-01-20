import React from 'react';
import './ReportOutput.css';

function ReportOutput({ report, error, onCopy }) {
  const handleCopy = () => {
    if (report) {
      navigator.clipboard.writeText(report);
      if (onCopy) onCopy();
    }
  };

  if (error) {
    return (
      <div className="report-output-container error-state">
        <div className="section-header">
          <h2>Generated Report</h2>
        </div>
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <h3>Error Generating Report</h3>
          <p>{error}</p>
          <p className="error-hint">
            Please check your connection and try again. If the problem persists, 
            ensure the backend server is running.
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-output-container empty-state">
        <div className="section-header">
          <h2>Generated Report</h2>
        </div>
        <div className="placeholder-content">
          <div className="placeholder-icon">📋</div>
          <h3>Report will appear here</h3>
          <p>
            Enter clinical notes and click "Generate Report" to create 
            a structured medical report using AI.
          </p>
          <div className="placeholder-example">
            <h4>Example output includes:</h4>
            <ul>
              <li>Structured assessment</li>
              <li>Diagnostic impressions</li>
              <li>Treatment recommendations</li>
              <li>Follow-up instructions</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-output-container">
      <div className="section-header">
        <h2>Generated Report</h2>
        <button 
          className="copy-btn" 
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          📋 Copy
        </button>
      </div>
      <div className="report-content">
        <div className="report-header">
          <div className="report-meta">
            <span className="meta-item">🔬 AI-Generated Medical Report</span>
            <span className="meta-item">📅 {new Date().toLocaleDateString()}</span>
          </div>
        </div>
        <div className="report-text">
          {report.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="report-footer">
          <div className="disclaimer">
            <strong>Disclaimer:</strong> This AI-generated report is for 
            informational purposes only. Always verify critical medical 
            information with standard clinical procedures.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportOutput;