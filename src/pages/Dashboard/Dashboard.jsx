import React from "react";
import HOC from "../../components/HOC/HOC";
import { GoHomeFill } from "react-icons/go";
import { FaCalendarDays } from "react-icons/fa6";
import { MdGolfCourse } from "react-icons/md";
import { BsBookFill } from "react-icons/bs";
import { PiBookFill } from "react-icons/pi";
import { PiNotepadFill } from "react-icons/pi";
import { MdHandshake } from "react-icons/md";
import { FaFireFlameCurved } from "react-icons/fa6";
import { BiSolidNews } from "react-icons/bi";
import { FaFilePen } from "react-icons/fa6";
import { BiSolidBookContent } from "react-icons/bi";
import { HiMiniBarsArrowUp } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "./dashboard.css";   

const Dashboard = () => {
  return (
    <>
      <div className="dashboardcontainer">
        <div className="dashboardcontainer-header">
          <h6>Dashboard</h6>
          <p>Welcome back to Complete Prep Admin!</p>
        </div>
        <div className="dashboardmain">
          <Link to={"/dashboard/homepage-content"} className="link">
            <div className="dashboardcontent">
              <GoHomeFill />
              <h6>Edit Home Page Content</h6>
            </div>
          </Link>
          <Link to={"/dashboard/course-page"} className="link">
            <div className="dashboardcontent">
              <MdGolfCourse />
              <h6>Course Page Content</h6>
            </div>
          </Link>
          <Link to={"/dashboard/handwritten-notes"} className="link">
            <div className="dashboardcontent">
              <PiBookFill />
              <h6>Handwritten Notes Page Content</h6>
            </div>
          </Link>
          <Link to={"/dashboard/community"} className="link">
            <div className="dashboardcontent">
              <MdHandshake />
              <h6>Community Page Content</h6>
            </div>
          </Link>
          <Link to={"/dashboard/current-affairs"} className="link">
            <div className="dashboardcontent">
              <BiSolidNews />
              <h6>Current Affairs Page Content</h6>
            </div>
          </Link>
          <Link to={"/dashboard/landing-page"} className="link">
            <div className="dashboardcontent">
              <BiSolidBookContent />
              <h6>Landing Page Content</h6>
            </div>
          </Link>
         
          <Link to={"/dashboard/test-series"} className="link">
            <div className="dashboardcontent">
              <BiSolidBookContent />
              <h6>Test Series</h6>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HOC(Dashboard);