import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./CoverLetterArchitect.css";

export default function CoverLetterArchitect() {
    const location = useLocation();
    const [resume, setResume] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [tone, setTone] = useState("Professional");
    const [letter, setLetter] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        if (location.state?.resume) setResume(location.state.resume);
        if (location.state?.jobDesc) setJobDesc(location.state.jobDesc);
    }, [location.state]);

    const generateLetter = () => {
        setIsGenerating(true);
        setDisplayText("");

        // Simulated AI Generation Logic
        setTimeout(() => {
            const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            const templates = {
                "Professional": `[Your Name]
[Your Address]
[Your Phone] | [Your Email]

${date}

Hiring Manager
[Company Name]

Subject: Application for [Job Title]

Dear Hiring Manager,

I am writing to formally express my interest in the [Job Title] position at [Company Name]. With a strong background as reflected in my resume, I am confident that my skills in areas such as ${extractProjectedSkills(resume)} make me a perfect fit for this role.

During my experience, I have developed a deep understanding of [Key Industry Requirement], and I am eager to apply this expertise to help [Company Name] achieve its goals. I am particularly drawn to this opportunity because of your commitment to [Specific Job Requirement mentioned in Job Description].

I look forward to the possibility of discussing how my technical proficiency and dedicated approach can contribute to your team. Thank you for your time and consideration.

Sincerely,

[Your Name]`,

                "Modern": `[Your Name]
[Your Email] | [Your Portfolio/LinkedIn]

Hey Team at [Company Name],

I've been following [Company Name]'s growth for a while, and when I saw the opening for [Job Title], I knew I had to reach out.

I don't just have the skills listed in your description—like ${extractProjectedSkills(resume)}—I have the passion to use them to solve real problems. I noticed you're looking for someone who can handle [Key Job Requirement], which is exactly where my strengths lie.

In my recent projects, I've focused on [Result-oriented Skill], and I’m ready to hit the ground running with your innovative team. I’d love to chat about the future of [Company Industry] at [Company Name] and how I can help.

Best,

[Your Name]`,

                "Creative": `✨ [Your Name] | [Your Personal Brand Tagline] ✨

To the Visionaries at [Company Name],

Great companies are built on great ideas, and I believe my background in [Primary Skill] can be the next big asset for your [Job Title] role.

I’m not a fan of generic templates. I looked at your job description for [Job Title] and saw a perfect match for my experience with ${extractProjectedSkills(resume)}. What excites me most is [Unique Job Point]—it’s exactly the kind of challenge I thrive on.

My philosophy is simple: build things that matter. I’ve done that with [Previous Project/Skill], and I want to do it again for [Company Name]. Let's create something amazing together.

Cheers,

[Your Name]`
            };

            const finalLetter = templates[tone]
                .replace(/\[Job Title\]/g, extractJobTitle(jobDesc) || "the advertised role")
                .replace(/\[Company Name\]/g, extractCompanyName(jobDesc) || "your organization")
                .replace(/\[Company Industry\]/g, "this industry");

            setLetter(finalLetter);
            setIsGenerating(false);
            animateText(finalLetter);
        }, 1500);
    };

    const animateText = (fullText) => {
        let currentText = "";
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                currentText += fullText[index];
                setDisplayText(currentText);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 5);
    };

    const extractProjectedSkills = (text) => {
        const commonSkills = ['React', 'JavaScript', 'Node.js', 'Python', 'Java', 'SQL', 'Docker', 'AWS', 'TypeScript'];
        const found = commonSkills.filter(s => text.toLowerCase().includes(s.toLowerCase()));
        return found.length > 0 ? found.slice(0, 3).join(', ') : "top-tier technical skills";
    }

    const extractJobTitle = (text) => {
        const match = text.match(/(Job Title|Role|Position):\s*(.*)/i);
        return match ? match[2] : "";
    }

    const extractCompanyName = (text) => {
        const match = text.match(/(Company|Organization):\s*(.*)/i);
        return match ? match[2] : "";
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(displayText);
        alert("Cover letter copied to clipboard!");
    }

    return (
        <div className="container-fluid p-0 cover-letter-container">
            <Header />
            <div className="container">
                <div className="architect-card mb-5">
                    <div className="row">
                        <div className="col-lg-5">
                            <h2 className="mb-4">Cover Letter Architect ✍️</h2>
                            <p className="text-muted mb-4">Craft a winning letter tailored specifically to your dream job.</p>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Your Resume Content</label>
                                <textarea
                                    className="form-control architect-textarea"
                                    rows="6"
                                    placeholder="Paste your resume text here..."
                                    value={resume}
                                    onChange={(e) => setResume(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Job Description</label>
                                <textarea
                                    className="form-control architect-textarea"
                                    rows="6"
                                    placeholder="Paste the job description here..."
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="tone-selector">
                                {['Professional', 'Modern', 'Creative'].map(t => (
                                    <button
                                        key={t}
                                        className={`tone-btn ${tone === t ? 'active' : ''}`}
                                        onClick={() => setTone(t)}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="btn btn-generate w-100"
                                onClick={generateLetter}
                                disabled={isGenerating || !resume || !jobDesc}
                            >
                                {isGenerating ? (
                                    <><span className="spinner-border spinner-border-sm me-2"></span>Architecting...</>
                                ) : "Generate Cover Letter"}
                            </button>
                        </div>

                        <div className="col-lg-7 mt-4 mt-lg-0">
                            <div className="letter-canvas">
                                {displayText ? (
                                    <>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className="badge bg-primary">Output Tone: {tone}</span>
                                            <button className="btn btn-outline-primary btn-sm" onClick={copyToClipboard}>
                                                <i className="fa-regular fa-copy me-1"></i> Copy
                                            </button>
                                        </div>
                                        <div className="letter-header">
                                            <h4 className="mb-0">Generated Cover Letter</h4>
                                        </div>
                                        <div className="letter-content">
                                            {displayText}
                                            {isGenerating === false && displayText.length < letter.length && <span className="typing-indicator"></span>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-100 d-flex flex-column justify-content-center align-items-center text-muted">
                                        <i className="fa-solid fa-file-pen fa-3x mb-3 opacity-25"></i>
                                        <p>Your tailored cover letter will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
