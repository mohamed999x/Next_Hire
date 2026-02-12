import React, { useState, createContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export const TheUserContext = createContext();

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [compImage, setCompImage] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // ✅ تمت الإضافة هنا
  const [likedJobs, setLikedJobs] = useState([]);

  const toggleLikeJob = (job) => {
    setLikedJobs((prev) => {
      const alreadyLiked = prev.find((j) => j.jobId === job.jobId);
      if (alreadyLiked) {
        return prev.filter((j) => j.jobId !== job.jobId);
      } else {
        return [...prev, job];
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value.trim();
    setSearchQuery(searchInput);
  };

  const filterByCategory = (jobs, category) => {
    if (!category) return jobs;

    const lowerCategory = category.toLowerCase();

    const keywordsMap = {
      it: ["frontend", "front-end", "backend", "back-end", "network", "server", "fullstack", "devops", "software", "web", "it"],
      medicine: ["nurse", "doctor", "medical", "clinic", "surgeon", "dentist"],
      engineering: ["mechanical", "civil", "architecture", "engineer", "electrical", "construction"],
    };

    const keywords = keywordsMap[lowerCategory];
    if (!keywords) return jobs;

    return jobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";
      return keywords.some(keyword => title.includes(keyword));
    });
  };

  function saveUserData() {
    let encodedToken = localStorage.getItem("token");
    let company_Id = localStorage.getItem("companyId");
    setCompanyId(company_Id);

    if (!encodedToken) return;

    try {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
      console.log(userData);
      console.log(companyId);
    } catch (error) {
      console.warn("Invalid Token (Mock Mode?):", error);
      // Fallback for Mock Mode
      if (encodedToken.startsWith("mock-jwt-token")) {
        const mockUser = JSON.parse(localStorage.getItem('user'));
        setUserData(mockUser || { name: 'Mock User', role: 'Employee' });
      }
    }
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        // MOCK BACKEND
        await new Promise(resolve => setTimeout(resolve, 500));

        // Default Mock Jobs
        const defaultJobs = [
          {
            jobId: '1',
            title: 'Frontend Developer',
            company: 'Tech Corp',
            location: 'Remote',
            type: 'Full-time',
            description: 'We are looking for a skilled Frontend Developer to join our team. Must have experience with React and modern CSS.'
          },
          {
            jobId: '2',
            title: 'Backend Engineer',
            company: 'Data Systems',
            location: 'New York',
            type: 'Part-time',
            description: 'Seeking a Backend Engineer proficient in Node.js and database management.'
          },
          {
            jobId: '3',
            title: 'UI/UX Designer',
            company: 'Creative Agency',
            location: 'London',
            type: 'Contract',
            description: 'Creative UI/UX Designer needed for a short-term project. Portfolio required.'
          }
        ];

        // Load posted jobs from localStorage
        const postedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');

        // Combine them
        const allJobs = [...defaultJobs, ...postedJobs];

        setJobs(allJobs);
      } catch (error) {
        setJobsError("Failed to fetch jobs");
        console.error(error);
      } finally {
        setIsJobsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <TheUserContext.Provider
      value={{
        saveUserData,
        setUserData,
        userData,
        companyId,
        setCompanyId,
        compImage,
        setCompImage,
        jobs,
        setJobs,
        isJobsLoading,
        jobsError,
        searchQuery,
        setSearchQuery,
        handleSearch,
        filterByCategory,
        selectedCategory,          // ✅ الإتاحة داخل الـ context
        setSelectedCategory,
        likedJobs,
        toggleLikeJob
      }}
    >
      {children}
    </TheUserContext.Provider>
  );
}
