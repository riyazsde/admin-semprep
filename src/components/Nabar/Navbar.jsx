import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

import img from "../../assest/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { endpoints } from "../../services/endPoints";
import { getRequest } from "../../services/apiService";

const Navbar = ({ toggleSidebar, text }) => {
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
      console.log(res || {});
      if (res) setData(res.data);
    });
  }, []);
  return (
    <>
      <div className="navbarcontainer">
        <div className="navbarleft">
          <div className="">
            {/* <IoSearch color="#718EBF" size={20} /> */}
            {/* <input type="search" placeholder="Search for something" /> */}
          </div>
        </div>
        <div className="navbarright">
          <div className="navbarsetting">
            <Link to="/notifications">
              {" "}
              <IoNotificationsOutline color="#FE5C73" size={20} />
            </Link>
          </div>
          <div className="navprofile" onClick={() => navigate("/profile")}>
            {data?.user?.image ? <img src={data?.user?.image} alt="" /> : <p className="profile-content">Admin</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
