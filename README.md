<p align="center">
  <img src="src/assets/1745237649662.png" alt="NextHire Logo" width="120"/>
</p>

<h1 align="center">🚀 NextHire — AI-Powered Career Platform</h1>

<p align="center">
  <strong>Your fastest way to find, prepare for, and land your dream job.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite 6"/>
  <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap" alt="Bootstrap 5"/>
  <img src="https://img.shields.io/badge/License-Private-red" alt="License"/>
</p>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Feature Details](#feature-details)
- [Routing & Navigation](#routing--navigation)
- [Authentication & Security](#authentication--security)
- [Author](#author)

---

## Overview

**NextHire** is a modern, AI-driven career platform built with React 19 and Vite. It combines intelligent job search with a powerful suite of AI career tools — from building professional CVs and cover letters, to mock interviews, career roadmaps, and offer analysis. The platform serves both **job seekers (employees)** and **employers (companies)**, providing a comprehensive hiring ecosystem.

---

## Features

NextHire ships with **13 core features** organized across three pillars:

### 🔍 Job Search & Management
| # | Feature | Description |
|---|---------|-------------|
| 1 | **Job Search & Listings** | Browse, search, and filter trending job listings with real-time search |
| 2 | **Job Details** | View detailed job information including requirements, salary, and company info |
| 3 | **Industry Management** | Add and manage industry categories for job classification |
| 4 | **Company Dashboard** | Employers can manage their profile and job postings |
| 5 | **Employee Dashboard** | Job seekers can manage their profile and applications |

### 🤖 AI-Powered Career Tools
| # | Feature | Description |
|---|---------|-------------|
| 6 | **AI CV Builder** | Build professional CVs with real-time scoring, PDF export, and image/certificate uploads |
| 7 | **AI Mock Interview** | Practice with MCQ-based interviews across Frontend, Backend, and HR categories with instant scoring |
| 8 | **AI Career Roadmap Generator** | Enter your dream job title and get a personalized step-by-step learning roadmap |
| 9 | **AI Resume Matcher** | Paste a job description and your resume — get a match score, missing skills, resources, and project ideas |
| 10 | **AI Cover Letter Architect** | Generate tailored cover letters with typing animation based on job description and your skills |
| 11 | **AI Personal Branding Assistant** | Optimize your LinkedIn bio/headline with Professional, Creative, and Minimalist style suggestions |
| 12 | **AI Pivot Predictor** | Analyze your career future — get automation risk assessment, emerging roles, and upskilling recommendations |
| 13 | **AI Offer-Weight Calculator** | Compare two job offers side-by-side across salary, growth, culture, benefits, and work-life balance |

### 🛠️ Utility Tools
| # | Feature | Description |
|---|---------|-------------|
| 14 | **Internet Speed Checker** | Test your internet download speed directly within the platform |
| 15 | **Face Recognition Login** | Biometric face verification using `face-api.js` and webcam during authentication |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 6 |
| **Routing** | React Router DOM v7 |
| **Styling** | Bootstrap 5, Font Awesome 6, Custom CSS |
| **Forms** | Formik + Yup validation |
| **HTTP Client** | Axios |
| **PDF Generation** | @react-pdf/renderer, jsPDF, html2canvas |
| **Face Recognition** | face-api.js + react-webcam |
| **Authentication** | JWT (jwt-decode) |
| **Linting** | ESLint 9 |

---

## Project Structure

```
NextHire/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images, logos, and media files
│   ├── Components/
│   │   ├── About/              # About page
│   │   ├── AllJobs/            # Job listings page
│   │   ├── CareerRoadmap/      # AI Career Roadmap Generator
│   │   ├── CompanyPage/        # Employer dashboard
│   │   ├── CoverLetterArchitect/ # AI Cover Letter Generator
│   │   ├── CVBuilder/          # AI CV Builder with PDF export
│   │   ├── EmployeePage/       # Employee dashboard
│   │   ├── ErrorBoundary/      # React error boundary
│   │   ├── Footer/             # Global footer
│   │   ├── Header/             # Navigation header
│   │   ├── Home/               # Landing page
│   │   ├── Industry/           # Industry management
│   │   ├── InternetSpeed/      # Internet speed checker
│   │   ├── JobDetails/         # Job detail view
│   │   ├── Login/              # Login with face recognition
│   │   ├── MockInterview/      # AI Mock Interview (MCQ)
│   │   ├── NotFound/           # 404 page
│   │   ├── OfferWeightCalculator/ # AI Offer Comparison Tool
│   │   ├── PersonalBrandingAssistant/ # AI Branding Assistant
│   │   ├── PivotPredictor/     # AI Career Pivot Predictor
│   │   ├── ProtectedRoute/     # Route guard component
│   │   ├── RegisterCompany/    # Company registration
│   │   ├── RegisterEmployee/   # Employee registration
│   │   ├── RegisterState/      # Registration type selector
│   │   ├── ResumeMatcher/      # AI Resume-Job Matcher
│   │   ├── Trendings/          # Trending jobs component
│   │   └── UserContext/        # Global user state (Context API)
│   ├── App.jsx                 # Root component with routing
│   └── App.css                 # Global styles
├── index.html                  # Entry HTML
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
└── eslint.config.js            # ESLint configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ recommended
- **npm** v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mohamed999x/Next_Hire.git

# 2. Navigate to the project directory
cd Next_Hire

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## Feature Details

### 1. 📝 AI CV Builder
Build professional CVs with a comprehensive form that includes:
- Personal information (name, email, phone, LinkedIn, GitHub)
- Work experience, education, and skills
- Profile photo and certificate image uploads
- **Real-time CV Score** — calculates completeness percentage with suggestions
- **PDF Export** — download your CV as a professionally formatted PDF using `@react-pdf/renderer`

### 2. 🎯 AI Mock Interview Simulator
Practice interviews with multiple-choice questions (MCQ):
- **3 Categories**: Frontend, Backend, and HR
- Immediate feedback on correct/incorrect answers
- Final score calculation with percentage
- Timed question flow with next/submit controls

### 3. 🗺️ AI Career Roadmap Generator
- Enter your dream job title (e.g., "Frontend Developer")
- AI generates a **5-step visual timeline roadmap** with icons
- Supports Frontend, Backend, and Full Stack paths
- Generative fallback for custom career goals

### 4. 📊 AI Resume Matcher
- Paste a **job description** and your **resume text**
- Calculates a **match percentage** based on skill detection
- Shows **matched skills** ✅ and **missing skills** ❌
- Provides **learning resources** with direct links for missing skills
- Suggests **project ideas** to build missing skills

### 5. ✉️ AI Cover Letter Architect
- Generates a professional cover letter from your skills and job description
- **Typing animation** effect for realistic letter generation
- Extracts job title, company name, and projected skills automatically
- One-click **copy to clipboard**

### 6. 🏷️ AI Personal Branding Assistant
- Input your current headline or bio
- Get **3 optimized versions**: Professional, Creative, and Minimalist
- Role and skill auto-detection from input text
- Copy any suggestion directly to clipboard

### 7. 🔮 AI Pivot Predictor
- Enter your current job role and years of experience
- Get **automation risk assessment** (Low / Medium / High)
- Discover **emerging alternative roles** with growth percentages
- Receive **upskilling recommendations** with links

### 8. ⚖️ AI Offer-Weight Calculator
- Compare **two job offers** side-by-side
- Rate each on: Salary, Growth, Culture, Benefits, Work-Life Balance
- Custom weight sliders for personal priorities
- Visual **weighted score comparison** with a clear winner

### 9. 🌐 Internet Speed Checker
- Download-speed test using image loading technique
- Animated speed counter display in Mbps
- Retest capability

---

## Routing & Navigation

| Path | Component | Protected |
|------|-----------|-----------|
| `/` | Home | ❌ |
| `/about` | About | ❌ |
| `/login` | Login | ❌ |
| `/register` | RegisterState | ❌ |
| `/registeremployee` | RegisterEmployee | ❌ |
| `/registeremployer` | RegisterCompany | ❌ |
| `/industry` | Industry | ❌ |
| `/alljobs` | AllJobs | ✅ |
| `/jobdetails` | JobDetails | ✅ |
| `/companypage` | CompanyPage | ❌ |
| `/employeepage` | EmployeePage | ❌ |
| `/cvbuilder` | CVBuilder | ✅ |
| `/mock-interview` | MockInterview | ✅ |
| `/career-roadmap` | CareerRoadmap | ✅ |
| `/resume-matcher` | ResumeMatcher | ✅ |
| `/cover-letter` | CoverLetterArchitect | ✅ |
| `/branding-assistant` | PersonalBrandingAssistant | ✅ |
| `/pivot-predictor` | PivotPredictor | ✅ |
| `/offer-calculator` | OfferWeightCalculator | ✅ |
| `/internetspeed` | InternetSpeedChecker | ✅ |
| `/*` | NotFound (404) | ❌ |

> ✅ = Requires authentication via `ProtectedRoute`

---

## Authentication & Security

- **JWT-based authentication** — tokens decoded via `jwt-decode`
- **Face Recognition Login** — optional biometric verification using `face-api.js` with webcam
- **Protected Routes** — AI tools and job features require authentication
- **User Context** — global state management via React Context API
- **Form Validation** — all forms validated with Formik + Yup schemas

---

## Author

**Mohamed AbdElhameed**

- GitHub: [@mohamed999x](https://github.com/mohamed999x)
- Project: [Next_Hire](https://github.com/mohamed999x/Next_Hire)

---

<p align="center">
  Made with ❤️ Mohamed AbdElhameed
</p>
