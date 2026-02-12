import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./PivotPredictor.css";

export default function PivotPredictor() {
    const [skills, setSkills] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeFuture = () => {
        setIsAnalyzing(true);

        // Simulated AI Strategic Analysis
        setTimeout(() => {
            const skillList = skills.toLowerCase().split(',').map(s => s.trim());

            const database = {
                'react': { risk: 65, timeline: 'High automation for basic UI in 2.5 years', pivot: 'Focus on AI Agent Interfaces & Edge Reactivity' },
                'javascript': { risk: 30, timeline: 'Core logic remains stable, boilerplate goes to AI', pivot: 'Universal Compute & WebAssembly (WASM)' },
                'html': { risk: 85, timeline: 'Zero-code generation in 18 months', pivot: 'Accessibility Engineering & Semantic Architecture' },
                'css': { risk: 80, timeline: 'Design-to-Code AI is winning', pivot: 'Motion Design & Spatial UI (AR/VR)' },
                'python': { risk: 20, timeline: 'Remains the language of AI research', pivot: 'MLOps & LLM Fine-tuning' },
                'node.js': { risk: 40, timeline: 'Backend boilerplate automated', pivot: 'Distributed Systems & Serverless Architecture' },
                'java': { risk: 45, timeline: 'Enterprise legacy stable, new dev shifting', pivot: 'Cloud-Native & Quarkus Optimization' },
                'sql': { risk: 15, timeline: 'Data remains king, but AI writes queries', pivot: 'Vector Databases & Data Engineering' }
            };

            let totalRisk = 0;
            let foundSkills = 0;
            let timelineSteps = [];
            let pivotActions = [];

            skillList.forEach(s => {
                if (database[s]) {
                    totalRisk += database[s].risk;
                    foundSkills++;
                    timelineSteps.push({ skill: s, text: database[s].timeline });
                    pivotActions.push({ skill: s, action: database[s].pivot });
                }
            });

            const score = foundSkills > 0 ? (totalRisk / foundSkills) : 35;
            const longevity = 100 - score;

            setResult({
                longevity: Math.round(longevity),
                riskLevel: score > 70 ? 'Extreme' : score > 40 ? 'Moderate' : 'Low',
                timeline: timelineSteps.length > 0 ? timelineSteps : [{ skill: 'General', text: 'Market shifting towards AI integration across all stacks.' }],
                pivots: pivotActions.length > 0 ? pivotActions : [{ skill: 'Core', action: 'Move towards AI Management and Strategy.' }],
                verdict: score > 60
                    ? "Warning: Your current stack is highly vulnerable to AI automation. Strategic pivot recommended."
                    : score > 30
                        ? "Good standing. Your core logic skills are safe, but boilerplate tasks are shifting. Augment with AI tools."
                        : "Elite Path. Your skills are in the 'Safe Zone' of high-complexity computing."
            });

            setIsAnalyzing(false);
        }, 2000);
    };

    const getRiskClass = (level) => {
        if (level === 'Extreme') return 'risk-high';
        if (level === 'Moderate') return 'risk-medium';
        return 'risk-low';
    };

    return (
        <div className="container-fluid p-0 predictor-container">
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="predictor-card">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-extrabold glow-text">Future-Proof Pivot Predictor 🔮</h1>
                                <p className="text-muted lead">The AI "Career Bodyguard" analyzing your path for the next 5 years.</p>
                            </div>

                            {!result ? (
                                <div className="skill-input-card text-center py-5">
                                    <h3>What's in your toolbox?</h3>
                                    <p className="text-secondary mb-4">Enter your core skills (e.g., React, Python, SQL) for a 5-year risk assessment.</p>
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <input
                                                className="form-control future-textarea mb-4 text-center"
                                                placeholder="React, CSS, Node.js, Python..."
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-predict px-5"
                                                onClick={analyzeFuture}
                                                disabled={isAnalyzing || !skills}
                                            >
                                                {isAnalyzing ? (
                                                    <><span className="spinner-border spinner-border-sm me-2"></span>Initiating Market Scan...</>
                                                ) : "Run Strategy Analysis"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="analysis-results">
                                    <div className="row">
                                        <div className="col-md-4 text-center">
                                            <div className="gauge-container">
                                                <div className="gauge-ring"></div>
                                                <div
                                                    className="gauge-fill"
                                                    style={{ transform: `rotate(${result.longevity * 1.8}deg)` }}
                                                ></div>
                                                <div className="gauge-value">{result.longevity}%</div>
                                            </div>
                                            <h5 className="mt-3">Longevity Score</h5>
                                            <span className={`risk-tag ${getRiskClass(result.riskLevel)}`}>
                                                {result.riskLevel} Risk
                                            </span>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="p-4 bg-dark-soft rounded-4 border border-info border-opacity-10">
                                                <h4 className="text-info mb-3">AI Strategic Verdict</h4>
                                                <p className="lead">{result.verdict}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-5">
                                        <div className="col-lg-6">
                                            <h4 className="mb-4 text-warning"><i className="fa-solid fa-hourglass-half me-2"></i> Obsolescence Timeline</h4>
                                            <div className="timeline-container ps-3">
                                                {result.timeline.map((item, i) => (
                                                    <div key={i} className="timeline-step">
                                                        <strong className="text-capitalize d-block text-white">{item.skill}</strong>
                                                        <span className="text-muted small">{item.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <h4 className="mb-4 text-success"><i className="fa-solid fa-arrow-right-to-bracket me-2"></i> Strategic Pivot Actions</h4>
                                            <div className="row g-3">
                                                {result.pivots.map((item, i) => (
                                                    <div key={i} className="col-12">
                                                        <div className="pivot-card">
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <span className="badge bg-secondary text-capitalize">{item.skill}</span>
                                                                <i className="fa-solid fa-bolt text-success"></i>
                                                            </div>
                                                            <p className="mb-0 text-white-50">{item.action}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-5 pt-4">
                                        <button className="btn neon-glow-btn px-4" onClick={() => setResult(null)}>
                                            Re-Scan New Stack
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
