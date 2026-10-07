import React, { useEffect, useState } from "react";
import "../../CSS/Login.css";
import logoImg from "../../assest/favicon.png";
import rightImg from "../../assest/img.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, useNavigate } from "../../services/exports";
import { showNotification } from "../../services/exportComponents";
import { login } from "../../services/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSubmit = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
      userType: data.userType,
    };
    login({ payload: payload, navigate });
    // navigate("/dashboard");
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo" onClick={() => navigate("/")}>
          {/* <img src={logoImg} alt="Complete Prep Logo" className="logo-img mb-5 cursor-pointer" /> */}
          {/* <h6 className="logo-title">Complete Prep</h6> */}
        </div>
        <div className="login-content">
          <h5>Welcome Back 👋</h5>
          <p>We are happy to have you back</p>

          <form className="login-form">
             <div className="input-group">
              <label>Select User Type *</label>
              <select {...register("userType", { required: true })}>
                <option value="">Select User Type</option>
                <option value="ADMIN">Admin</option>
                <option value="PARTNER">Employee</option>
                                <option value="USER">User</option>

              </select>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email address*</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <div className="input-group">
              <label htmlFor="password">Password*</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              </div>
            </div>
           
            <span
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
            </div>
            <button
              type="submit"
              className="login-btn"
              //   onClick={() => navigate("/dashboard")}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </button>
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

export default Login;
