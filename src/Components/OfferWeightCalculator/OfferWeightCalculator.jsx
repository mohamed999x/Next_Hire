import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./OfferWeightCalculator.css";

export default function OfferWeightCalculator() {
    const defaultOffer = {
        salary: "",
        commute: "",
        benefits: 5,
        growth: 5,
        stability: 5
    };

    const [offerA, setOfferA] = useState({ ...defaultOffer });
    const [offerB, setOfferB] = useState({ ...defaultOffer });
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const calculateValues = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const processOffer = (off) => {
                const s = parseFloat(off.salary) || 0;
                const c = parseFloat(off.commute) || 0;

                // Normalizing 
                // Salary (40%), Growth (25%), Commute (15% negative), Stability (10%), Benefits (10%)
                const salaryScore = (s / 200000) * 40; // Max ref 200k
                const growthScore = off.growth * 2.5;
                const commutePenalty = (c / 120) * 15; // Max ref 120min
                const stabilityScore = off.stability * 1.0;
                const benefitsScore = off.benefits * 1.0;

                const total = salaryScore + growthScore + stabilityScore + benefitsScore - commutePenalty;
                return Math.max(0, Math.min(100, total));
            };

            const scoreA = processOffer(offerA);
            const scoreB = processOffer(offerB);

            // Verdict Logic
            let verdict = "";
            if (Math.abs(scoreA - scoreB) < 5) {
                verdict = "Both offers are remarkably similar in total life value. Choose based on the specific team culture or personal gut feeling.";
            } else if (scoreA > scoreB) {
                const reason = offerA.salary > offerB.salary && scoreA > scoreB
                    ? "Offer A provides the best financial and lifestyle balance."
                    : "Even with a potentially lower salary, Offer A wins due to superior growth and shorter commute.";
                verdict = `Offer A is the strategic winner. ${reason}`;
            } else {
                const reason = offerB.salary > offerA.salary && scoreB > scoreA
                    ? "Offer B provides the best financial and lifestyle balance."
                    : "Offer B is the clear choice for your long-term career health, despite the base salary difference.";
                verdict = `Offer B is the strategic winner. ${reason}`;
            }

            setResult({
                scoreA: Math.round(scoreA),
                scoreB: Math.round(scoreB),
                winner: scoreA > scoreB ? "Offer A" : "Offer B",
                verdict: verdict
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleInput = (offer, setOffer, field, value) => {
        setOffer({ ...offer, [field]: value });
    };

    return (
        <div className="container-fluid p-0 offer-calc-container">
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="calc-card mb-5">
                            <div className="text-center mb-5">
                                <h1 className="fw-bold">AI Offer-Weight Calculator ⚖️</h1>
                                <p className="text-muted">Compare job offers by "Total Life Value" – because your career is more than just a paycheck.</p>
                            </div>

                            <div className="row g-4">
                                {/* Offer A Column */}
                                <div className="col-md-5">
                                    <div className="offer-header header-a text-uppercase">Offer A</div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Annual Salary ($)</label>
                                        <input type="number" className="form-control calc-input" placeholder="e.g. 85000"
                                            value={offerA.salary} onChange={(e) => handleInput(offerA, setOfferA, 'salary', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Daily Commute (Total Minutes)</label>
                                        <input type="number" className="form-control calc-input" placeholder="e.g. 45"
                                            value={offerA.commute} onChange={(e) => handleInput(offerA, setOfferA, 'commute', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Career Growth (1-10)</label>
                                        <input type="range" className="form-range" min="1" max="10"
                                            value={offerA.growth} onChange={(e) => handleInput(offerA, setOfferA, 'growth', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Benefits & Healthcare (1-10)</label>
                                        <input type="range" className="form-range" min="1" max="10"
                                            value={offerA.benefits} onChange={(e) => handleInput(offerA, setOfferA, 'benefits', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Company Stability (1-10)</label>
                                        <input type="range" className="form-range" min="1" max="10"
                                            value={offerA.stability} onChange={(e) => handleInput(offerA, setOfferA, 'stability', e.target.value)} />
                                    </div>
                                </div>

                                {/* Divider / VS */}
                                <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">
                                    <div className="fw-bold fs-2 text-muted opacity-25">VS</div>
                                    <button className="btn btn-analyze mt-4" onClick={calculateValues} disabled={isAnalyzing}>
                                        {isAnalyzing ? "..." : "Analyze"}
                                    </button>
                                </div>

                                {/* Offer B Column */}
                                <div className="col-md-5">
                                    <div className="offer-header header-b text-uppercase">Offer B</div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Annual Salary ($)</label>
                                        <input type="number" className="form-control calc-input" placeholder="e.g. 95000"
                                            value={offerB.salary} onChange={(e) => handleInput(offerB, setOfferB, 'salary', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Daily Commute (Total Minutes)</label>
                                        <input type="number" className="form-control calc-input" placeholder="e.g. 20"
                                            value={offerB.commute} onChange={(e) => handleInput(offerB, setOfferB, 'commute', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Career Growth (1-10)</label>
                                        <input type="range" className="form-range" min="1" max="10"
                                            value={offerB.growth} onChange={(e) => handleInput(offerB, setOfferB, 'growth', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Benefits & Healthcare (1-10)</label>
                                        <input type="range" className="form-range" min="1" max="10"
                                            value={offerB.benefits} onChange={(e) => handleInput(offerB, setOfferB, 'benefits', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="input-group-label">Company Stability (1-10)</label>
                                        <input type="range" className="form-range" min="1" max="10"
                                            value={offerB.stability} onChange={(e) => handleInput(offerB, setOfferB, 'stability', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {result && (
                                <div className="comparison-result mt-5">
                                    <div className="row text-center mb-4">
                                        <div className="col-6">
                                            <h4>Offer A</h4>
                                            <div className="score-bar-container">
                                                <div className="score-bar bar-a" style={{ width: `${result.scoreA}%` }}></div>
                                            </div>
                                            <div className="fs-3 fw-bold">{result.scoreA} <small className="fs-6 opacity-50">/ 100</small></div>
                                        </div>
                                        <div className="col-6">
                                            <h4>Offer B</h4>
                                            <div className="score-bar-container">
                                                <div className="score-bar bar-b" style={{ width: `${result.scoreB}%` }}></div>
                                            </div>
                                            <div className="fs-3 fw-bold">{result.scoreB} <small className="fs-6 opacity-50">/ 100</small></div>
                                        </div>
                                    </div>

                                    <div className="verdict-box mt-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="mb-0">AI Strategic Verdict</h5>
                                            <span className="winner-badge">{result.winner === "Offer A" ? "🏆 Offer A Wins" : "🏆 Offer B Wins"}</span>
                                        </div>
                                        <p className="lead mb-0" style={{ fontSize: '1.1rem' }}>{result.verdict}</p>
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
