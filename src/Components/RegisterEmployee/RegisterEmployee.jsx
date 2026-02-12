import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "../Login/Login.css";
import "./RegisterEmployee.css";
import loginImage from "../../assets/0002_1_explore-how-the-fast-paced-digital-revol_41pgg1YCT6WgD7h_l4EPKQ_CBbx0yxyRnirBWGDA1nx3g_cover.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

export default function RegisterEmployee() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    let [messageError, setMessageErro] = useState('');

    // Face Recognition State
    const webcamRef = useRef(null);
    const [isModelsLoaded, setIsModelsLoaded] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [faceDescriptor, setFaceDescriptor] = useState(null);
    const [isFaceUnique, setIsFaceUnique] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);

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
                setMessageErro("Error loading Face Recognition models. Please refresh.");
            }
        };
        loadModels();
    }, []);

    // Check if face is unique
    const checkFaceUniqueness = async (descriptor) => {
        const existingUsers = JSON.parse(localStorage.getItem('face_descriptors') || '[]');
        if (existingUsers.length === 0) return true;

        const faceMatcher = new faceapi.FaceMatcher(
            existingUsers.map(u => new faceapi.LabeledFaceDescriptors(u.label, [new Float32Array(u.descriptor)]))
        );

        const bestMatch = faceMatcher.findBestMatch(descriptor);
        // If match distance is below threshold (default 0.6), it's a match.
        // bestMatch.label will be 'unknown' if no match found.
        if (bestMatch.label !== 'unknown') {
            setMessageErro(`Face already registered as ${bestMatch.label}`);
            return false;
        }
        return true;
    };

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) return;

        // Create an HTMLImageElement from the base64 string
        const img = new Image();
        img.src = imageSrc;
        img.onload = async () => {
            try {
                const updatedDetections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

                if (updatedDetections) {
                    const isUnique = await checkFaceUniqueness(updatedDetections.descriptor);
                    if (isUnique) {
                        setCapturedImage(imageSrc);
                        setFaceDescriptor(Array.from(updatedDetections.descriptor)); // Convert Flash32Array to Array for storage
                        setIsFaceUnique(true);
                        setShowWebcam(false);

                        // Set Formik field
                        // Convert base64 to file
                        fetch(imageSrc)
                            .then(res => res.blob())
                            .then(blob => {
                                const file = new File([blob], "face_capture.jpg", { type: "image/jpeg" });
                                formik.setFieldValue("image", file);
                            });

                        setMessageErro(""); // Clear errors
                    } else {
                        setIsFaceUnique(false);
                    }
                } else {
                    setMessageErro("No face detected. Please try again.");
                }
            } catch (err) {
                console.error(err);
                setMessageErro("Error detecting face.");
            }
        };
    };


    async function handleRegisterEmployee(values) {
        if (!isFaceUnique) {
            setMessageErro("Please capture and verify your face first.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("FullName", values.FullName);
        formData.append("Email", values.Email);
        formData.append("Password", values.Password);
        formData.append("image", values.image); // This is now the captured face image

        // Log only readable data
        console.log("FormData being sent:", {
            FullName: values.FullName,
            Email: values.Email,
            Password: values.Password,
            imageName: values.image?.name,
        });

        try {
            // MOCK BACKEND: Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // SIMULATED REGISTRATION
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.some(u => u.email === values.Email);

            if (userExists) {
                throw { response: { data: "Email already exists", status: 409 } };
            }

            // Create new user (Simulate Backend Logic)
            const newUser = {
                id: Date.now().toString(),
                fullName: values.FullName,
                email: values.Email,
                password: values.Password, // In real app, hash this!
                role: 'Employee'
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Save Face Descriptor (Already handled below, but ensuring consistency)
            const existingFaceData = JSON.parse(localStorage.getItem('face_descriptors') || '[]');
            existingFaceData.push({
                label: values.Email,
                descriptor: faceDescriptor
            });
            localStorage.setItem('face_descriptors', JSON.stringify(existingFaceData));

            setMessageErro("Employee registered successfully (Mocked).");
            navigate("/login");

        } catch (error) {
            console.error("Registration Error:", error);
            if (error.response) {
                setMessageErro(`Error: ${error.response.data}`);
            } else {
                setMessageErro("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const validation = Yup.object({
        FullName: Yup.string()
            .required("FullName is required")
            .min(6, "minimum length is 6")
            .max(30, "maximum length is 30, you can try your nick name instead!"),
        Email: Yup.string()
            .required("Email is required")
            .email("Email is not valid!"),
        Password: Yup.string()
            .required("Password is required")
            .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase..."),
    });

    const formik = useFormik({
        initialValues: {
            FullName: "",
            Email: "",
            Password: "",
            image: "",
        },
        validationSchema: validation,
        onSubmit: handleRegisterEmployee,
    });

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid">
                <div className="hero d-flex justify-content-center align-items-center gap-4">
                    <div className="image">
                        <img className='w-100' src={loginImage} alt="login" />
                    </div>
                    <div className="info d-flex flex-column align-items-center justify-content-center gap-5">
                        <div className="inf w-50">
                            <h3 className='fs-2'>Sign Up As An Employee</h3>
                            {messageError && (
                                <div className="alert alert-danger">
                                    {messageError}
                                </div>
                            )}
                            <p className='text-start fs-6'>Enter your details below</p>
                        </div>
                        <form
                            className='w-100 d-flex flex-column align-items-center justify-content-center'
                            onSubmit={formik.handleSubmit}
                        >
                            {/* FullName */}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="text"
                                name="FullName"
                                id="FullName"
                                value={formik.values.FullName}
                                placeholder='FullName'
                            />
                            {formik.errors.FullName && formik.touched.FullName && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.FullName)}
                                </div>
                            )}

                            {/* Email */}
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="email"
                                name="Email"
                                id="Email"
                                value={formik.values.Email}
                                placeholder='Enter your Email'
                            />
                            {formik.errors.Email && formik.touched.Email && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.Email)}
                                </div>
                            )}

                            {/* Password */}
                            <input
                                autoComplete="current-password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className='input-data m-4'
                                type="password"
                                name="Password"
                                id="Password"
                                value={formik.values.Password}
                                placeholder='Password'
                            />
                            {formik.errors.Password && formik.touched.Password && (
                                <div className="alert alert-danger w-50">
                                    {String(formik.errors.Password)}
                                </div>
                            )}

                            {/* Image Upload / Face Capture */}
                            <div className="d-flex flex-column align-items-center mb-3">
                                <label className="mb-2">Face Verification (Required)</label>
                                {!capturedImage ? (
                                    <>
                                        {showWebcam ? (
                                            <div className="webcam-container mb-3" style={{ border: '2px solid #ccc' }}>
                                                {isModelsLoaded ? (
                                                    <>
                                                        <Webcam
                                                            audio={false}
                                                            ref={webcamRef}
                                                            screenshotFormat="image/jpeg"
                                                            width={320}
                                                            height={240}
                                                        />
                                                        <button type="button" className="btn btn-primary mt-2 w-100" onClick={capture}>Capture & Verify</button>
                                                    </>
                                                ) : (
                                                    <p>Loading Face Recognition Models...</p>
                                                )}
                                            </div>
                                        ) : (
                                            <button type="button" className="btn btn-outline-primary mb-3" onClick={() => setShowWebcam(true)}>
                                                Check Camera & Verify Face
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className="mb-3 text-center">
                                        <img src={capturedImage} alt="Captured Face" width="100" height="100" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                                        <p className="text-success mt-1">Face Verified!</p>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => { setCapturedImage(null); setIsFaceUnique(false); setShowWebcam(true); }}>Retake</button>
                                    </div>
                                )}

                                <input
                                    className='d-none' // Hide the original file input as we use webcam
                                    onChange={(event) => {
                                        formik.setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="inf_btn">
                                {isLoading ? (
                                    <button className='regist-hero' type='button'>
                                        <div>Loading...</div>
                                    </button>
                                ) : (
                                    <button
                                        disabled={!(formik.isValid && formik.dirty && isFaceUnique)}
                                        className='regist-hero'
                                        type='submit'
                                    >
                                        Sign Up
                                    </button>
                                )}
                                <Link id='link-to-register' to={"/register"}>Are you a company?</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
