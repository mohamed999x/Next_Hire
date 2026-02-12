import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MockInterview.css';

const QUESTIONS = {
    frontend: [
        {
            question: "What is the primary purpose of the Virtual DOM in React?",
            options: [
                "To directly manipulate the browser's DOM for better speed.",
                "To create a lightweight copy of the DOM to minimize expensive direct DOM updates.",
                "To store global application state.",
                "To handle server-side routing."
            ],
            correct: 1
        },
        {
            question: "Which hook is used to handle side effects in functional components?",
            options: ["useState", "useContext", "useEffect", "useReducer"],
            correct: 2
        },
        {
            question: "What does JSX stand for?",
            options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Xerox", "JSON Syntax Extension"],
            correct: 0
        },
        {
            question: "In React, how do you pass data from a parent to a child component?",
            options: ["Using State", "Using Refs", "Using Props", "Using Redux only"],
            correct: 2
        },
        {
            question: "Which command is used to create a new React app with Vite?",
            options: ["npm create vite@latest", "npx create-react-app", "npm start react", "create-vite-app"],
            correct: 0
        }
    ],
    backend: [
        {
            question: "Which of the following is a NoSQL database?",
            options: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"],
            correct: 2
        },
        {
            question: "What does the 'S' in REST stand for?",
            options: ["Simple", "State", "System", "Server"],
            correct: 1
        },
        {
            question: "Which Node.js module is used to handle file paths?",
            options: ["fs", "http", "path", "url"],
            correct: 2
        },
        {
            question: "What is the purpose of 'npm'?",
            options: ["Node Program Manager", "Node Package Manager", "New Project Maker", "Network Protocol Manager"],
            correct: 1
        },
        {
            question: "Which HTTP method is typically used to update an existing resource?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correct: 2
        }
    ],
    hr: [
        {
            question: "What is considered the best way to answer 'What is your greatest weakness?'",
            options: [
                "Saying you have no weaknesses.",
                "Mentioning a real weakness and how you are working to improve it.",
                "Giving a fake weakness like 'I work too hard'.",
                "Talking about a personal weakness unrelated to work."
            ],
            correct: 1
        },
        {
            question: "What does the STAR method stand for in interviews?",
            options: [
                "Start, Task, Action, Result",
                "Situation, Task, Action, Result",
                "Situation, Time, Action, Review",
                "Strength, Talent, Ability, Role"
            ],
            correct: 1
        },
        {
            question: "When should you ask about the salary during the interview process?",
            options: [
                "In the first 5 minutes.",
                "After the employer brings it up or at the end of the final interview.",
                "Never, just wait for the offer.",
                "Before the interview starts."
            ],
            correct: 1
        },
        {
            question: "Why do employers ask 'Why do you want to work here?'",
            options: [
                "To see if you have researched the company.",
                "To check if you are desperate for any job.",
                "To see if you like the office building.",
                "To know your favorite color."
            ],
            correct: 0
        },
        {
            question: "What is the ideal length for a typical elevator pitch?",
            options: ["10 seconds", "30-60 seconds", "5 minutes", "15 minutes"],
            correct: 1
        }
    ]
};

export default function MockInterview() {
    const [selectedRole, setSelectedRole] = useState(null);
    const [currentStep, setCurrentStep] = useState(0); // 0 to 4
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showFinalScore, setShowFinalScore] = useState(false);

    const startInterview = (role) => {
        setSelectedRole(role);
        setCurrentStep(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowFinalScore(false);
    };

    const handleOptionSelect = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const submitAnswer = () => {
        if (selectedOption === null) return;

        const currentQuestion = QUESTIONS[selectedRole][currentStep];
        if (selectedOption === currentQuestion.correct) {
            setScore(prev => prev + 1);
        }
        setIsAnswered(true);
    };

    const nextQuestion = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowFinalScore(true);
        }
    };

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid mock-interview">
                <h1 className="text-center mb-5">AI Mock Interview (MCQ Mode)</h1>

                {!selectedRole ? (
                    <div className="role-selection container">
                        <h3 className="text-center mb-4">Choose your Interview Category</h3>
                        <div className="row justify-content-center">
                            {['frontend', 'backend', 'hr'].map(role => (
                                <div key={role} className="col-md-4 mb-3">
                                    <div className="card text-center p-4 h-100 shadow-sm" style={{ cursor: 'pointer' }} onClick={() => startInterview(role)}>
                                        <div className="card-body">
                                            <h3 className="text-capitalize">{role} Questions</h3>
                                            <p className="text-muted">Test your knowledge with 5 specialized MCQ questions.</p>
                                            <button className="btn custom-btn mt-3 w-100">Start Quiz</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : showFinalScore ? (
                    <div className="interview-card text-center p-5">
                        <h2 className="mb-4">Interview Complete!</h2>
                        <div className="display-4 mb-4">
                            Your Score: <span className={score >= 3 ? "text-success" : "text-danger"}>{score}/5</span>
                        </div>
                        <p className="lead mb-4">
                            {score === 5 ? "Perfect! You're ready for the real thing." :
                                score >= 3 ? "Good job! A little more practice and you'll be perfect." :
                                    "Don't worry, keep practicing to improve your technical knowledge."}
                        </p>
                        <button className="btn custom-btn btn-lg" onClick={() => setSelectedRole(null)}>
                            Try Another Category
                        </button>
                    </div>
                ) : (
                    <div className="interview-card">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="text-capitalize text-primary m-0">{selectedRole} Quiz</h4>
                            <span className="badge bg-secondary">Question {currentStep + 1}/5</span>
                        </div>

                        <div className="question-box mb-4">
                            <h3>{QUESTIONS[selectedRole][currentStep].question}</h3>
                        </div>

                        <div className="options-list d-grid gap-3 mb-4">
                            {QUESTIONS[selectedRole][currentStep].options.map((option, index) => {
                                let variant = "btn-outline-primary";
                                if (isAnswered) {
                                    if (index === QUESTIONS[selectedRole][currentStep].correct) {
                                        variant = "btn-success";
                                    } else if (index === selectedOption) {
                                        variant = "btn-danger";
                                    } else {
                                        variant = "btn-light";
                                    }
                                } else if (selectedOption === index) {
                                    variant = "btn-primary";
                                }

                                return (
                                    <button
                                        key={index}
                                        className={`btn ${variant} text-start p-3`}
                                        onClick={() => handleOptionSelect(index)}
                                        disabled={isAnswered}
                                    >
                                        {String.fromCharCode(65 + index)}. {option}
                                    </button>
                                );
                            })}
                        </div>

                        {isAnswered && (
                            <div className={`alert ${selectedOption === QUESTIONS[selectedRole][currentStep].correct ? 'alert-success' : 'alert-danger'} mb-4`}>
                                {selectedOption === QUESTIONS[selectedRole][currentStep].correct ? (
                                    <strong>Correct! Well done.</strong>
                                ) : (
                                    <>
                                        <strong>Wrong Answer.</strong> The correct answer was: {QUESTIONS[selectedRole][currentStep].options[QUESTIONS[selectedRole][currentStep].correct]}
                                    </>
                                )}
                            </div>
                        )}

                        <div className="text-end">
                            {!isAnswered ? (
                                <button
                                    className="btn custom-btn btn-lg"
                                    onClick={submitAnswer}
                                    disabled={selectedOption === null}
                                >
                                    Check Answer
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={nextQuestion}
                                >
                                    {currentStep < 4 ? "Next Question" : "Finish Interview"} <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
