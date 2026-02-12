import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/about.png";
import servicePhoto from "../../assets/a-photo-of-a-clean-bright-office-setting_m4_4ai0-SV2KjF8Lscj0WA_GV6_BveTQ0i4wBnTLBVKmQ.jpeg";
import servicePhoto2 from "../../assets/a-realistic-slider-image-representing-mo_Oz4-JYMuSM6ZM2vaRGaCPg_GV6_BveTQ0i4wBnTLBVKmQ.jpeg";
import "./About.css";

export default function About() {
  return (
    <>
      <div className="container-fluid p-0">
        <Header />
        <div className="container-fluid">
          <div className="hero d-flex justify-content-center align-items-center">
            <div className="image move">
              <img className="w-100" src={aboutImage} alt="" />
            </div>
            <div className="info">
              <h1>About Us</h1>
              <p className="special-paragraph">
                We are a passionate team of university students who came
                together for our graduation project with one goal in mind — to
                make job searching and hiring faster, easier, and more efficient
                for everyone. Our project, Jobify, is a modern Next Hire
                platform designed to connect job seekers and employers in a
                smart, user-friendly way. With Jobify, job seekers can quickly
                find opportunities that match their skills and interests, while
                employers can post jobs and discover the right candidates
                without the usual hassle. We focused on creating a clean,
                responsive design and a smooth user experience to ensure that
                both sides of the hiring process are supported. This project
                represents months of dedication, collaboration, and a shared
                vision to solve real-world problems through technology. We're
                proud to present Jobify as a reliable, practical tool that helps
                bridge the gap between talent and opportunity.
              </p>
              <Link to={"/login"}>Contact Us</Link>
            </div>
          </div>
          <div className="service d-flex">
            <div className="image w-50">
              <img className="w-100" src={servicePhoto} alt="" />
            </div>
            <div className="image w-50">
              <img className="w-100" src={servicePhoto2} alt="" />
            </div>
          </div>
          <div className="theproperties">
            <h2>Properties</h2>
            <div className="properties">
              <div className="property">
                <i className="fa-solid fa-earth-americas"></i>
                <div className="inf">
                  <h3>Globally</h3>
                  <p>You can use it in any country in the world</p>
                </div>
              </div>
              <div className="property">
                <div className="proper">
                  <i class="fa-solid fa-x"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                </div>
                <div className="inf">
                  <h3>Free</h3>
                  <p>
                    You're not forced to subscribe in paid plans to get better
                    chances for getting jobs
                  </p>
                </div>
              </div>
              <div className="property">
                <i class="fa-solid fa-thumbs-up"></i>
                <div className="inf">
                  <h3>New</h3>
                  <p>You don't worry about competitors</p>
                </div>
              </div>
              <div className="property">
                <i class="fa-solid fa-person-chalkboard"></i>
                <div className="inf">
                  <h3>Communication</h3>
                  <p>
                    Due to the limited number of users comparing to other
                    similar platforms, you can contact with us easily and fast
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="theproperties">
            <h2>Services</h2>
            <div className="properties">
              <div className="property">
                <i className="fa-solid fa-laptop"></i>
                <div className="inf">
                  <h3>Post Jobs</h3>
                  <p>
                    <Link to="/companypage" style={{ textDecoration: 'none', color: '#777' }}>
                      Employers can post jobs easily
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-magnifying-glass"></i>
                <div className="inf">
                  <h3>Filter By Search</h3>
                  <p>
                    <Link to="/alljobs" style={{ textDecoration: 'none', color: '#777' }}>
                      User can search for the needed job and filter the results
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-file"></i>
                <div className="inf">
                  <h3>CV Creation</h3>
                  <p>
                    <Link to="/cvbuilder" style={{ textDecoration: 'none', color: '#777' }}>
                      We offer CV Creation page to help you reach fast and save your time
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-gauge-simple-high"></i>
                <div className="inf">
                  <h3>Internet Speed</h3>
                  <p>
                    <Link to="/internetspeed" style={{ textDecoration: 'none', color: '#777' }}>
                      Check your internet speed to ensure a smooth experience
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-user-shield"></i>
                <div className="inf">
                  <h3>Face ID</h3>
                  <p>
                    Secure and fast authentication using advanced facial recognition
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-microphone-lines"></i>
                <div className="inf">
                  <h3>Interview Practice</h3>
                  <p>
                    <Link to="/mock-interview" style={{ textDecoration: 'none', color: '#777' }}>
                      Practice with our AI-powered mock interview simulator
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-map-location-dot"></i>
                <div className="inf">
                  <h3>Career Roadmap</h3>
                  <p>
                    <Link to="/career-roadmap" style={{ textDecoration: 'none', color: '#777' }}>
                      Get a personalized AI learning path to your dream job
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <div className="inf">
                  <h3>Branding Assistant</h3>
                  <p>
                    <Link to="/branding-assistant" style={{ textDecoration: 'none', color: '#777' }}>
                      Optimize your professional bio and LinkedIn headline with AI
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-file-circle-check"></i>
                <div className="inf">
                  <h3>Resume Scorer</h3>
                  <p>
                    <Link to="/resume-matcher" style={{ textDecoration: 'none', color: '#777' }}>
                      Match your resume against job descriptions to pass ATS filters
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-graduation-cap"></i>
                <div className="inf">
                  <h3>Skill-Up Connector</h3>
                  <p>
                    <Link to="/resume-matcher" style={{ textDecoration: 'none', color: '#777' }}>
                      Get instant learning resources to bridge your skill gaps
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-hammer"></i>
                <div className="inf">
                  <h3>Portfolio Generator</h3>
                  <p>
                    <Link to="/resume-matcher" style={{ textDecoration: 'none', color: '#777' }}>
                      Get customized project ideas to prove your "Missing Skills"
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-file-signature"></i>
                <div className="inf">
                  <h3>Cover Letter Architect</h3>
                  <p>
                    <Link to="/cover-letter" style={{ textDecoration: 'none', color: '#777' }}>
                      Generate high-converting, tailored cover letters instantly
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-crystal-ball text-info"></i>
                <div className="inf">
                  <h3>Pivot Predictor</h3>
                  <p>
                    <Link to="/pivot-predictor" style={{ textDecoration: 'none', color: '#777' }}>
                      AI-driven career risk analysis and strategic transition roadmap
                    </Link>
                  </p>
                </div>
              </div>
              <div className="property">
                <i className="fa-solid fa-scale-balanced text-success"></i>
                <div className="inf">
                  <h3>Offer Calculator</h3>
                  <p>
                    <Link to="/offer-calculator" style={{ textDecoration: 'none', color: '#777' }}>
                      Analyze and compare multiple job offers for "Total Life Value"
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
