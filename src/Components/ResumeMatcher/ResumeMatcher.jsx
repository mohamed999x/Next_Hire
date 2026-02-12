import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ResumeMatcher.css";

const SKILL_KEYWORDS = [
    'react', 'javascript', 'node.js', 'python', 'java', 'html', 'css',
    'sql', 'mongodb', 'docker', 'aws', 'git', 'typescript', 'redux',
    'express', 'next.js', 'tailwind', 'bootstrap', 'agile', 'scrum'
];

const SKILL_RESOURCES = {
    'react': 'https://react.dev/learn',
    'javascript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'node.js': 'https://nodejs.org/en/learn',
    'python': 'https://www.py4e.com/',
    'java': 'https://dev.java/learn/',
    'html': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'css': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    'sql': 'https://www.w3schools.com/sql/',
    'mongodb': 'https://university.mongodb.com/',
    'docker': 'https://docs.docker.com/get-started/',
    'aws': 'https://aws.amazon.com/training/',
    'git': 'https://git-scm.com/book/en/v2',
    'typescript': 'https://www.typescriptlang.org/docs/',
    'redux': 'https://redux.js.org/introduction/getting-started',
    'express': 'https://expressjs.com/en/starter/installing.html',
    'next.js': 'https://nextjs.org/learn',
    'tailwind': 'https://tailwindcss.com/docs/installation',
    'bootstrap': 'https://getbootstrap.com/docs/5.3/getting-started/introduction/',
    'agile': 'https://www.atlassian.com/agile',
    'scrum': 'https://www.scrum.org/resources/what-is-scrum'
};

const SKILL_PROJECTS = {
    'react': { title: 'Dynamic Dashboard', desc: 'Build a real-time analytics dashboard with React hooks and chart libraries.' },
    'javascript': { title: 'JS Game Engine', desc: 'Create a simple 2D game engine using HTML5 Canvas and vanilla JS.' },
    'node.js': { title: 'RESTful API Server', desc: 'Develop a secure backend server for a task management application.' },
    'python': { title: 'AI Automation Script', desc: 'Write a Python script to automate data scraping and analysis.' },
    'java': { title: 'Inventory Management System', desc: 'Build a desktop/web app to track stock and sales using Spring Boot.' },
    'html': { title: 'Static Landing Page', desc: 'Design a high-conversion, responsive landing page from scratch.' },
    'css': { title: 'CSS Animation Gallery', desc: 'Create a set of complex, pure-CSS UI animations and transitions.' },
    'sql': { title: 'E-commerce Database Design', desc: 'Model and implement a relational database for an online store.' },
    'mongodb': { title: 'Social Media NoSQL Backend', desc: 'Schema design and implementation for a highly-scalable social app.' },
    'docker': { title: 'Microservices Containerization', desc: 'Containerize a MERN stack app and deploy to a cloud provider.' },
    'aws': { title: 'Serverless File Processor', desc: 'Use AWS Lambda and S3 to automatically process uploaded images.' },
    'git': { title: 'Open Source Contribution', desc: 'Contribute a significant feature to a popular GitHub repository.' },
    'typescript': { title: 'Type-Safe E-commerce Frontend', desc: 'Refactor a React store to use strict TypeScript interfaces.' },
    'redux': { title: 'Global State Management Hub', desc: 'Build a complex app with multi-stage forms and local storage persistence.' },
    'express': { title: 'Real-time Chat Application', desc: 'Use Socket.io and Express to build a live messaging platform.' },
    'next.js': { title: 'SEO Optimized Blog System', desc: 'Build a full-stack blog with server-side rendering and markdown support.' },
    'tailwind': { title: 'SaaS UI Template Kit', desc: 'Design a reusable set of UI components using utility-first CSS.' },
    'bootstrap': { title: 'Admin Dashboard Template', desc: 'Create a clean, responsive admin panel with Bootstrap 5 components.' },
    'agile': { title: 'Agile Project Simulation', desc: 'Lead a team project using Jira/Trello following Scrum ceremonies.' },
    'scrum': { title: 'Sprint Planning Automation', desc: 'Develop a tool to calculate team velocity and automate sprint tasks.' }
};

