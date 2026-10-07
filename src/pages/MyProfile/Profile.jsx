import React, { useEffect, useState } from "react";
import HOC from "../../components/HOC/HOC";
import { useNavigate } from "react-router-dom";
import img from "../../assest/profile.png";
import { useForm } from "../../services/exports";
import { getRequest, putRequest } from "../../services/apiService";
import { endpoints } from "../../services/endPoints";
import { updateUserProfileImage } from "../../services/exportFunctions";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getRequest({
      endpoint: endpoints.getUserProfile,
      setIsLoading,
    }).then((res) => {
      setData(res?.data);
    });
  }, []);

  useEffect(() => {
    if (data?.user) {
      setPreviewImage(data?.user?.image || img);
      Object.keys(data?.user).forEach((key) => {
        if(key==="password" || key==="confirmPassword") return
        setValue(key, data?.user[key] || "");
      });
    }
  }, [data, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
    const payload = new FormData();
    payload.append("image", file);
    updateUserProfileImage({
      data: payload,
      addFun: () => {
        getRequest({
          endpoint: endpoints.getUserProfile,
          setIsLoading,
        }).then((res) => {
          setData(res.data);
        });
      },
      id: data?.user?._id,
    });
  };

  const handleSubmitForm = (formData) => {
    const payload = {};
  
    
    Object.keys(formData).forEach((key) => {
      if (key !== "password" && key !== "confirmPassword" && formData[key] !== data?.user?.[key]) {
        payload[key] = formData[key];
      }
    });
  
    
    if (formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        payload.password = formData.password;
      } else {
        console.error("Passwords do not match");
        return;
      }
    }
  
    if (Object.keys(payload).length === 0) {
      console.log("No changes detected");
      return;
    }
  
    putRequest({
      endpoint: endpoints.updateUserProfile,
      data: payload,
      setIsLoading,
    }).then((res) => {
      console.log(res);
      setData(res?.data);
    });
  };

  const fieldLabels = {
  fullName: "Full Name",
  email: "Email",
  mobileNumber: "Mobile Number",
  password: "Password",
  confirmPassword: "Confirm Password",
};
  
  

  return (
    <div className="dashboardcontainer">
      <div className="dashboardcontainer-header">
        <h6>My Profile</h6>
      </div>
      <div className="profile-container">
        <div className="profile-image">
          <img
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            src={previewImage || img}
            alt="Profile"
            id="imgUpdate"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {/* <p>Edit</p> */}
        </div>
        <div className="profile-main">
          {[
            "fullName",
            "email",
            "mobileNumber",
            "password",
            "confirmPassword",
          ].map((field) => (
            <div key={field} className="profile-main-input">
              <label>{fieldLabels[field]}</label>
              <input type="text" {...register(field)} />
            </div>
          ))}
        </div>
        <div className="profile-btn">
          <button onClick={handleSubmit(handleSubmitForm)}>
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HOC(Profile);
