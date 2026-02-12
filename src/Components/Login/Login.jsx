import React, { useState, useEffect, useContext, useRef } from 'react'
import { TheUserContext } from '../UserContext/UserContext'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./Login.css"
import loginImage from "../../assets/0002_1_explore-how-the-fast-paced-digital-revol_41pgg1YCT6WgD7h_l4EPKQ_CBbx0yxyRnirBWGDA1nx3g_cover.jpeg"
import { Link, useNavigate } from 'react-router-dom'
import "../RegisterEmployee/RegisterEmployee.css";
import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import axios from 'axios';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

export default function Login() {
    const { saveUserData, compImage, setCompImage } = useContext(TheUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let [messageError, setMessageErro] = useState('');
    let [userType, setUserType] = useState("");
    let [userImage, setuserImage] = useState("");

    // Face Auth State
    const webcamRef = useRef(null);
    const [isModelsLoaded, setIsModelsLoaded] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const [isFaceVerified, setIsFaceVerified] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'failed'

    useEffect(() => {
        console.log("Loading state changed:", isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (compImage) {
            console.log("Updated company image:", compImage);
        }
    }, [compImage]);

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            try {
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
                ]);
                setIsModelsLoaded(true);
                console.log("FaceAPI Models Loaded");
            } catch (err) {
                console.error("Error loading models", err);
            }
        };
        loadModels();
    }, []);


    function getUserType(event) {
        const value = event.target.value;
        setUserType(value);
        if (value === "Employee") {
            setuserImage("GetEmployeeImage");
        } else if (value === "Companies") {
            setuserImage("GetCompanyImage");
        }
    }

    const verifyFace = async () => {
        if (!formik.values.email) {
            setMessageErro("Please enter your email first.");
            return;
        }

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        const img = new Image();
        img.src = imageSrc;
        img.onload = async () => {
            try {
                const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

                if (detection) {
                    const existingUsers = JSON.parse(localStorage.getItem('face_descriptors') || '[]');
                    const userFaceData = existingUsers.find(u => u.label === formik.values.email);

                    if (userFaceData) {
                        const distance = faceapi.euclideanDistance(detection.descriptor, userFaceData.descriptor);
                        if (distance < 0.6) {
                            setIsFaceVerified(true);
                            setVerificationStatus('success');
                            setShowWebcam(false);
                            setMessageErro("");
                        } else {
                            setVerificationStatus('failed');
                            setMessageErro("Face not recognized. Please try again.");
                        }
                    } else {
                        // If no face data found for this email, maybe we allow login? 
                        // But for this feature request, we assume we should verify everyone who has registered via our new flow.
                        // Or strict mode:
                        setMessageErro("No face data found for this user. Please contact support.");
                        setShowWebcam(false);
                    }

                } else {
                    setMessageErro("No face detected.");
                }

            } catch (err) {
                console.error(err);
                setMessageErro("Verification error.");
            }
        };
    };


    async function handleLogin(values) {
        // Enforce Face Verification for Employees
        if (userType === "Employee") {
            const existingUsers = JSON.parse(localStorage.getItem('face_descriptors') || '[]');
            const userFaceData = existingUsers.find(u => u.label === values.email);

            if (userFaceData && !isFaceVerified) {
                setMessageErro("Please verify your face before logging in.");
                return;
            }
        }

        setIsLoading(true);

        try {
            // MOCK BACKEND: Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // SIMULATED LOGIN
            const usersJson = localStorage.getItem('users');
            console.log("Raw Users in LocalStorage:", usersJson);

            const users = JSON.parse(usersJson || '[]');
            console.log("Parsed Users:", users);
            console.log("Attempting Login with:", values.email, values.password);

            const user = users.find(u => {
                const emailMatch = u.email?.toLowerCase() === values.email?.toLowerCase();
                const passMatch = u.password === values.password;
                return emailMatch && passMatch;
            });

            if (user) {
                const data = {
                    token: "mock-jwt-token-" + Date.now(),
                    user: {
                        email: user.email,
                        employeeId: user.id
                    },
                };

                setMessageErro("Login Successful (Mocked)");
                console.log("Mock Login Response:", data);

                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    if (data.user?.employeeId) {
                        localStorage.setItem("employee-id", data.user.employeeId);
                    }
                    saveUserData();
                    navigate("/");
                }
            } else {
                throw { response: { data: "Invalid email or password", status: 401 } };
            }

        } catch (error) {
            console.error("Login Implementation Error:", error);
            if (error.response) {
                setMessageErro(error.response.data);
            } else if (error instanceof SyntaxError) {
                setMessageErro("Local storage data is corrupted. Please clear your browser cache.");
            } else {
                setMessageErro(`Login failed: ${error.message || "Unknown error"}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    async function getImage(compId) {
        try {
            const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'https://localhost:7209';
            const response = await axios.get(
                `${API_BASE_URL}/api/${userType}/${compId}/${userImage}`,
                {
                    responseType: 'blob', // مهم جداً
                }
            );
            // تحويل الصورة لشيء يمكن استخدامه كـ src في <img>
            const imageUrl = URL.createObjectURL(response.data);
            setCompImage(imageUrl);
            console.log("Image URL:", imageUrl);
            return imageUrl;
        } catch (error) {
            console.log("Server returned:", error.response?.data || error.message);
            alert("Something went wrong. Please try again.");
            return null;
        }
    }
    const validation = Yup.object({
        email: Yup.string()
            .required("Email is required")
            .email("Email is not valid!"),
        password: Yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase..."),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validation,
        onSubmit: handleLogin,
    });
    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid">
                <div className="hero d-flex justify-content-center align-items-center gap-4">
                    <div className="image">
                        <img className='w-100' src={loginImage} alt="" />
                    </div>
                    <div className="info d-flex flex-column align-items-center justify-content-center gap-5">
                        <div className="inf w-50">
                            <h3 className='fs-2'>Log in to Exclusive</h3>
                            {messageError && (
                                <div className="alert alert-danger">
                                    {messageError}
                                </div>
                            )}
                            <p className='text-start fs-6'>Enter you details below</p>
                        </div>
                        <form
                            className='w-100 d-flex flex-column align-items-center justify-content-center'
                            onSubmit={formik.handleSubmit}>
                            {/* Email */}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="email"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                placeholder='Enter your Email'
                            />
                            {formik.errors.email && formik.touched.email && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.email)}
                                </div>
                            )}

                            {/* Password */}
                            <input
                                autoComplete="current-password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="password"
                                name="password"
                                id="password"
                                value={formik.values.Password}
                                placeholder='Password'
                            />
                            {formik.errors.password && formik.touched.password && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.password)}
                                </div>
                            )}
                            {/* user type */}
                            <div className="type d-flex justify-conent-center align-items-center gap-3">
                                <p className="m-0">User: </p>

                                <div className="employee">
                                    <label htmlFor="employee">Employee</label>
                                    <input
                                        type="radio"
                                        name="user"
                                        value="Employee"
                                        id="employee"
                                        checked={userType === "Employee"}
                                        onChange={getUserType}
                                    />
                                </div>

                                <div className="company">
                                    <label htmlFor="company">Company</label>
                                    <input
                                        type="radio"
                                        name="user"
                                        value="Companies"
                                        id="company"
                                        checked={userType === "Companies"}
                                        onChange={getUserType}

                                    />
                                </div>
                            </div>

                            {/* Face Verification Button for Employees */}
                            {userType === "Employee" && (
                                <div className="w-100 d-flex flex-column align-items-center mt-3">
                                    {!isFaceVerified ? (
                                        <>
                                            {showWebcam ? (
                                                <div className="webcam-container mb-3 text-center">
                                                    {isModelsLoaded ? (
                                                        <>
                                                            <Webcam
                                                                audio={false}
                                                                ref={webcamRef}
                                                                screenshotFormat="image/jpeg"
                                                                width={320}
                                                                height={240}
                                                            />
                                                            <button type="button" className="btn btn-warning mt-2 w-100" onClick={verifyFace}>Verify Face</button>
                                                        </>
                                                    ) : (
                                                        <p>Loading models...</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <button type="button" className="btn btn-outline-dark mb-2" onClick={() => setShowWebcam(true)}>
                                                    Verify Face Login
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <div className="alert alert-success w-50">Face Verified! ✅</div>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="inf_btn">
                                {isLoading ? (
                                    <button className='regist-hero' type='button'>
                                        <div>Loadin...</div>
                                    </button>
                                ) : (
                                    <button
                                        disabled={!(formik.isValid && formik.dirty)}
                                        className='regist-hero'
                                        type='submit'
                                    >
                                        Login
                                    </button>
                                )}
                                <Link id='link-to-register' to={"/register"}>Don't have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
