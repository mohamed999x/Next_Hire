import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import Trendings from '../Trendings/Trendings'
import "./AllJobs.css"
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { TheUserContext } from '../UserContext/UserContext'

export default function AllJobs() {
    const {searchQuery} = useContext(TheUserContext)
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showCheckInternet, setShowCheckInternet] = useState(false);
    const time = 2000;

    const btnClick = () => {
        if (count < 3) {
            setLoading(true);
            setTimeout(() => {
                setCount(prev => prev + 1);
                setLoading(false);
            }, time);
        } else {
            // لو وصل لـ 3 أو أكتر
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowCheckInternet(true);
            }, 5000);
        }
    };

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="container-fluid">
                <div className="all-jobs">
                    <div className="trendings text-center">
                        <h2>All jobs</h2>
                        <p>Find your suitable job in the all jobs here</p>

                        {/* التريندينجز */}
                        {[...Array(count)].map((_, i) => (
                            <Trendings key={i} number={localStorage.getItem("numberJobs")} search={searchQuery} category=""  />
                        ))}

                        {/* السبنر */}
                        {loading && (
                            <div className="thespinner my-3">
                                <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                            </div>
                        )}

                        {/* الزرار أو اللينك حسب الحالة */}
                        {!loading && !showCheckInternet && count < 4 && (
                            <button
                                onClick={btnClick}
                                className="my-3"
                                style={{ padding: "10px 20px" }}
                            >
                                View More
                            </button>
                        )}

                        {/* اللينك يظهر بعد التحميل الطويل */}
                        {!loading && showCheckInternet && (
                            <Link
                                to={"/internetspeed"}
                                rel="noopener noreferrer"
                                className="btn btn-outline-danger my-3"
                                style={{ padding: "10px 20px" }}
                            >
                                Check your internet speed
                            </Link>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
