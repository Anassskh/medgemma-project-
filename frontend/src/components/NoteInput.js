import React from 'react';
import './NoteInput.css';

function NoteInput({ value, onChange, disabled }) {
  const placeholderText = `Enter clinical notes here...

Example:
Patient presents with 3-day history of productive cough, fever (38.5°C), and shortness of breath.
Vitals: BP 120/80, HR 95, RR 22, SpO2 94% on room air.
Chest auscultation reveals bilateral crackles.
No known drug allergies.`;

  return (
    <div className="note-input-container">
      <div className="section-header">
        <h2>Clinical Notes Input</h2>
        <span className="char-count">{value.length} characters</span>
      </div>
      <div className="input-wrapper">
        <textarea
          className="note-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholderText}
          disabled={disabled}
          rows="12"
        />
        <div className="textarea-overlay">
          <div className="hint-text">
            Enter your clinical examination findings, patient history, symptoms, and observations.
          </div>
        </div>
      </div>
      {value.length === 0 && (
        <div className="input-hint">
          <strong>Tip:</strong> Be specific with symptoms, vitals, and examination findings for better report generation.
        </div>
      )}
    </div>
  );
}

export default NoteInput;