export default function ResumeMatcher() {
    const navigate = useNavigate();
    const [resume, setResume] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const calculateMatch = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const resumeLower = resume.toLowerCase();
            const jobLower = jobDesc.toLowerCase();

            // Mock keyword extraction
            const jobSkills = SKILL_KEYWORDS.filter(skill => jobLower.includes(skill.toLowerCase()));
            const matchedSkills = jobSkills.filter(skill => resumeLower.includes(skill.toLowerCase()));
            const missingSkills = jobSkills.filter(skill => !resumeLower.includes(skill.toLowerCase()));

            let score = 0;
            if (jobSkills.length > 0) {
                score = Math.round((matchedSkills.length / jobSkills.length) * 100);
            } else if (resume.length > 50 && jobDesc.length > 50) {
                score = 70; // Fallback for general matches
            }

            setResult({
                score,
                matchedSkills,
                missingSkills,
                resources: missingSkills.map(skill => ({
                    name: skill,
                    link: SKILL_RESOURCES[skill.toLowerCase()] || `https://www.youtube.com/results?search_query=learn+${skill}`
                })),
                projects: missingSkills.map(skill => ({
                    skill: skill,
                    ...(SKILL_PROJECTS[skill.toLowerCase()] || {
                        title: `${skill} Integration Project`,
                        desc: `Build a real-world application that demonstrates your proficiency in ${skill}.`
                    })
                })),
                tips: missingSkills.map(skill => `Include your experience with ${skill} specifically.`)
            });
            setLoading(false);
        }, 1500);
    };

    const getScoreClass = (score) => {
        if (score >= 80) return 'score-perfect';
        if (score >= 60) return 'score-good';
        if (score >= 40) return 'score-average';
        return 'score-low';
    };

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid resume-matcher">
                <div className="matcher-container">
                    <h1 className="text-center mb-5">AI Resume Scorer & Matcher</h1>

                    <div className="input-section">
                        <div className="input-card">
                            <h4>Paste Your Resume</h4>
                            <textarea
                                className="form-control"
                                rows="10"
                                placeholder="Paste your CV text here..."
                                value={resume}
                                onChange={(e) => setResume(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="input-card">
                            <h4>Paste Job Description</h4>
                            <textarea
                                className="form-control"
                                rows="10"
                                placeholder="Paste the job requirements here..."
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            className="btn custom-btn match-btn"
                            onClick={calculateMatch}
                            disabled={loading || !resume || !jobDesc}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    AI is analyzing...
                                </>
                            ) : "Run Match Analysis"}
                        </button>
                    </div>

                    {result && (
                        <div className="score-card">
                            <div className={`circular-score ${getScoreClass(result.score)}`}>
                                {result.score}%
                            </div>
                            <h2>Match Score</h2>
                            <div className="d-flex justify-content-center gap-3 mb-4">
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate('/cover-letter', { state: { resume, jobDesc } })}
                                >
                                    <i className="fa-solid fa-file-signature me-2"></i> Generate Cover Letter
                                </button>
                            </div>
                            <p className="lead text-muted">
                                {result.score >= 80 ? "Excellent Match! Your resume is highly compatible." :
                                    result.score >= 60 ? "Good Match. Consider adding a few more keywords." :
                                        "Needs Improvement. You are missing key requirements."}
                            </p>

                            <div className="analysis-grid">
                                <div className="analysis-item matched-skills">
                                    <h5><i className="fa-solid fa-circle-check text-success me-2"></i> Matched Skills</h5>
                                    <div className="mt-2">
                                        {result.matchedSkills.length > 0 ? (
                                            result.matchedSkills.map(s => <span key={s} className="skill-tag">{s}</span>)
                                        ) : <p className="text-muted small">No direct keyword matches found.</p>}
                                    </div>
                                </div>
                                <div className="analysis-item missing-skills">
                                    <h5><i className="fa-solid fa-circle-xmark text-danger me-2"></i> Missing Keywords</h5>
                                    <div className="mt-2">
                                        {result.missingSkills.length > 0 ? (
                                            result.missingSkills.map(s => (
                                                <span key={s} className="skill-tag">
                                                    {s}
                                                    <a
                                                        href={SKILL_RESOURCES[s.toLowerCase()] || `https://www.youtube.com/results?search_query=learn+${s}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-danger btn-sm learn-btn"
                                                    >
                                                        Learn
                                                    </a>
                                                </span>
                                            ))
                                        ) : <p className="text-muted small">You've covered all detected skills!</p>}
                                    </div>
                                </div>
                            </div>

                            {result.resources.length > 0 && (
                                <div className="mt-5 text-start">
                                    <h4 className="mb-3"><i className="fa-solid fa-graduation-cap text-primary me-2"></i> AI Skill-Up Roadmaps</h4>
                                    <div className="list-group resource-list">
                                        {result.resources.map((res, i) => (
                                            <a
                                                key={i}
                                                href={res.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <strong className="text-capitalize">{res.name}</strong>
                                                    <p className="mb-0 text-muted small">Master this skill with curated learning resources.</p>
                                                </div>
                                                <span className="learn-link">Start Learning <i className="fa-solid fa-arrow-up-right-from-square ms-1"></i></span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {result.projects.length > 0 && (
                                <div className="mt-5 text-start">
                                    <h4 className="mb-3"><i className="fa-solid fa-hammer text-special me-2"></i> Boost Your Portfolio</h4>
                                    <p className="text-muted small mb-4">The AI suggests building these specific projects to prove your expertise in "Missing Skills".</p>
                                    <div className="row g-3">
                                        {result.projects.map((proj, i) => (
                                            <div key={i} className="col-md-6">
                                                <div className="project-card h-100">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <span className="badge bg-soft-special text-special">{proj.skill}</span>
                                                    </div>
                                                    <h5>{proj.title}</h5>
                                                    <p className="small text-muted">{proj.desc}</p>
                                                    <button className="btn btn-sm btn-special w-100 mt-2">Start Project Specs</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {result.tips.length > 0 && (
                                <div className="mt-4 text-start">
                                    <h5>Quick Suggestions:</h5>
                                    <ul className="list-group list-group-flush">
                                        {result.tips.map((tip, i) => (
                                            <li key={i} className="list-group-item bg-transparent">
                                                <i className="fa-solid fa-lightbulb text-warning me-2"></i> {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button className="btn btn-link mt-4" onClick={() => setResult(null)}>Reset Analysis</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
