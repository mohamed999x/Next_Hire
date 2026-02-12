import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './PersonalBrandingAssistant.css';

const SUGGESTION_TEMPLATES = {
    professional: [
        "Results-oriented {role} with a proven track record of delivering high-quality solutions. Expertise in {skill} and a passion for optimizing performance.",
        "Strategic {role} specializing in {skill}. Dedicated to driving innovation and fostering collaborative environments to achieve business objectives."
    ],
    creative: [
        "Crafting digital experiences as a {role}. Turning complex problems into elegant {skill} solutions with a dash of creativity.",
        "Weaving code and design together. I'm a {role} who believes that {skill} is the secret sauce to great products."
    ],
    minimalist: [
        "{role} | {skill} Enthusiast | Builder",
        "Passionate {role} focused on {skill}."
    ]
};

export default function PersonalBrandingAssistant() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeBranding = (e) => {
        e.preventDefault();
        if (!input) return;

        setLoading(true);
        // Simulate AI analysis
        setTimeout(() => {
            const inputLower = input.toLowerCase();
            let detectedRole = "Professional";
            let detectedSkill = "Technology";

            if (inputLower.includes("engineer") || inputLower.includes("developer")) detectedRole = "Software Engineer";
            if (inputLower.includes("react") || inputLower.includes("frontend")) detectedSkill = "React & Frontend Development";
            else if (inputLower.includes("node") || inputLower.includes("backend")) detectedSkill = "Scalable Backend Systems";
            else if (inputLower.includes("design") || inputLower.includes("ui")) detectedSkill = "UI/UX Design";

            const generatedResults = {
                professional: SUGGESTION_TEMPLATES.professional[0]
                    .replace("{role}", detectedRole)
                    .replace("{skill}", detectedSkill),
                creative: SUGGESTION_TEMPLATES.creative[0]
                    .replace("{role}", detectedRole)
                    .replace("{skill}", detectedSkill),
                minimalist: SUGGESTION_TEMPLATES.minimalist[0]
                    .replace("{role}", detectedRole)
                    .replace("{skill}", detectedSkill)
            };

            setResults(generatedResults);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid personal-branding">
                <div className="branding-container">
                    <h1 className="text-center mb-5">AI Personal Branding Assistant</h1>

                    <div className="branding-input-card">
                        <h3>Elevate Your Professional Identity</h3>
                        <p className="text-muted">Enter your current headline or bio, and our AI will polish it for maximum impact.</p>

                        <form onSubmit={analyzeBranding} className="mt-4">
                            <div className="mb-4">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="e.g. I am a software engineer looking for new opportunities in React..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button className="btn custom-btn improve-btn" type="submit" disabled={loading || !input}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Analyzing...
                                        </>
                                    ) : "Optimize My Brand"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {results && (
                        <div className="result-card">
                            <h2 className="mb-4 text-center">Your Optimized Profiles</h2>

                            <div className="suggestion-box">
                                <span className="tag tag-professional">Professional Style</span>
                                <p className="lead">{results.professional}</p>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(results.professional)}>
                                    <i className="fa-regular fa-copy me-1"></i> Copy
                                </button>
                            </div>

                            <div className="suggestion-box">
                                <span className="tag tag-creative">Creative Style</span>
                                <p className="lead">{results.creative}</p>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(results.creative)}>
                                    <i className="fa-regular fa-copy me-1"></i> Copy
                                </button>
                            </div>

                            <div className="suggestion-box">
                                <span className="tag tag-minimalist">Minimalist / LinkedIn Headline</span>
                                <p className="lead">{results.minimalist}</p>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(results.minimalist)}>
                                    <i className="fa-regular fa-copy me-1"></i> Copy
                                </button>
                            </div>

                            <div className="text-center mt-5">
                                <button className="btn btn-link text-decoration-none" onClick={() => setResults(null)}>
                                    Try another input
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
