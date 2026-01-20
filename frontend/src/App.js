import React from 'react';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Clinical Documentation Assistant</h1>
        <p>AI-powered medical report generation from clinical notes</p>
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;