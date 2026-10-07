import React, { useState } from "react";
import "../../CSS/Login.css";
import logoImg from "../../assest/favicon.png";
import rightImg from "../../assest/img.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Setpassword = () => {
    const [showPassword, setShowPassword] = useState(false);
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
                    <h5>Set your password </h5>

                    <form className="login-form">
                        <div className="input-group">
                            <label htmlFor="password">Create password*</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                </span>
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Re-enter password*</label>
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="login-btn" onClick={() => navigate('/')}>Set password</button>
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

export default Setpassword;
