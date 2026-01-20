import React, { useState } from 'react';
import NoteInput from '../components/NoteInput';
import ReportOutput from '../components/ReportOutput';
import Loader from '../components/Loader';
import './Home.css';

function Home() {
    const [note, setNote] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        if (!note.trim()) return;

        setLoading(true);
        setError(null);
        setReport(null);

        try {
            // Assuming a backend endpoint is available at /generate_report based on typical patterns.
            // The proxy in package.json will forward this to localhost:8000
            const response = await fetch('/generate_report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note }),
            });

            if (!response.ok) {
                // Try to get error message from body if available
                let errorMessage = 'Failed to generate report';
                try {
                    const errorData = await response.json();
                    if (errorData.detail) errorMessage = errorData.detail;
                    else if (errorData.message) errorMessage = errorData.message;
                } catch (e) {
                    // ignore JSON parse error
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            // Assuming data contains a 'report' field or is the report text itself. 
            // Adjusting based on common API patterns, but fallback to entire data if string.
            setReport(typeof data.report === 'string' ? data.report : JSON.stringify(data, null, 2));

        } catch (err) {
            console.error("Error generating report:", err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <NoteInput
                value={note}
                onChange={setNote}
                disabled={loading}
            />

            <div className="actions">
                <button
                    className="generate-btn"
                    onClick={handleGenerate}
                    disabled={loading || !note.trim()}
                >
                    {loading ? 'Processing...' : 'Generate Report'}
                </button>
            </div>

            {loading && <Loader />}

            <ReportOutput
                report={report}
                error={error}
                onCopy={() => { }} // Optional: feedback on copy could be added here
            />
        </div>
    );
}

export default Home;
