import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CareerRoadmap.css';

const ROADMAP_TEMPLATES = {
    "frontend": [
        { title: "HTML & CSS Mastery", desc: "Learn layout techniques (Flexbox, Grid) and semantic HTML.", icon: "fa-html5" },
        { title: "JavaScript Fundamentals", desc: "Deep dive into ES6+, DOM manipulation, and Async JS.", icon: "fa-js" },
        { title: "React Ecosystem", desc: "Master components, hooks, and state management (Redux/Context).", icon: "fa-react" },
        { title: "Styling Frameworks", desc: "Explore Tailwind CSS, Bootstrap, or CSS-in-JS.", icon: "fa-css3-alt" },
        { title: "Testing & Deployment", desc: "Learn Jest, RTL and deploying to Vercel/Netlify.", icon: "fa-cloud-upload-alt" }
    ],
    "backend": [
        { title: "Server-side Language", desc: "Master Node.js, Python, or Java for backend logic.", icon: "fa-node-js" },
        { title: "Database Architecture", desc: "Learn SQL (PostgreSQL) and NoSQL (MongoDB) fundamentals.", icon: "fa-database" },
        { title: "API Development", desc: "Build RESTful and GraphQL APIs with robust security.", icon: "fa-server" },
        { title: "Authentication", desc: "Implement JWT, OAuth, and secure session management.", icon: "fa-user-lock" },
        { title: "DevOps Basics", desc: "Explore Docker, CI/CD pipelines, and cloud hosting.", icon: "fa-docker" }
    ],
    "fullstack": [
        { title: "Frontend Core", desc: "Build responsive UIs using modern JS frameworks.", icon: "fa-desktop" },
        { title: "Backend Systems", desc: "Design and implement scalable server architectures.", icon: "fa-cog" },
        { title: "Database Integration", desc: "Connect frontend apps to persistent data storage.", icon: "fa-link" },
        { title: "Full Stack Projects", desc: "Build end-to-end applications from scratch.", icon: "fa-project-diagram" },
        { title: "System Design", desc: "Learn high-level architectural patterns for large apps.", icon: "fa-microchip" }
    ]
};

export default function CareerRoadmap() {
    const [goal, setGoal] = useState("");
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateRoadmap = (e) => {
        e.preventDefault();
        if (!goal) return;

        setLoading(true);
        // MOCK AI LOGIC
        setTimeout(() => {
            const lowerGoal = goal.toLowerCase();
            let result = null;

            if (lowerGoal.includes("front")) result = ROADMAP_TEMPLATES.frontend;
            else if (lowerGoal.includes("back")) result = ROADMAP_TEMPLATES.backend;
            else if (lowerGoal.includes("full")) result = ROADMAP_TEMPLATES.fullstack;
            else {
                // Generative fallback
                result = [
                    { title: "Core Basics", desc: `Learn the fundamentals related to ${goal}.`, icon: "fa-graduation-cap" },
                    { title: "Intermediate Skills", desc: `Advance your knowledge in ${goal} specializations.`, icon: "fa-book" },
                    { title: "Practical Application", desc: "Build real-world projects to build your portfolio.", icon: "fa-tools" },
                    { title: "Advanced Topics", desc: `Master complex concepts in the ${goal} field.`, icon: "fa-brain" },
                    { title: "Job Readiness", desc: "Prepare for interviews and launch your career.", icon: "fa-briefcase" }
                ];
            }

            setRoadmap(result);
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid career-roadmap">
                <div className="roadmap-container">
                    <h1 className="text-center mb-5">AI Career Roadmap Generator</h1>

                    <div className="roadmap-input-card text-center">
                        <h3>Where do you want to be?</h3>
                        <p className="text-muted">Enter your dream job title and we'll map out your journey.</p>
                        <form onSubmit={generateRoadmap} className="d-flex gap-2 mt-4 justify-content-center">
                            <input
                                type="text"
                                className="form-control w-50"
                                placeholder="e.g. Frontend Developer"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                            />
                            <button className="btn custom-btn" type="submit" disabled={loading}>
                                {loading ? "Analyzing..." : "Generate Roadmap"}
                            </button>
                        </form>
                    </div>

                    {roadmap && (
                        <div className="timeline-section mt-5">
                            <h2 className="text-center mb-5">Your Path to <span className="text-primary text-capitalize">{goal}</span></h2>
                            <div className="timeline">
                                {roadmap.map((step, index) => (
                                    <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <div className="timeline-icon">
                                                <i className={`fa-solid ${step.icon}`}></i>
                                            </div>
                                            <h4>{step.title}</h4>
                                            <p className="text-muted mb-0">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-5">
                                <button className="btn btn-outline-primary" onClick={() => setRoadmap(null)}>
                                    Generate New Roadmap
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
