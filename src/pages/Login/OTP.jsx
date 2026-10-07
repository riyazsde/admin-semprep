import React, { useState } from "react";
import "../../CSS/Login.css";
import logoImg from "../../assest/favicon.png";
import rightImg from "../../assest/img.png";
import { useNavigate } from "react-router-dom";

const OTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Ensure only numbers are allowed

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && !otp[index] && event.target.previousSibling) {
            event.target.previousSibling.focus();
        }
    };

    const navigate = useNavigate()


    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <div className="login-logo" onClick={() => navigate("/")}>

                    {/* <img src={logoImg} alt="Complete Prep Logo" className="logo-img mb-5 cursor-pointer" /> */}

                    {/* <h6 className="logo-title">Complete Prep</h6> */}
                </div>
                <div className="login-content">
                    <h5>OTP</h5>

                    <form className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Please enter your OTP here</label>
                            <div className="otp-input-group">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="otp-input"
                                        value={data}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="login-btn" onClick={() => navigate('/forgot-password/otp/set-password')}>Verify OTP</button>
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

export default OTP;
