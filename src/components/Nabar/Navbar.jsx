import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiChevronDown, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { endpoints } from "../../services/endPoints";
import { getRequest } from "../../services/apiService";

const Navbar = ({ toggleSidebar, text }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getRequest({
      endpoint: endpoints.getUserProfile,
      setIsLoading,
    }).then((res) => {
      if (res) setData(res.data);
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = data?.user;
  const userName = user?.fullName || "Admin";
  const userRole = user?.userType || "User";
  const userEmail = user?.email || "admin@example.com";
  const initial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <header className="navbarcontainer">
      {/* ---------- Left ---------- */}
      <div className="navbarleft">
        <button
          className="nav-icon-btn hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <HiOutlineMenuAlt2 size={22} />
        </button>

        {text && <h1 className="navbar-title">{text}</h1>}

        <div className="navbarleftsearch">
          <IoSearch color="#8BA3CB" size={18} />
          <input type="search" placeholder="Search for something..." />
        </div>
      </div>

      {/* ---------- Right ---------- */}
      <div className="navbarright">
        <Link
          to="/notifications"
          className="nav-icon-btn"
          aria-label="Notifications"
        >
          <IoNotificationsOutline size={20} />
          <span className="notif-dot" />
        </Link>

        <div className="navprofile" ref={dropdownRef}>
          <button
            className="navprofile-btn"
            onClick={() => setDropdownOpen((p) => !p)}
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
          >
            {user?.image ? (
              <img src={user.image} alt={userName} />
            ) : (
              <span className="profile-avatar">{initial}</span>
            )}
            <div className="profile-meta">
              <span className="profile-name">{userName}</span>
              <span className="profile-role">{userRole}</span>
            </div>
            <FiChevronDown
              size={16}
              className={`chevron ${dropdownOpen ? "open" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="profile-dropdown" role="menu">
              <div className="dropdown-header">
                <span className="dropdown-header-name">Designation : {userName}</span>
               
              </div>
               <span className="dropdown-header-email">Email : {userEmail}</span>
              <div className="dropdown-divider" />

              <button
                className="dropdown-item"
                role="menuitem"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
              >
                <FiUser size={18} />
                <span>My Profile</span>
              </button>

              <button
                className="dropdown-item"
                role="menuitem"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/settings");
                }}
              >
                <FiSettings size={18} />
                <span>Settings</span>
              </button>

              <div className="dropdown-divider" />

             
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;