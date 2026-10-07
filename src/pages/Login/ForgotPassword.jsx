import React, { useState } from "react";
import "../../CSS/Login.css";
import logoImg from "../../assest/favicon.png";
import rightImg from "../../assest/img.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()


    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <div className="login-logo" onClick={() => navigate("/")}>
                    {/* <img src={logoImg} alt="Complete Prep Logo" className="logo-img mb-5 cursor-pointer" /> */}
                    {/* <h6 className="logo-title mb-5">Complete Prep</h6> */}
                </div>
                <div className="login-content">
                    <h5>Forgot Password</h5>
                    <p>It happens ! Reset your password here.</p>

                    <form className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email address*</label>
                            <input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <button type="submit" className="login-btn" onClick={() => navigate('/forgot-password/otp')}>Send OTP</button>
                    </form>
                </div>
            </div>

            {/* Right Section */}
            {/* <div className="login-right">
                <img src={rightImg} alt="Welcome Illustration" className="right-img" />
            </div> */}
        </div>
    );
};

export default ForgotPassword;
