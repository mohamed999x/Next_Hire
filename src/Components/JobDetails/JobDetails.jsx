import React, { useContext, useEffect, useState } from 'react';
import "./JobDetails.css";
import { TheUserContext } from '../UserContext/UserContext';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';

export default function JobDetails() {
  const { userData } = useContext(TheUserContext);
  const jobId = localStorage.getItem("selectedJobId");
  const employeeId = localStorage.getItem("employee-id");

  // ... (previous code)
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [certificateFiles, setCertificateFiles] = useState(null); // New state for certificates
  const [responseMessage, setResponseMessage] = useState("");
  const [applications, setApplications] = useState([]);

  // 📥 Load applications for this job
  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) return;
      try {
        // MOCK BACKEND
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockApps = JSON.parse(localStorage.getItem(`applications_${jobId}`) || '[]');
        setApplications(mockApps);
        console.log("Mock Applications:", mockApps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [jobId]);

  // 📤 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverLetter || !cvFile) {
      setResponseMessage("Please fill in both the cover letter and upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("CoverLetter", coverLetter);
    formData.append("Cv", cvFile);

    // Append certificates if any
    if (certificateFiles && certificateFiles.length > 0) {
      for (let i = 0; i < certificateFiles.length; i++) {
        formData.append("Certificates", certificateFiles[i]);
      }
    }

    try {
      // MOCK BACKEND
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newApp = {
        appliedDate: new Date().toISOString(),
        status: 'Pending (Mock)',
        coverLetter: coverLetter,
        // Store filenames as we can't store actual files easily in localStorage text
        cvName: cvFile.name,
        certificates: certificateFiles ? Array.from(certificateFiles).map(f => f.name) : []
      };

      const existingApps = JSON.parse(localStorage.getItem(`applications_${jobId}`) || '[]');
      existingApps.push(newApp);
      localStorage.setItem(`applications_${jobId}`, JSON.stringify(existingApps));

      setApplications(existingApps); // Update local state to show it immediately
      setResponseMessage("Application submitted successfully! (Mocked)");

    } catch (error) {
      console.error("Error applying to job:", error);
      setResponseMessage("There was an error submitting your application.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header userData={userData} />
      <div className="container-fluid">
        <div className="job-details">

          {/* ✅ Applications List Section */}
          <h2 className="mb-4">Applications for this Job</h2>

          {/* Match Analysis Section */}
          <div className="card p-3 mb-4 shadow-sm bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="m-0">Job Match Analysis</h3>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (!coverLetter && !cvFile) {
                    setResponseMessage("Please upload a CV or write a cover letter to analyze.");
                    return;
                  }

                  // Simple Mock Analysis Logic
                  // In a real app, this would use the backend or more complex NLP
                  const jobDesc = (applications.length > 0 ? "job description" : "job").toLowerCase(); // In real app use job.description
                  // Since we don't have easy access to job description text here without fetching job details again,
                  // We will mock the score based on text length and some keywords.

                  const textToAnalyze = (coverLetter + (cvFile ? " " + cvFile.name : "")).toLowerCase();
                  const keywords = ['react', 'node', 'javascript', 'css', 'html', 'design', 'frontend', 'backend'];

                  let matchCount = 0;
                  const missing = [];

                  keywords.forEach(kw => {
                    if (textToAnalyze.includes(kw)) {
                      matchCount++;
                    } else {
                      if (Math.random() > 0.5) missing.push(kw); // Randomly mark as missing for demo
                    }
                  });

                  // randomness for demo feeling
                  const baseScore = Math.min(100, Math.max(20, (matchCount * 15) + (textToAnalyze.length > 50 ? 20 : 0)));

                  setResponseMessage(`Analysis Complete! Match Score: ${baseScore}%`);
                  alert(`Match Score: ${baseScore}%\nPossible Missing Keywords: ${missing.join(', ') || 'None!'}`);
                }}
              >
                Analyze Match
              </button>
            </div>
            <p className="text-muted small mt-2">
              Click to analyze how well your profile matches this job description based on your cover letter and CV.
            </p>
          </div>

          {applications.length === 0 ? (
            <p>No applications submitted yet.</p>
          ) : (
            <div className="applications-list mb-5">
              {applications.map((app, index) => (
                <div key={index} className="application-card p-3 mb-3 border rounded bg-light">
                  <p><strong>Applied Date:</strong> {new Date(app.appliedDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {app.status}</p>
                </div>
              ))}
            </div>
          )}

          {/* 📝 Application Form */}
          <h2 className="mb-4">Apply to this Job</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
              <textarea
                id="coverLetter"
                className="form-control"
                rows="5"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write your cover letter here..."
                required
              ></textarea>
            </div>

            {/* 🆕 CV Upload with Preview */}
            <div className="mb-3">
              <label htmlFor="cvUpload" className="form-label">Upload Your CV</label>
              <input
                type="file"
                id="cvUpload"
                className="form-control"
                onChange={(e) => setCvFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                required
              />
              {cvFile && (
                <div className="mt-2 p-2 border rounded bg-white">
                  <p className="mb-1"><strong>Selected File:</strong> {cvFile.name}</p>
                  <p className="text-muted small">{(cvFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
            </div>

            {/* 🆕 Certificate Upload */}
            <div className="mb-3">
              <label htmlFor="certUpload" className="form-label">Upload Certificates (Optional)</label>
              <input
                type="file"
                id="certUpload"
                className="form-control"
                onChange={(e) => setCertificateFiles(e.target.files)}
                accept="image/*,.pdf"
                multiple
              />
              {certificateFiles && certificateFiles.length > 0 && (
                <div className="mt-2 p-2 border rounded bg-white">
                  <p className="mb-1"><strong>Selected Certificates:</strong> {certificateFiles.length} file(s)</p>
                  <ul className="list-unstyled mb-0">
                    {Array.from(certificateFiles).map((file, idx) => (
                      <li key={idx} className="small text-muted">{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className="btn custom-btn">Apply Now</button>
          </form>

          {responseMessage && (
            <div className="alert alert-info mt-3">{responseMessage}</div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
