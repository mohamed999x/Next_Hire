import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './CompanyPage.css';
import axios from 'axios';

export default function CompanyPage({ userData }) {
    const [job, setJob] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: ''
    });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const companyId = localStorage.getItem("company-id"); // Replace with the correct property if needed

        if (!companyId) {
            alert("Company ID is missing!");
            return;
        }

        try {
            // MOCK BACKEND
            await new Promise(resolve => setTimeout(resolve, 500));

            const newJob = {
                jobId: Date.now().toString(),
                companyId: companyId,
                title: job.title,
                description: job.description,
                location: job.location,
                type: 'Full-time', // Defaulting for now
                salaryRange: job.salaryRange,
                postedDate: new Date().toISOString(),
                company: "My Company (Mock)" // In a real app key this off companyId
            };

            const existingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
            existingJobs.push(newJob);
            localStorage.setItem('jobs', JSON.stringify(existingJobs));

            console.log('Job posted (Mock):', newJob);
            alert("Job posted successfully (Mocked)!");

            // Clear form
            setJob({ title: '', description: '', location: '', salaryRange: '' });

        } catch (error) {
            console.error('Error posting job:', error);
            alert("Failed to post job.");
        }
    };

    return (
        <div className="container-fluid p-0">
            <Header userData={userData} />
            <div className="container-fluid">
                <div className="company-page">
                    <h2 className="my-4">Post a Job</h2>
                    <form onSubmit={handleSubmit} className="job-post-form">
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={job.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={job.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={job.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Salary Range</label>
                            <input
                                type="text"
                                name="salaryRange"
                                className="form-control"
                                value={job.salaryRange}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn custom-btn">Post Job</button>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}
