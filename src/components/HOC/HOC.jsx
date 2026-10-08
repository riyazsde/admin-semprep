import React, { useState, useEffect } from "react";
import "./HOC.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Nabar/Navbar";

const HOC = (WrappedComponent) => {
  const Component = (props) => {
    const [show, setShow] = useState(true);       // desktop collapse
    const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer

    const toggleSidebar = () => {
      if (window.innerWidth <= 992) {
        setMobileOpen((p) => !p);   // mobile: open/close drawer
      } else {
        setShow((p) => !p);         // desktop: collapse/expand
      }
    };

    // Close mobile drawer when resizing to desktop
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 992) setMobileOpen(false);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div className="container1">
        {/* Mobile overlay */}
        <div
          className={`sidebar-overlay ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`sidebar55 ${show ? "" : "collapsed"} ${
            mobileOpen ? "mobile-open" : ""
          }`}
        >
          <Sidebar
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            toggleSidebar={toggleSidebar}
          />
        </div>

        {/* Main content */}
        <div className="content">
          <Navbar
            show={show}
            toggleSidebar={toggleSidebar}
            text={props.text}
          />
          <div className="child-component">
            <WrappedComponent {...props} />
          </div>
        </div>
      </div>
    );
  };

  return Component;
};

export default HOC;