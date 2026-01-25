import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container" data-testid="loader">
      <div className="loader-spinner"></div>
      <p className="loader-text">Generating medical report...</p>
    </div>
  );
}

export default Loader;